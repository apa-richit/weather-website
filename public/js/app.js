//const { response } = require("express")

//console.log('client side javascript is loaded')

/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

fetch('http://localhost:3000/weather?address=Boston').then((response) => {
        data = response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.location)
                console.log(data.forecast)
            }
            //console.log(data)
    })
})*/

const $weatherByLocationSearch = document.querySelector('#search-location')

const $weatherByGPSLocation = document.querySelector('#current-location')

const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
//messageOne.textContent = 'hello noob'

const messageTwo = document.querySelector('#message-2')

$weatherByLocationSearch.addEventListener('click', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        data = response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            //console.log(data)
        })
    })
    //console.log(location)
})

$weatherByGPSLocation.addEventListener('click', () => {

    //disable

    $weatherByGPSLocation.setAttribute('disabled', 'disabled')
    
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by this browser!')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        //console.log(position.coords.latitude)
        latitude = position.coords.latitude
        longitude = position.coords.longitude

        fetch('/weatherByGPS?lat=' + encodeURIComponent(latitude) + '&long=' + encodeURIComponent(longitude)).then((response) => {
            data = response.json().then((data) => {
                $weatherByGPSLocation.removeAttribute('disabled')
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
                //console.log(data)
            })
        })
    })
})