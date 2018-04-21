

var myGamePiece;
var myObstacles = [];
var myEnemy = [];
var myScore;
var myBackground;
var shipShot= [];
var health;
var shipFuel;

function startGame() {
    myGamePiece = new component(60, 45, "http://i66.tinypic.com/vipld3.jpg", 400, 120, "image");
  
  //myEnemy = new component(60, 45, "http://i67.tinypic.com/oi5gzt.jpg", 1300, 150, "image");
  
  //shipShot = new component(10, 10, "http://i63.tinypic.com/a5huf.jpg", 430, 140, "image" )
  
  myHealth = new component("20px", "Consolas", "gold", 50, 60, "text");
  
  shipFuel = new component("20px", "Consolas", "gold", 50, 80, "text");
  
    youLose = new component("75px", "Consolas", "red", 450, 200, "text");
  
  myBackground = new component(1250, 400, "http://i63.tinypic.com/a9v2oy.jpg", 0, 0, "image");
  
    myScore = new component("20px", "Consolas", "gold", 50, 40, "text");
    myGameArea.start();
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1250;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
      window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false; 
        })
      
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}



function component(width, height, color, x, y, type) {
    this.type = type;
  if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
  this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, 
                this.x, this.y, this.width, this.height);
            if (type == "background") {
                ctx.drawImage(this.image, 
                this.x + this.width, this.y, this.width, this.height);
            }}
      
         else
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
      if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }};
    };
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}



function updateGameArea() {
  
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
           
          myGamePiece.image.src= "http://i66.tinypic.com/i1w3cw.jpg";
     myGamePiece.update();
          
          myGameArea.stop();
         youLose.text= "Game Over!"
        youLose.update();
            return;
        }
      
  
     
    
    }
  
    myGameArea.clear();
  myBackground.speedX = 0;
   myBackground.newPos(); 
    myBackground.update();
  
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(50)) {
        x = myGameArea.canvas.width;
        minHeight = 40;
        maxHeight = 150;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 200;
        maxGap = 300;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
      
      
        myObstacles.push(new component(50, height/ 2, "http://i63.tinypic.com/u95pl.jpg", x, 0, "image"));
        myObstacles.push(new component(50, x - height - gap, "http://i63.tinypic.com/u95pl.jpg", x, height + gap, "image"));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedX = -1;
        myObstacles[i].newPos();
        myObstacles[i].update();
     
    }
  

  
  
  
 
  var maxHealth= 100; 
  myHealth.text="Ship Health: " + maxHealth;
  myHealth.update();
 //var damage= 1;
  //for (j = 0; j < myEnemy.length; j += 1) {
    //if (myGamePiece.crashWith(myEnemy[j])) {
        
  //myHealth.update(); 
      
      // maxHealth / .5;
        //myGameArea.frameNo;
        // myHealth.update();
      //myGamePiece.update();
    //  }
 //}
  
   
  
  //myGameArea.frameNo;
    //myHealth.update();
  var maxFuel= 10000;
  shipFuel.text="Fuel Burn:" + myGameArea.frameNo / .5 + "/" + maxFuel;
 // if(var f = myGameArea.frameNo; f < maxFuel; f+=1) {
  //shipFuel= maxFuel - f;
  
  
 shipFuel.update();
  
   
    myScore.text="Distance Traveled: " + myGameArea.frameNo * 10;
    myScore.update();
 
  
  
    
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -1; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 1; }
   
 
    myGamePiece.newPos();
  
    myGamePiece.update();
  
 
  
    
    myEnemy.push(new component(65, 45, "http://i67.tinypic.com/oi5gzt.jpg", x, height/.7, "image"));
    for (j = 0; j < myEnemy.length / 4; j += 1) {
   
 
  
       myEnemy[j].speedX = -.5;
       myEnemy[j].newPos();
      
      //myEnemy[a].push +1;
        myEnemy[j].update();
      //myGameArea.update();
   }
    //}
  
 // shipShot.push(new component(5, 5, "http://i63.tinypic.com/a5huf.jpg", 440, 150, "image"));
   // for (b = 0; b < shipShot.length / 4; b +1) {
   
 
  
      // shipShot[b].speedX = 3;
     // shipShot[b].newPos();
      
      
      //  shipShot[b].update();
     // myGameArea.update();
  // }


  //shipShot.speedX = 1;
  //shipShot.newPos();
 //shipShot.update();
    
    
 //for (a = 0; a < myEnemy.length; a += 1) {
    // if (shipShot.crashWith(myEnemy)) {
  //  shipShot.image.src= "http://i66.tinypic.com/i1w3cw.jpg";
   //  shipShot[b].update();
   //   myEnemy[a].update(); 
     //   myGameArea.update();
      //  myGameArea.stop();
     //  myEnemy[a].image.src= "http://i66.tinypic.com/i1w3cw.jpg";
       //myEnemy[a].clear();
       //shipShot[b].clear();
       
        
        //youLose.text= "Game Over!"
        //youLose.update();
      
  
   //   }
    
    //else{
     //return;
 //  }
     // }
  
     // }}
  // var y, height, gap, minHeight, maxHeight, minGap, maxGap;
  
   // myGamePiece.image.src= "http://i66.tinypic.com/i1w3cw.jpg";
  
 
  for (k = 0; k < myEnemy.length; k += 1) {
      if (myGamePiece.crashWith(myEnemy[k])) {
       
   
        
        
        myGamePiece.image.src= "http://i66.tinypic.com/i1w3cw.jpg";
     myGamePiece.update();
       myEnemy[k].update(); 
        //myGameArea.update();
        myGameArea.stop();
       
        
        youLose.text= "Game Over!"
        youLose.update();
      
  
      }
    
    else{
      return;
    }
      }
       
  
   //myGamePiece.update();
  //myEnemy[j].update();
  
  //function gameOver(crash){
   // if(crash=== true){
    //  myGamePiece.image.src= "http://i66.tinypic.com/i1w3cw.jpg";
     // gamePiece.update();
    //}
  //}
  //myEnemy.speedX= -.3;
  //myEnemy.speedY= 0;
  
  //myEnemy.update();
  //myEnemy.newPos();
 // }
      //if(myEnemy.frameNo.length === 10) {
       // myEnemy.newPos();
 
    
 shipShot.speedX = 5;
  shipShot.newPos();
  shipShot.update();
    
  } 
  

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;

   };
myGameArea.update();


//myEnemy = new component(60, 45, "http://i67.tinypic.com/oi5gzt.jpg", 1300, 250, "image");