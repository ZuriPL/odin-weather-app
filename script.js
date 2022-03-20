const clock = document.querySelector('.time')
const date = document.querySelector('.date')

async function getData(location) {
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=ed6f372defa1e8bf947ffa9b8e0fea17&units=metric`
    )
    return await response.json()
}
function useData(data) {
    console.log(data)
    try {
        document.querySelector('.wrapper.place-wrapper > p:first-of-type').textContent = data.name
        document.querySelector('.wrapper.place-wrapper > p:last-of-type').textContent = data.sys.country
        document.querySelector('#weather-type').textContent = data.weather[0].description
        document.querySelector('.degs.main-temp').textContent = data.main.temp
        document.querySelector('.degs.feel-temp').textContent = data.main['feels_like']
        document.querySelector('.wind-speed-value.vel').textContent = data.wind.speed
        document.querySelector('.humidity-value.percents').textContent = data.main.humidity
    } catch (e) {
        console.log('error')
    }
}

getData('Warsaw').then(res => useData(res))

async function startClock() {
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


document.querySelector('#searchbar').addEventListener('keydown', e => {
    if (e.key != "Enter") return
    getData(e.target.value).then(res => useData(res))
})