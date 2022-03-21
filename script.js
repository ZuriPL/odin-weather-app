const clock = document.querySelector('.time')
const date = document.querySelector('.date')
const searchbar = document.querySelector('#searchbar')
let useMetric = true
let currentLocation = 'London'

async function getData(location) {
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=ed6f372defa1e8bf947ffa9b8e0fea17&units=${useMetric ? 'metric' : 'imperial'}`
    )
    return await response.json()
}
function useData(data) {
    console.log(data)
    searchbar.value = ''
    if (data.cod >= 400) return 
    document.querySelector('.wrapper.place-wrapper > p:first-of-type').textContent = data.name
    document.querySelector('.wrapper.place-wrapper > p:last-of-type').textContent = data.sys.country
    document.querySelector('#weather-type').textContent = data.weather[0].description
    document.querySelector('.degs.main-temp').textContent = data.main.temp
    document.querySelector('.degs.feel-temp').textContent = data.main['feels_like']
    document.querySelector('.wind-speed-value.vel').textContent = data.wind.speed
    document.querySelector('.humidity-value.percents').textContent = data.main.humidity
    document.querySelector('#weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon.substring(0, 2)}d@2x.png`
    
    const els = [ ...document.querySelectorAll('.degs') ].forEach(el => el.style.setProperty('--unit', `${useMetric ? "'C'" : "'F'"}`))
}

function startClock() {
    const getCurrentTime = () => {
        let hour = new Date().getHours().toString()
        let minutes = new Date().getMinutes().toString()
        return hour + ':' + (minutes.length == 1 ? '0' + minutes : minutes)
    }
    let time = getCurrentTime()
    clock.textContent = time
    setTimeout(() => {
        time = getCurrentTime()
        clock.textContent = time
        setInterval(() => {
            let time = getCurrentTime()
            clock.textContent = time
        }, 60000)
    }, 60000 - (new Date().getSeconds() * 1000)
    )

}
startClock()

date.textContent = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' +new Date().getFullYear()

getData(currentLocation).then(res => useData(res))
searchbar.addEventListener('keydown', e => {
    if (e.key != "Enter") return
    currentLocation = searchbar.value
    getData(currentLocation).then(res => useData(res))
})

document.querySelector('#temp-toggle').addEventListener('click', e => {
    useMetric = useMetric ? false : true
    getData(currentLocation).then(res => useData(res))
})