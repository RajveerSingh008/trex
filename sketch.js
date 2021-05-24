var gameState = "play";

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var over , overc ; 
var restart , restartc ;
var jumpsc ;
var diesc ; 
var checkpsc ; 


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  restartc = loadImage("restart.png");
  overc = loadImage("gameOver.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  jumpsc = loadSound("jump.mp3");
  diesc   = loadSound("die.mp3");
  checkpsc = loadSound("checkPoint.mp3");
  
}

function setup() {
  createCanvas(600, 200);
  over = createSprite(300,100,10,10)
  over.scale = 0.5
  over.addImage(overc);
  
  restart =  createSprite(300,150,10,10)
  restart.addImage(restartc);
  restart.scale = 0.5
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;  
  //trex.debug = true;
  trex.setCollider("circle",0,0,40);
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hello" + 5);
  
  score = 0;
}

function draw() {
  background("blue");
 
  trex.collide(invisibleGround);
  
text("Score: "+ score, 500,50);
  
    

  if(gameState === "play"){
   
  if(keyDown("space")&& trex.y >= 160) {
    trex.velocityY = -12.123;
    jumpsc.play();
    
  }
    trex.velocityY = trex.velocityY + 0.8
     if (ground.x < 0){
    ground.x = ground.width/2;
       
  }
      
    over.visible=false;
    restart.visible=false;
    score = score + Math.round(frameCount/500); 
       
 // console.log(trex.y)
    
    //spawn the clouds
  spawnClouds();
  
  //spawn obstacles on the ground
  spawnObstacles();
    ground.velocityX = -(4+score/500);
    
    if(trex.isTouching(obstaclesGroup) ){
      gameState = "end";
     // trex.velocityY = -12
      diesc.play();
      
    }
 
  }
  else if (gameState ==="end"){
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    
  
    cloudsGroup.setVelocityXEach(0);
    
    obstaclesGroup.setVelocityXEach(0);
  trex.changeAnimation("collided", trex_collided);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    over.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
  restartf();
}
  }
  if(score %100===0 && score>0 ){
    checkpsc.play();
  }
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -(6+score/500);

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -(3+score/500);
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }
  
}

function restartf(){
  gameState = "play";
 obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running );
  score = 0;
  
}

