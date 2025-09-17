const cards = document.querySelectorAll(".card");

let disableDeck = false;
let cardOne, cardTwo;
let matchedCardno = 0;

function matchCards(one, two){
    if (one.src== two.src){
        console.log("same card");
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = null;
        matchedCardno += 1;
        console.log(matchedCardno);
        if (matchedCardno == 8){
            let text= document.querySelector(".congrats");
            text.innerText="CONGRATULATIONS";
            setTimeout(() => {
                shuffleCard(text);
            },1000);
           
        }
        return disableDeck = false;
    }else{
        console.log("different cards");

        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake"); 
        }, 300);
        
        
        setTimeout(() => {
            cardOne.classList.remove("shake","flip");
            cardTwo.classList.remove("shake","flip");
            cardOne = cardTwo = null;
            return disableDeck = false;
        }, 1000);
    }

    
}
function flipCard(e){
    let clickedCard = e.target;
    
    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add("flip");
        if(!cardOne){ //always false after cardone has been assigned some value
        return cardOne = clickedCard; //ends function here if executed (ONLY the first time)
        }
        cardTwo=clickedCard;
        disableDeck = true;
        let img1 = cardOne.querySelector("img");
        let img2 = cardTwo.querySelector("img");
        matchCards(img1, img2);
    }
    
}

function shuffleCard(text){
    matchedCardno = 0;
    cardOne = cardTwo = null;
    disableDeck=false;

    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); //if random generator is more than 0.5 then 1 else -1 | its like a coin flip one way or other
    // condition ? valueIfTrue : valueIfFalse
    // sort --> If the function returns negative → a comes before b. If it returns positive → a comes after b. If it returns 0 → order stays the same.
   
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag= card.querySelector("img");
        imgTag.src=`./Memory Card Game Images/img-${arr[index]}.png`
        card.addEventListener("click", flipCard);
    });
    text.innerText="";
}

shuffleCard(); // function is called two times: 1. when user matched all the cards and 2. when browser is refreshed
cards.forEach((card) => {
    card.addEventListener("click", flipCard);
});

