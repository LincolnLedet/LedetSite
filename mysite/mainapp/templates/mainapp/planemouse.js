var planeX = -30;
var planeY = 200;
document.getElementById("planeImg").style.left = planeX + "px";   
document.getElementById("planeImg").style.top = planeY + "px";
var x = 700;
var y = 150;
var angle = 0;

function trackMouse(e) {
    x = e.clientX;
    y = e.clientY + window.pageYOffset;
}
window.onload = function() {
  steerPlane();
 }

function steerPlane(event) {
    angle = toDegrees(getAngle(planeX,planeY,x,y));
    function myLoop() {         //  create a loop function
        setTimeout(function() {   //  call a 3s setTimeout when the loop is called
            coords.x = planeX;
            coords.y = planeY;

            if ((toDegrees(getAngle(planeX,planeY,x,y))) > angle && ((toDegrees(getAngle(planeX,planeY,x,y))) < angle + 180)) {
                angle += 5;
            } else if ((angle > 180) && (toDegrees(getAngle(planeX,planeY,x,y)) < 180) && ((angle - toDegrees(getAngle(planeX,planeY,x,y))) > 180)) {
                angle += 5;
            } else {
                angle -= 5;
            }

            if (angle > 360) {
                angle -= 360;
            }
            if (angle < 0 ) {
                angle += 360;
            }

            planeX += (Math.cos(angle * (Math.PI / 180))*5.5);
            planeY += (Math.sin(angle * (Math.PI / 180))*5.5);

            document.getElementById("planeImg").style.rotate = (angle + 25) + "deg";
            document.getElementById("planeImg").style.left = planeX + "px";   
            document.getElementById("planeImg").style.top = planeY + "px";

          myLoop();             //  ..  again which will trigger another 
                         //  ..  setTimeout()
        }, 40)
      }
    myLoop();
}

function makeSmokeCloud(cloudX,cloudY) {
    var svg = document.createElement('SVG');
    svg.setAttribute('style', 'border: 1px solid grey');
    svg.setAttribute('width', '60');
    svg.setAttribute('height', '20');
    svg.setAttribute('version', '1.1');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    document.getElementsByClassName("landscape")[0].appendChild(svg);
}

function toDegrees (angle) {
    return angle * (180 / Math.PI);
  }

  function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

function getAngle(x1,y1,x2,y2) {
    let ang = Math.atan2(y2 - y1, x2 - x1);
    if (ang < 0) {
        ang += 2*Math.PI;
    }
    return ang;
}


function getElementX(id) {
    const rect = document.getElementById(id).getBoundingClientRect();
    return parseInt(rect.left)
}
function getElementY(id) {
     const rect = document.getElementById(id).getBoundingClientRect();
    return parseInt(rect.top)
}





const coords = { x: planeX, y: planeY };
const circles = document.querySelectorAll(".circle");

const colors = [
  "var(--c2)",
  "var(--c2)",
  "var(--c2)",
  "var(--c2)",
  "var(--c2)",
  "var(--c2)",
  "var(--c2)",
  "var(--c2)",
  "var(--c2)",
  "var(--c2)",
  "var(--c2)",
  "var(--c2)",
  "var(--c2)",
  "var(--c2)",
  "var(--c2)",
  "var(--c2)",
];




circles.forEach(function (circle, index) {
  circle.x = planeX;
  circle.y = planeY;
  circle.style.backgroundColor = colors[index % colors.length];
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x + 8 + "px";
    circle.style.top = y + 4 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * .78;
    y += (nextCircle.y - y) * .78;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();
