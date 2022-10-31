//TODO setup IP geolocation API
//TODO > IP input > data from geo gets passed back to leaf to display location
//TODO break down data from geo to display

const ipInfoContainer = document.getElementById("ip-info-container")
const ipSpan = document.getElementById("ip-span")
const locSpan = document.getElementById("loc-span")
const timezoneSpan = document.getElementById("timezone-span")
const ispSpan = document.getElementById("isp-span")
const ipInput = document.getElementById("ip-input")
let obj

const map = L.map("map").setView([51.505, -0.09], 13)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


document.getElementById("btn").addEventListener("click", getIpData)

function getIpData() {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_ZBPhXRBfYnUgjyrqunmzFh4gS38ED&ipAddress=${ipInput.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        obj = data
        ipInfoContainer.style.display = "grid"
        ipSpan.textContent = data.ip
        locSpan.textContent = `${data.location.city}, ${data.location.region}`
        timezoneSpan.textContent = `UTC ${data.location.timezone}`
        ispSpan.textContent = data.isp
    })
    .then(() => {
        renderMap(obj.location.lat, obj.location.lng)
    })
}

function renderMap(lat, lng) {

    map.setView([lat, lng], 13)

    const circle = L.circle([lat, lng], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
    }).addTo(map);
}

