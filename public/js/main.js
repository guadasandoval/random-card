import { CardsTarotInfo } from './cards.js'

let home = document.getElementById('home')
let sectionCard = document.getElementById('sectionCard')
let body = document.getElementById('body')
let players = document.getElementsByTagName('input')
let otherGames = document.getElementById('otherGames').addEventListener('click', showOtherGames)
let savedGames = document.getElementById('savedGames')
let getLuck = document.getElementById('start').addEventListener('click', matchOrNot)


players = [...players]
let playerName1, playerName2
let indexTarotCard
let totalCon1 = 0
let totalCon2 = 0
var cardsConsult1 = []
var cardsConsult2 = []
var gamesList = new Array()

//class SavedGames
class SavedGames {
    constructor(playerName1, playerName2, result){
        this.playerName1 = playerName1
        this.playerName2 = playerName2
        this.result = result
    }
}

function showOtherGames(){
    sectionCard.className = 'off'
    home.className = 'off'
    savedGames.className = 'on'
    
    if(localStorage.getItem('gamesList')){
    let listJson = localStorage.getItem('gamesList')
    let lista = JSON.parse(listJson);

    body.classList.remove('container-flex')
    let divGamesList = document.getElementById('divGamesList')

    for(const game of lista){ 
        let divInfoGames = document.createElement('div')
        divInfoGames.className = 'slide-header'
        let indexlist = document.createElement('p')
        indexlist.className ='slideIndex'
        let txtIndexList = document.createTextNode(lista.indexOf(game)+1)
        indexlist.appendChild(txtIndexList)
        let playersNames = document.createElement('p')
        playersNames.className = 'slidePlayerInfo'
        playersNames.style = 'margin-top:50px;'
        let txtNames = document.createTextNode(game.playerName1.toUpperCase() + '/' + game.playerName2.toUpperCase())
        playersNames.appendChild(txtNames)
        let result = document.createElement('p')
        result.className = 'slidePlayerInfo'
        result.style = 'margin-top:50px;'
        let txtResult = document.createTextNode(game.result)
        result.appendChild(txtResult)
        
        divInfoGames.appendChild(indexlist)
        divInfoGames.appendChild(playersNames)
        divInfoGames.appendChild(result)
        let hr = document.createElement('hr')
        hr.style = 'margin: 0px;'
       
        divGamesList.appendChild(divInfoGames) 
        divGamesList.appendChild(hr) 
    }
     
    let closeBtn = document.getElementById('tryAgain').addEventListener('click', restart)
} else{
    console.log('no hay consultas');
}
    
}

//seleccion de cartas random
function randomGame(playerName1, playerName2){
    sectionCard.className = 'on'
    home.className = 'off'
    savedGames.className = 'off'
    
    let newGame = new SavedGames()
    //aca tengo los tres numeros de cartas y el total
    for(var i=0;i<3;i++){ 
        indexTarotCard = Math.floor(Math.random()*22)
        cardsConsult1.push(indexTarotCard)
        totalCon1 += indexTarotCard
    } 
  
    for(var i=0;i<3;i++){
        indexTarotCard = Math.floor(Math.random()*22)
        cardsConsult2.push(indexTarotCard)
        totalCon2 += indexTarotCard
    }

    //creo el div
    let divCardItems = document.getElementById('carouselCards')
    let buttonView = document.createElement('button')
    buttonView.className = 'button-view'
    buttonView.setAttribute('data-bs-toggle', 'modal')
    buttonView.style = 'margin-top: 32px; margin-right: 15px;'
    let titleButtonView = document.createTextNode('ver resultados')
    buttonView.appendChild(titleButtonView)
    //player1
    for(const card of CardsTarotInfo){
        for(const cardPlayer of cardsConsult1){
        let divItem = document.createElement('div')
        divItem.classList.add('carousel-item')
        if(card.index == cardPlayer){
        let divCard = document.createElement('div')
        divCard.classList.add('card-struct')
        if(cardsConsult1.indexOf(cardPlayer) == 0){
            divItem.classList.add('active')
        } 
        
        let divHeader = document.createElement('div')
        divHeader.classList.add('slide-header')
        let divIndex = document.createElement('div')
        divIndex.classList.add('right')
        let indexCard = document.createElement('h1')
        indexCard.className = 'slideIndex'

        let indexCardSelect = document.createTextNode(card.index)
        indexCard.appendChild(indexCardSelect)
        
        let infoPlayerName = document.createElement('p')
        infoPlayerName.className = 'slidePlayerInfo'
        let infoPlayerCards = document.createElement('p')
        infoPlayerCards.className = 'slidePlayerInfo'
        let txt1 = 'CARTAS DE ' + playerName1.toUpperCase()
        let txtPlayer = document.createTextNode(txt1)
        let txt2 = 'CARTA ' + (cardsConsult1.indexOf(cardPlayer)+1) + '/' + cardsConsult1.length
        let txtCardsPlayer = document.createTextNode(txt2)
        infoPlayerName.appendChild(txtPlayer)
        infoPlayerCards.appendChild(txtCardsPlayer)

        // creo el nombre de la carta
        let nameCard = document.createElement('h2')
        nameCard.className = 'slideNameCard'
        //nameCard.style = 'color: #fb0414;'
        let txtName = document.createTextNode(card.nameCard.toUpperCase())
        nameCard.appendChild(txtName)

        // creo la imagen
        let divImg = document.createElement('div')
        divImg.classList.add('centerImg')
        //divImg.style = 'background: #fb0414;'
        let imgCard = document.createElement('img')
        imgCard.className = 'slideImg'
        divImg.appendChild(imgCard)
    

        //creo la descripcion
        let descriptionCard = document.createElement('p')
        descriptionCard.className = 'slideDescription'
        let txtDescription = document.createTextNode(card.descripcion)
        descriptionCard.appendChild(txtDescription)

       
        imgCard.src = card.imgCard
        divHeader.appendChild(indexCard)
        divHeader.appendChild(infoPlayerName)
        divHeader.appendChild(infoPlayerCards)
        divHeader.appendChild(buttonView)
        divCard.appendChild(divHeader)
        divCard.appendChild(nameCard)
        divCard.appendChild(descriptionCard)
        divCard.appendChild(divImg)
        divItem.appendChild(divCard)
        divCardItems.appendChild(divItem)
            } 
        }
    }

    //player2
    for(const card of CardsTarotInfo){
        for(const cardPlayer of cardsConsult2){
        let divItem = document.createElement('div')
        divItem.classList.add('carousel-item')
        if(card.index == cardPlayer){
        let divCard = document.createElement('div')
        divCard.classList.add('card-struct')
        if(cardsConsult1.indexOf(cardPlayer) == 0){
            divItem.classList.add('active')
        } 
        
        let divHeader = document.createElement('div')
        divHeader.classList.add('slide-header')
        let divIndex = document.createElement('div')
        divIndex.classList.add('right')
        let indexCard = document.createElement('h1')
        indexCard.className = 'slideIndex'
        indexCard.style = 'color: #fb0414;'

        let indexCardSelect = document.createTextNode(card.index)
        indexCard.appendChild(indexCardSelect)
        
        let infoPlayerName = document.createElement('p')
        infoPlayerName.className = 'slidePlayerInfo'
        let infoPlayerCards = document.createElement('p')
        infoPlayerCards.className = 'slidePlayerInfo'
        let txt1 = 'CARTAS DE ' + playerName2.toUpperCase()
        let txtPlayer = document.createTextNode(txt1)
        let txt2 = 'CARTA ' + (cardsConsult2.indexOf(cardPlayer)+1) + '/' + cardsConsult2.length
        let txtCardsPlayer = document.createTextNode(txt2)
        infoPlayerName.appendChild(txtPlayer)
        infoPlayerCards.appendChild(txtCardsPlayer)

        // creo el nombre de la carta
        let nameCard = document.createElement('h2')
        nameCard.className = 'slideNameCard'
        nameCard.style = 'color: #fb0414;'
        let txtName = document.createTextNode(card.nameCard.toUpperCase())
        nameCard.appendChild(txtName)

        // creo la imagen
        let divImg = document.createElement('div')
        divImg.classList.add('centerImg')
        divImg.style = 'background: #fb0414;'
        let imgCard = document.createElement('img')
        imgCard.className = 'slideImg'
        divImg.appendChild(imgCard)

        //creo la descripcion
        let descriptionCard = document.createElement('p')
        descriptionCard.className = 'slideDescription'
        let txtDescription = document.createTextNode(card.descripcion)
        descriptionCard.appendChild(txtDescription)

        imgCard.src = card.imgCard
        divHeader.appendChild(indexCard)
        divHeader.appendChild(infoPlayerName)
        divHeader.appendChild(infoPlayerCards)
        divHeader.appendChild(buttonView)
        divCard.appendChild(divHeader)
        divCard.appendChild(nameCard)
        divCard.appendChild(descriptionCard)
        divCard.appendChild(divImg)
        divItem.appendChild(divCard)
        divCardItems.appendChild(divItem)
            } 
        }
    }
   if(totalCon1%2 == 0 && totalCon2%2 == 0) {
       newGame.playerName1 = playerName1
       newGame.playerName2 = playerName2
       newGame.result = "Hay potencial"
       buttonView.setAttribute('data-bs-target', '#modalOK')
       gamesList.push(newGame)
    } else{
        newGame.playerName1 = playerName1
       newGame.playerName2 = playerName2
       newGame.result = "Mirá para otro lado..."
       buttonView.setAttribute('data-bs-target', '#modalERR')
       gamesList.push(newGame)
    }
   
    let saveBtnOK = document.getElementById('savedOK').addEventListener('click', setItems(gamesList))
    let closeBtnOK = document.getElementById('closeOK').addEventListener('click', restart)
    let saveBtnERR = document.getElementById('savedERR').addEventListener('click', setItems(gamesList))
    let closeBtnERR = document.getElementById('closeERR').addEventListener('click', restart)
}




function matchOrNot(){
    playerName1 = players[0].value
    playerName2 = players[1].value

    if(playerName1 && playerName2){
    setTimeout(()=> {
        randomGame(playerName1, playerName2) 
    }, 3000)
    }
}

function restart(){
    sectionCard.className = 'off'
    home.className = 'on'
    home.className = 'home'
    savedGames.className = 'off'
    players[0].value = ''
    players[1].value = ''
}

function setItems(gamesList){
    localStorage.setItem('gamesList', JSON.stringify(gamesList))
}