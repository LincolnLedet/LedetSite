makerequest();
async function makerequest () {
    const response = await fetch("https://api.mcsrvstat.us/2/54.39.169.112");
    const info = await response.json();
    document.getElementById("status").innerHTML = info.online;
    document.getElementById("ping").innerHTML = info.debug.ping;
    document.getElementById("time").innerHTML = info.online;
}
