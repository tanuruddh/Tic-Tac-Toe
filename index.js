let btn=document.querySelectorAll(".btn");
let resetButton= document.querySelector(".reset");
let message=document.querySelector(".msg");
let messageBox=document.querySelector(".message-container");
let restartButton=document.querySelector(".restart");
let state=true;

const winPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

btn.forEach((e)=>{
    e.addEventListener("click",()=>{
        if(state){
            e.innerText="X";
            state=false;
            makeSound("clickSound");
            
        }
        else{
            e.innerText="O";
            state=true;
            makeSound("clickSound");
        }
        e.disabled=true;
        if(winner()){
            disableAll();
        }
        else{
            draw();
        }
        
    })
})

restartButton.addEventListener("click",restart);
resetButton.addEventListener("click",reset);

function winner() {
    for(let pattern of winPattern){
        let posVal1=btn[pattern[0]].innerText;
        let posVal2=btn[pattern[1]].innerText;
        let posVal3=btn[pattern[2]].innerText;
        if(posVal1!=="" && posVal2!=="" && posVal3!==""){
            if(posVal1===posVal2 && posVal2===posVal3){
                displayWinner(posVal1);
                makeSound("winning");
                console.log("sjlfns")
                return true;
            }
            
        }
    }
}

function disableAll(){
    btn.forEach((e)=>{e.disabled=true})
}
function enableAll(){
    btn.forEach((e)=>{e.disabled=false})
}

function clearButton(){
    btn.forEach((e)=>{
        e.innerText="";
    })
}

function displayWinner (winner){
    let txt=`Congratulations, winner is : ${winner}`
    message.innerText=txt;
    messageBox.classList.remove("hide");
}

function reset(){

}

function restart(){
    messageBox.classList.add("hide");
    clearButton();
    enableAll();
    state=true;

}

function reset(){
    clearButton();
    enableAll();
    state=true;
    messageBox.classList.add("hide");
}

function draw(){
    let haveTxt=true;
    for(let i of btn){
        if(i.innerText===""){
            haveTxt=false;
            break;
        }
    }
    if(haveTxt){
        let txt=`Match is draw , Start a New Game`
    message.innerText=txt;
    messageBox.classList.remove("hide");
    disableAll();
    makeSound("draw");
    }
    
}

function makeSound(click){
    let sound=new Audio(`sounds/${click}.mp3`);
    sound.play();
}