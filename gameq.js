const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


var square = 50;
let arr = [[0,0]];

var gwidth = 1400;
var gheight = 750;

var direction = "right";
var gameover = false;

var score=0;

var tar_pos_x=(getRndInteger(0,gwidth/50))*50;
var tar_pos_y=(getRndInteger(0,gheight/50))*50;
//var tar_pos_x=8*50;
//var tar_pos_y=0*50;

const food=[tar_pos_x,tar_pos_y];

document.addEventListener("keydown",function(e)
{
  if(e.key=="ArrowRight" && direction!="left")
  {
     direction="right";
  } 
  else if(e.key=="ArrowDown" && direction!="up")
  {
     direction="down";
  }
  else if(e.key=="ArrowLeft" && direction!="right")
  {
     direction="left";
  }
  else if(e.key=="ArrowUp" && direction!="down")
  { 
     direction="up";
  }

})


function update()
{
  ctx.clearRect(0,0,gwidth,gheight);
  //It is better for clearing target
  
  var headx = arr[arr.length-1][0];
  var heady = arr[arr.length-1][1];
  //ctx.clearRect(headx,heady,square,square);
  // If you use this you have clear target.
  
  if(direction==="right" )
  {
     var newx = headx +square;
     var newy = heady;
     if(newx >= gwidth)
     {
        gameover=true;
     }
  } 
  else if(direction==="down")
  {
     var newx = headx ;
     var newy = heady + square;
     if(newy >= gheight)
     {
        gameover=true;  
     }
  }
  else if(direction==="left" )
  {
     var newx = headx - square;
     var newy = heady ;
     if(newx < 0)
     {
        gameover=true;
     }
  }
  else if(direction==="up")
  { 
     var newx = headx ;
     var newy = heady - square;
     if(newy < 0)
     {
        gameover=true;
     }
  }

  arr.forEach(function(i)
  {
    if(newx==i[0] && newy==i[1])
    {
       gameover=true;
    }
  })

  if(gameover==true)
  {
    //console.log(arr[0][0]+" "+arr[0][1]);
    clearInterval(In);
    return;
  }

  arr.push([newx,newy]);
  if(food[0]==newx && food[1]==newy)
  {
     //console.log("HIT");
     food[0]=(getRndInteger(0,(gwidth/50)))*50;
     food[1]=(getRndInteger(0,(gheight/50)))*50;
     score++;
  }
  else
  {
     arr.shift();
  }

}


function draw()
{
  //targetfood
  if(gameover==false)
  {
     ctx.fillStyle=("green");
     ctx.fillRect(food[0],food[1],square,square);
  }

  //Snake
  ctx.fillStyle=("cyan");
  arr.forEach(function(i)
  {
      ctx.fillRect(i[0],i[1],square,square);
  })

  //Gameover
  if(gameover==true)
  {
     ctx.fillStyle=("yellow");
     ctx.font="50px Courier New";
     ctx.fillText("GAME OVER",575,375);
  }

  //Score
  ctx.fillStyle=("blue");
  ctx.font="13px Verdana";
  var text="Score : "+score;
  ctx.fillText(text,5,10);
}

let In = setInterval( function(){
 update();
 draw();
},100)

//random function
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
 

/*
arr.forEach(function(i)
{
  if(newx==i[0] && newy==i[1])
  {
    gameover=true;
  }
})
*/