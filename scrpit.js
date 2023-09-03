

const heading = document.getElementById('pic-heading')
const nasaImg = document.getElementById('nasa-img')
const imgTitle = document.getElementById('title')
const imgDes = document.getElementById('description')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
let searchHistory = document.getElementById('search-history')

// let nasaObjs = {}
let searchDates = []
let historyDates = []
let currentDate = new Date().toISOString().split("T")[0]

async function getCurrentImageOfTheDay(){
    getImageOfTheDay(currentDate)
    addSearchToHistory()
}

async function getImageOfTheDay(date,history){
    nasaImg.src = '#'
    let url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=Ir2ePY4n1gOWhstRG2drV1wF7yxY9Yqd3MawDf45`
    let response = await fetch(url);
    let nasaObj = await response.json();
    // nasaObjs[date] = nasaObj;
    if(currentDate!=date){
        heading.innerText = `Picture On ${date}`;
        if(history != false)
            saveSearch(date)
    }
    nasaImg.src = await nasaObj['url'];
    imgTitle.innerText = nasaObj['title'];
    imgDes.innerText = nasaObj['explanation'];
}

function saveSearch(date){
    searchDates.push({'date':date})
    localStorage.setItem('searches',JSON.stringify(searchDates))
    addSearchToHistory()
}

function addSearchToHistory(){

    historyDates = JSON.parse(localStorage.getItem('searches'))

    searchHistory.remove()

    searchHistory = document.createElement('div')
    searchHistory.id = 'search-history'
    document.querySelector('.main-container').appendChild(searchHistory)

    historyDates.forEach(element => {
        let listEle = document.createElement('li')
        listEle.innerHTML = `<a href="#">${element.date}</a>`
        listEle.addEventListener('click',()=>{
            getImageOfTheDay(element.date,false);
        })
        searchHistory.appendChild(listEle)
    });
}

window.onload = getCurrentImageOfTheDay()

searchForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    getImageOfTheDay(searchInput.value)
})