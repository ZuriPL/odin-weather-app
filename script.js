const clock = document.querySelector('.time')
const date = document.querySelector('.date')

async function getData(location) {
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=ed6f372defa1e8bf947ffa9b8e0fea17`
    )
    return await response.json()
}
function useData(x) {
    console.log(x)
}

getData('London').then(res => useData(res))

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


