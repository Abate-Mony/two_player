const canvas = document.getElementById("canvas");
// console.log(canvas)
const ctx = canvas.getContext("2d");

//make it to take 100% if the screen herer
canvas.height = H = window.innerHeight
canvas.width = W = window.innerWidth
let moveDr1,moveDr2= ''
// initialize the player random positons on the screen
let playOneX = Math.floor(Math.random()*W), playerOneY = Math.floor(Math.random()*H), playTwoX = Math.floor(Math.random()*W), playerTwoY = Math.floor(Math.random()*H)
const audio=new Audio ("./bg-music.mp3")

// control the player vertiavcally and horizontally on the screen (x,y)
class players {
    constructor(color) {
        this.x = 0, this.y = 0, this.color = color;
    }
    move(x, y) {
        this.x = x, this.y = y;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 40, 40)
    }
    set playerColor(clr){
        this.color=clr
    }
}


class playerControls {
    constructor(x,y) {
        this.xdir = x, this.ydir = y,this.scores=0,this.speed=10,this.arrlen=arr.length/5
         this.audio=new Audio('1.WAV')
    }
    check() {
  
        if (this.xdir > W) {
            this.xdir = 0
        }
        if (this.xdir < 0) {
            this.xdir = W
        }
        if (this.ydir > H) {
            this.ydir = 0
        }
        if (this.ydir < 0) {
            this.ydir = H
        }
        if(this.arrlen>=arr.length){
            this.speed=20
        }
        for (let i =0; i<arr.length; ++i){
        arr[i].placefruits()
        if(this.xdir<=arr[i].coords[0] +20 && this.xdir +40>= arr[i].coords[0] && this.ydir<=arr[i].coords[1] +20 && this.ydir +40>= arr[i].coords[1]){
          ++this.scores;
          this.audio.play()
          setTimeout(() => {
            this.audio.load()
            this.audio.volume=1

          }, 250);
            arr.splice(i,1);
        }
        }
        
    }
    left() {
        this.xdir -= this.speed;
        this.check()
        return this.xdir;
    }
    right() {
        this.xdir += this.speed;
        this.check()
        return this.xdir;
    }
    up() {
        this.ydir -= this.speed;
        this.check()
        return this.ydir;
    }
    down() {
        this.ydir += this.speed;
        this.check()
        return this.ydir;
    }
    get score(){
        return this.scores;
    }
}
class fruits{
    constructor(x,y,color){
        this.posX=x,this.posY=y,this.color=color
    }
    placefruits(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.posX, this.posY, 20, 20)
    }
    get coords(){
        return [this.posX, this.posY]
    }
    set mainColor(bgcolor){
        this.color=bgcolor;
    }
}
function pos(){
    return [Math.floor(Math.random()*W),Math.floor(Math.random()*H)]
}
const place=new fruits(pos()[0],pos()[1])
place.placefruits()
let arr=[]
for (let i =0; i<100; ++i){
    const [xpos,ypos]=pos()
arr[i]=new fruits(xpos,ypos,"orange");
arr[i].placefruits()
}

const playerOne = new players("red");
const playerTwo = new players("green");
const playerOneControls = new playerControls(playOneX,playerOneY);
const playerTwoControls = new playerControls(playTwoX,playerTwoY);
playerOne.playerColor="white"
window.addEventListener("keyup", e => {
    audio.volume=0.3
    audio.play()
    const keypress = e.key;
    if(keypress == "ArrowLeft" || 
    keypress == "ArrowRight"||
    keypress == "ArrowUp"||
    keypress == "ArrowDown"||
    keypress == "a"||
    keypress == "s"||
    keypress == "w"||
    keypress == "d" ){
        start=true
    }
    if (keypress == "ArrowLeft") {
        moveDr1 = "right"
    }
    if (keypress == "ArrowRight") {
        moveDr1 = "left"
    }
    if (keypress == "ArrowUp") {
        moveDr1 = "up"
    }
    if (keypress == "ArrowDown") {
        moveDr1 = "down"
    }
    if (keypress == "a") {
        moveDr2 = "left"
    }
    if (keypress == "d") {
        moveDr2 = "right"
    }
    if (keypress == "w") {
        moveDr2 = "up"
    }
    if (keypress == "s") {
        moveDr2 = "down"
    }
})
let start=false
let time=1,minute=0,seconds=0
function returntime(){
if(start){
    if (++time%20==0){
        if(++seconds%60==0){
            ++minute
            seconds=1
            time=1
        }
     
     }
}
}
const numberOfFriuts=arr.length/5
const hex=["1","2","3","4","5","0","6","7","8","9","A","B","C","D","E"];
function randomColor(){
    let Hex="#"
    for(let i=0; i<6; ++i){
        Hex+=Math.floor(Math.random()*6);
    }
    return Hex;
}
function draw() { 
   let gameplay= setInterval(() => {
        ctx.clearRect(0, 0, W, H);
        for (let i =0; i<arr.length; ++i){
        arr[i].placefruits()
        }
        if(numberOfFriuts>=arr.length){
            // code here
            canvas.style.background=`${randomColor()}`;
            audio.volume=1
            for (let color of arr){
                color.mainColor=randomColor()
            }
       
        }
        if(!arr.length){
            if(playerOneControls.score>playerTwoControls.scores){
                alert("player1 won :\n congratu;ation player one")
            }
            if(playerOneControls.score<playerTwoControls.scores){
                alert("player2 won :\n congratu;ation player two")
            }
            
            if(playerOneControls.score==playerTwoControls.scores)
            {
                alert("is it a draw")
               
            }
            if(window.confirm("game over do you want to continue")){
            location.reload()
            }
            else{
                clearInterval(gameplay)
                audio.load()
                canvas.style.background=`linear-gradient(to right,black,blue,black)`;
            }
          
        }
        switch (moveDr2) {
            case "up":
                playerTwoY = playerTwoControls.up()
                break;
            case "down":
                playerTwoY = playerTwoControls.down()
                break;
            case "left":
                playTwoX = playerTwoControls.left()
                break;
            case "right":
                playTwoX = playerTwoControls.right()
                break;
            // end here
        }
        switch(moveDr1){
               case "up":
                playerOneY = playerOneControls.up()
                break;
            case "down":
                playerOneY = playerOneControls.down()
                break;
            case "left":
              playOneX = playerOneControls.right()
                break;
            case "right":
              playOneX = playerOneControls.left()
                break;
        }
        returntime()
        // canvas.style.background=`${randomColor()}`;
        playerOne.move(playOneX, playerOneY)
        playerTwo.move(playTwoX, playerTwoY)
        ctx.font = '40px Arial';
       ctx.fillStyle = "pink";
       ctx.fillText("TIME : "+minute+":"+ seconds, 500, 30);
       ctx.fillText("Player ONE : " + playerOneControls.score, 100, 30);
       ctx.fillText("Player TWO: " + playerTwoControls.score, W-500, 30);
    }, 50);
}
requestAnimationFrame(draw)
