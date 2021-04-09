var PLAY,END,gameState,bananaGroup,stoneGroup,monkey,col,score,ground,monkeyAni,bananaAni,obstacleAni,jungle,background,GameOver,gameEnd,restart,restartAni


function preload(){
  monkeyAni=loadAnimation("mon1.png","mon2.png","mon3.png","mon4.png","mon5.png","mon6.png","mon7.png","mon8.png","mon9.png")
  bananaAni=loadImage("banana.png")
  obstacleAni=loadImage("obstacle.png")
  jungle=loadImage("jungle.jpg")
  gameEnd=loadImage("gameOver.png")
restartAni=loadImage("restart.png")
  
}

function setup() {
PLAY=1
END=0
gameState=PLAY

  background = createSprite(0,0,600,600);
  background.addImage("jungle",jungle);
   background.scale = 2.5;


//var background=createSprite(200,200,400,20);
//background.setAnimation("background");

ground = createSprite(200,380,400,20);
ground.x = ground.width /2;
ground.visible=false;


bananaGroup=createGroup();
stoneGroup=createGroup();

monkey=createSprite(100,340,20,50)
monkey.addAnimation("monkey",monkeyAni);
monkey.scale=0.1;


GameOver=createSprite(200,245,50,50)  
    GameOver.addImage("GameOver",gameEnd)
  GameOver.scale=0.5
  GameOver.visible=false


col=0


score=0
}

function draw() {

  drawSprites()
  createEdgeSprites()
  
     //move the ground
    background.velocityX = -3;
     
      if (background.x < 0){
    background.x = background.width/2;
  }    
  
     ground.velocityX = -6;
   if (ground.x < 0){    
  ground.x = ground.width/2;
  }
  
//  background.velocityX = -3 
//  if (background.x < 0){    
// background.x = background.width/2;
//}
  
  monkey.collide(ground);
  

  if(gameState===PLAY){
  
   if(keyDown("space") && monkey.y >= 150){
      monkey.velocityY = -12 ;
    } 
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  spawnBananas()
  spawnObstacles()
  
  if(monkey.isTouching(bananaGroup)){
    score=score+2;
   // monkey.setAnimation("download.png_1")
    bananaGroup.destroyEach();
   
  }
     

  
  
  switch(score){
      case 10:monkey.scale=0.12
      break;
      case 20:monkey.scale=0.14
      break;
      case 30:monkey.scale=0.16
      break;
      case 40:monkey.scale=0.18
      break;
      default:console.log("default is the else part not used in code")
      break;  
    }

  if (col === 2) {
    gameState = END;
      
  }

  //monkey touches the stones
  if (stoneGroup.isTouching(monkey)) {
    stoneGroup.destroyEach();
    bananaGroup.destroyEach();
//monkey.scale = 0.13;
    col += 1;
  monkey.scale=0.09
  }
  
    if(gameState===END){
            
      
     stoneGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);

    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);

    
    monkey.destroy()
 
       GameOver.visible=true

          
       background.velocity=0   
  
     }

 

  }
 fill(255)
  textSize(15)
       text("Score :"+score,300,50);

}


function spawnBananas(){
  if(World.frameCount%80===0){
     var banana = createSprite(400,320,40,10);
     banana.addImage("Banana",bananaAni);
     banana.scale=0.09
   banana.y = random(120,220);
    banana.velocityX=-4
    banana.lifetime=100
    
    bananaGroup.add(banana)
    
  }
}

function spawnObstacles(){
  if(World.frameCount%120===0){
     var stone = createSprite(400,360,40,10);
      stone.addImage("stone",obstacleAni);
      stone.scale=0.09
    stone.velocityX=-4
    stone.lifetime=100
    
    stoneGroup.add(stone)
    
  }
}


