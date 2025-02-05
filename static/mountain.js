/**
 * colour changing
 */
// Configuration of colours and animation states
const config = {
    anims: {
      live: {
        interval: 60000,
        getProgress: now => {
          const time = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds()
          return time / 86400
        }
      },
      cycle: {
        interval: 50,
        getProgress: now => {
          const time = (now.getSeconds() * 1000) + now.getMilliseconds()
          return time / 60000
        }
      }
    },
    states: [
      {
        at: 0,
        name: 'night',
        colours: {
          c0: '#bed8f8',
          c1: '#7da5d5',
          c2: '#3078bf',
          c3: '#1860a5',
          c4: '#155798',
          c5: '#0c4e8f',
          c6: '#073866',
          c7: '#042b50',
          c8: '#02213f',
          c9: '#021a32',
          c10: '#00101f'
        }
      },
      {
        at: 6,
        name: 'sunrise',
        colours: {
          c0: '#f5e5e5',
          c1: '#fed4d5',
          c2: '#dcbed9',
          c3: '#c8aed9',
          c4: '#b19fcc',
          c5: '#a496c4',
          c6: '#7d88bd',
          c7: '#6371a9',
          c8: '#555986',
          c9: '#404364',
          c10: '#2e2c3f'
        }
      },
      {
        at: 12,
        name: 'day',
        colours: {
          c0: '#feebe2',
          c1: '#ffe2a6',
          c2: '#ffb06d',
          c3: '#ff9d60',
          c4: '#ff8f4c',
          c5: '#fc813a',
          c6: '#f04f30',
          c7: '#d2353a',
          c8: '#8b1036',
          c9: '#620a38',
          c10: '#2f1121'
        }
      },
      {
        at: 18,
        name: 'sunset',
        colours: {
          c0: '#ffc348',
          c1: '#ffad39',
          c2: '#f29a14',
          c3: '#ed8d14',
          c4: '#c86f11',
          c5: '#e17b17',
          c6: '#c0531a',
          c7: '#b04717',
          c8: '#70211a',
          c9: '#3c0b0e',
          c10: '#1e0000'
        }
      }
    ]
  }
  
  const root = document.documentElement
  
  // This changes the interval and progress calculation between
  // our dynamic animations 'live' and 'cycle'.
  let animMode = 'live'
  
  // Add first element of states to end so we have a seamless loop:
  // night > sunrise > day > sunset > night
  config.states.push({
    ...config.states[0],
    name: 'end',
    at: 24
  })
  
  // Declaring our animation loop in a variable allows us to end it when needed.
  let animation
  function startAnim() {
    // Run our update loop immediately after starting.
    updateAnim()
  
    // setInterval runs our update loop with a predetermined interval
    // based on the animation mode we are using.
    animation = setInterval(updateAnim, config.anims[animMode].interval)
  }
  
  // If we need to end the animation, this function will stop it
  // running again using clearInterval
  function endAnim() {
    clearInterval(animation)
  }
  
  // This runs every update cycle, getting the progress, calculating
  // the right colours and applying them to the root element
  function updateAnim() {
    // Get the progress through the animation. getProgress returns a number between 0 and 1.
    // To simplify working with time, we multiply this by 24 to get progress through the day.
    const progress = getProgress() * 24
  
    // Find the next 'state' we are transitioning to based on the 'at' property.
    // The 'at' property sets at what hour that state should be at.
    const nextIndex = config.states.findIndex(frame => {
      return frame.at !== 0 && progress < frame.at
    })
    // The previous 'state' is the one before the next one, so we remove 1.
    const lastIndex = nextIndex - 1
  
    // Get the onjects for the last and next states
    const lastState = config.states[lastIndex]
    const nextState = config.states[nextIndex]
  
    // Calculate the difference between the 'at' values of the previous and last states,
    // so we can get our progress between them based on the progress we got above.
    const diff = nextState.at - lastState.at
    const progressCurr = (progress - lastState.at) / diff
  
    // Loop through all the colours. 'key' is the cutsom property name
    Object.keys(lastState.colours).forEach(key => {
      // We use hex codes for colours for convenience, but it's a lot easier to transition
      // seperate Red, Green, Blue values so we convert them to a [R, G, B] array
      const lastRGB = hexToRgb(lastState.colours[key])
      const nextRGB = hexToRgb(nextState.colours[key])
  
      // Get the new RGB by using 'lerping' to find the value between the last and next
      // colours based on how far we are through the current animation.
      // The lerp function doesn't necessarily return an int so we round it.
      const currRGB = [
        Math.round(lerp(lastRGB[0], nextRGB[0], progressCurr)),
        Math.round(lerp(lastRGB[1], nextRGB[1], progressCurr)),
        Math.round(lerp(lastRGB[2], nextRGB[2], progressCurr))
      ]
  
      // Apply the custom property to root using the name and our new RGB value.
      applyColour(key, currRGB)
    })
    
    sunPos(progress)
  }
  
  // As we have two different animation 'modes', we change the function used to work
  // out the progress depending on that mode. See the config above for how they work.
  function getProgress() {
    const d = new Date()
    const progress = config.anims[animMode].getProgress(d)
  
    return progress
  }
  
  // A slightly bewildering regular expression that turns a hex code into [R, G. B] array.
  // Well-tested though so I don't need to touch it!
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null
  }
  
  // Using 'linear interpolation' gets the value between the start and end values based on progress
  function lerp(start, end, progress) {
    return (1 - progress) * start + progress * end
  }
  
  // Uses name of custom property 'key' and [R, G, B] array and applies to root element
  function applyColour(key, colour) {
    const colourString = 'rgb(' + colour.join(',') + ')'
    root.style.setProperty('--' + key, colourString)
  }
  
  // Round number to 'places' number of figures after decimal.
  function round(num, places) {
    const power = Math.pow(10, places)
    return Math.round(num * power) / power
  }
  
  // Initialise and start animation.
  function init() {
    startAnim()
  }
  init()
  
  
  /**
   * theme picker
   */
  const themes = document.querySelectorAll('[data-theme]')
  if (themes) {
    themes.forEach(function(theme) {
      theme.addEventListener('click', function(e) {
        // remove active state from old theme buttons
        themes.forEach(theme => {
          theme.removeAttribute('data-active')
          theme.removeAttribute('aria-pressed')
        })
        
        // add active state to clicked button
        this.setAttribute('data-active', '')
        this.setAttribute('aria-pressed', '')
  
        // get slug for current theme
        const themeSlug = this.getAttribute('data-theme')
  
        // end animation
        endAnim()
  
        // if dynamic theme, set animMode, start animation and return
        if (themeSlug === 'live' || themeSlug === 'cycle') {
          animMode = themeSlug
          startAnim()
          return
        }
  
        // find theme state and apply the colours
        const state = config.states.find(item => item.name === themeSlug)
        Object.keys(state.colours).forEach(key => {
          applyColour(key, hexToRgb(state.colours[key]))
        })
        sunPos(state.at)
      })
    })
  }
  
  /**
   * sun
   */
  function sunPos(progress) {
    const sunWrap = document.querySelector('.landscape__sunWrap')
    if (sunWrap) {
      const sunH = -Math.sin(2 * Math.PI * progress / 24)
      const sunV = -Math.sin(2 * Math.PI * (progress - 6) / 24)
      sunWrap.style.setProperty('--sun-h', round(sunH, 3))
      sunWrap.style.setProperty('--sun-v', round(sunV, 3))
    }
  }
  
  
  /**
   * parallax
   */
  // constant elements: your main scrolling element; html element
  const scrollEl = document.documentElement
  
  let scrollPos
  
  // update css property on scroll
  function parallax() {
    // check the scroll position has changed
    if (scrollPos !== scrollEl.scrollTop) {
      // reset the seen scroll position
      scrollPos = scrollEl.scrollTop
      // update css property --scrollPos with scroll position in pixels
      root.style.setProperty('--scrollPos', scrollPos + 'px')
    }
  
    // call animation again on next animation frame
    window.requestAnimationFrame(parallax)
  }
  
  // start animation on next animation frame
  window.requestAnimationFrame(parallax)