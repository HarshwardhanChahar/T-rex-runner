var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var score=0
var PLAY=1
var END=0
var gameState=PLAY
var obstacle_group,cloud_group

function preload() 
{
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");

    groundImage = loadImage("ground2.png")
    cloudImage=loadImage("cloud.png")
    obstacle1=loadImage("obstacle1.png")
    obstacle2=loadImage("obstacle2.png")
    obstacle3=loadImage("obstacle3.png")
    obstacle4=loadImage("obstacle4.png")
    obstacle5=loadImage("obstacle5.png")
    obstacle6=loadImage("obstacle6.png")
}
function setup() 
{
    createCanvas(600, 200);
    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;
    //create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;

    invisibleGround=createSprite(200,200,400,10)
    invisibleGround.visible=false;
    
    cloud_group=new Group ()
    obstacle_group=new Group ()
}
function draw()
 {
    background("white");
    if(gameState===PLAY)
    {
        if (keyDown("space")&&trex.y>171)
        {
            trex.velocityY = -13;
        }
        trex.velocityY = trex.velocityY + 0.8

        if (ground.x < 0)
        {
            ground.x = ground.width / 2;
        }
        score=score+Math.round(frameCount/120)

        spawn_clouds()

        spawn_obstacle()

        if(obstacle_group.isTouching(trex))
        {
            gameState=END
        }
    }
    else if(gameState===END)
    {
        ground.velocityX=0
        obstacle_group.setVelocityXEach(0)
        cloud_group.setVelocityXEach(0)
    }
    //jump when the space button is pressed
   

   
    trex.collide(invisibleGround);

   
    text("score:"+score,530,20)

   

    drawSprites();
}

function spawn_clouds()
    {
        if(frameCount%60===0)
        {
        var cloud=createSprite(610,90,20,20)
        cloud.y=Math.round(random(20,100))
        cloud.addImage(cloudImage)
        cloud.scale=0.1
        cloud.velocityX=-4
        cloud_group.add(cloud)
        trex.depth=cloud.depth+1
        cloud.lifetime=150
        }
    }

function spawn_obstacle()
    {
        if(frameCount%80===0)
        {
            var obstacle=createSprite(610,160,20,20)
            obstacle.velocityX=-5
            obstacle.scale=0.1
            obstacle_group.add(obstacle)
            obstacle.lifetime=600/5
            var rand=Math.round(random(1,6))
            switch(rand)
            {
                case 1:obstacle.addImage(obstacle1)
                break
                case 2:obstacle.addImage(obstacle2)
                break
                case 3:obstacle.addImage(obstacle3)
                break
                case 4:obstacle.addImage(obstacle4)
                break
                case 5:obstacle.addImage(obstacle5)
                break
                case 6:obstacle.addImage(obstacle6)
                break
                default:break
            }
        }
    }