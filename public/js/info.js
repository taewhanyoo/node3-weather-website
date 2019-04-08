// console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch('http://localhost:3000/weather?address='+location).then( (response) => {
    response.json().then( (data) => {
        if(data.error){
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = 'location: ' + data.location
            messageTwo.textContent = 'forecast: ' + data.forecast
            messageThree.textContent = 'temperature: ' + data.temperature
            messageFour.textContent = 'rain: ' + data.rain
        }
    })
})
})

