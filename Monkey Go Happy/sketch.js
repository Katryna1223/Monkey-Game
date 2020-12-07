
var monkey , monkey_running, ground;
var PLAY = 1, END = 0, gameState = PLAY;
var bananaGroup ,bananaImage, obstacle, obstacleImage, obstacleGroup;
var score=0, survival=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadAnimation("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  //monkey sprite and properties
  monkey = createSprite(30,380);
  monkey.addAnimation("monkey_run", monkey_running);
  monkey.scale = 0.0999;
  
  //ground and it's properties
  ground = createSprite(0,390,800,20);
  ground.shapeColor=rgb(25,255,0); 
  ground.velocityX=-20;
  
  //create groups
  bananaGroup = createGroup();
  obstacleGroup = createGroup();

}


function draw() {
  
  background(255,255,255);
  
  if(gameState === PLAY){
    
     //ground reset(infinite background)
  if(ground.x<0){
     ground.x = ground.width/2;
     }
    
    //monkey velocity and gravity
    if(keyDown("space") && monkey.y>=340){
    monkey.velocityY = -20;
  }
  
  monkey.velocityY = monkey.velocityY + 1;
  
  //make bananas
  banana();
  
  //make obstacles
  obstacle();
  
  
  //regulate score
  if(bananaGroup.isTouching(monkey)){
    score++;
    bananaGroup.destroyEach();
  }
  
  
  //regulate survival time
  survival = Math.ceil(frameCount/60);
  
  if(monkey.isTouching(obstacleGroup)){
     gameState = END;
     }
    
  } else if(gameState === END){
    monkey.velocityY = 0;
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    textSize(26);
    text("Time to go back to the zoo!! :(", 40, 130);
    textSize(16);
    text("You have collected " + score + " bananas and", 60, 170);
    text("survived for " + survival + " seconds.", 70, 200);
            }
  //display score and survival time
   
  textSize(20);
  fill(145,35,90);
  text("Score: "+ score, 50,30);
  
  text("Survival Time: " + survival, 200, 30);
  
  monkey.collide(ground);
  
  drawSprites();
  
  console.log(gameState);
}

function banana(){
  
  var banana;
  
  if(frameCount % 80===0){
    banana = createSprite(420, Math.round(random(150,250)));  
    banana.velocityX=-13;
    banana.lifetime=45;
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    bananaGroup.add(banana);
}
  }
  
function obstacle(){
  var obstacle;

  if(frameCount % 300 === 0){
      obstacle = createSprite(420,364);
      obstacle.velocityX = -10;
      obstacle.addAnimation("obstacle", obstacleImage);
      obstacle.lifetime = 50;
      obstacle.scale = 0.1;
      obstacleGroup.add(obstacle);
     }
}




