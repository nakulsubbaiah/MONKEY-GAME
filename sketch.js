var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running,monkey_collided;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var points = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png",
    "sprite_7.png", "sprite_8.png");
  monkey_collided = loadAnimation("sprite_0.png");
  

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 200);

  monkey = createSprite(50, 160, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  
  monkey.scale = 0.12;


  ground = createSprite(600, 180, 800, 10);
  ground.visible = false;
  ground.x = ground.width / 2;

  obstaclesGroup = createGroup();
  bananasGroup = createGroup();

  monkey.setCollider("rectangle", 0, 0, 350,
    monkey.height);
  monkey.debug = true
  

  score = 0;
}


function draw() {
  background("white");
  text("Survival Time: " + score, 480, 50);
  text("points:"+points,480,30);

  if (gameState === PLAY) {

    ground.velocityX = -(4 + 3 * score / 100)
    score = score + Math.round(getFrameRate() / 60);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && monkey.y >= 135) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    spawnbananas();
    spawnObstacles();
    
    if (monkey.isTouching(bananasGroup)) {      
    bananasGroup.destroyEach();
    points=points+1;
  }

    if (obstaclesGroup.isTouching(monkey)) {
      gameState = END;

    }
  } else if (gameState === END) {

    ground.velocityX = 0;
    monkey.velocityY = 0;
    bananasGroup.destroyEach();
    
    monkey.changeAnimation("collided", monkey_collided);
    
  textSize(30);
  text("GAME OVER",200,100);

    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
  }
  monkey.collide(ground);

  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -8
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstacle.setCollider("rectangle", 0, 0, 300,300);
  obstacle.debug = true
    obstaclesGroup.add(obstacle);
  }
}

function spawnbananas() {
  if (frameCount % 90 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(20, 80));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 200;
    bananasGroup.add(banana);
  }
}