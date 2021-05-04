class Game{

    constructor(){

    }

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data){
        gameState = data.val();
        })

    }

    update(state){

        database.ref('/').update({
            gameState: state
        })
    }

    async start(){

        if(gameState === 0){
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            player.getCount();
          }
          form = new Form()
          form.display();
        }
        car1 = createSprite(200, displayHeight - 500);
        //car1.addImage("car1", car1Img);
        car2 = createSprite(200,displayHeight -  400);
        //car2.addImage("car2", car2Img);
        car3 = createSprite(200, displayHeight - 300);
        //car3.addImage("car3", car3Img);
        car4 = createSprite(200, displayHeight - 200);
        //car4.addImage("car4", car4Img);

        cars = [car1, car2, car3, car4];

        
       
      }

    play(){

        form.hide();
        textSize(30);
        text("Game Start", displayWidth/2 - 270, 180)
        Player.getPlayerInfo();
        player.getCarsAtEnd();

        if(allPlayers !== undefined){

            background("lightyellow");
            image(track, 0, -displayHeight*4, displayWidth, displayHeight * 5);
            //var display_position = 230;

            // index of the array
            var index = 0;
             
            //x and y positions of the cars
            var x ;
            var y = 200;

            for(var plr in allPlayers){

                //add 1 to the index for every loop
                index = index + 1;

                //position the cars from each other in x-direction
                 
                y = y + 200;

                //use data from database to display the cars in Y- direction

                x = allPlayers[plr].distance - 50;
                cars[index-1].x = x;
                cars[index-1].y = y;

                if(index === player.index){
                    cars[index - 1].addAnimation("swim",swimmerImg);
                    cars[index - 1].scale = 3.5;
                    camera.position.x = cars[index - 1].x;
                    camera.position.y = displayHeight/2;
                }else{
                    if(index - 1 === player.index)
                    cars[index].shapeColor = "red";
                }

                 
            //display.position+=40;
            //textSize(15);
            // text(allPlayers[plr].name + ":" + allPlayers[plr].distance, displayWidth/2 - 250, display_position);
        
        }
    }
        if(keyDown(UP_ARROW) && player.index !== null){
            player.distance += 50;
            player.update();
            console.log(player.distance)
        }

        if(player.distance>5000 ){            
            player.rank += 1;
            Player.updateCarsAtEnd(player.rank);
            game.update(2);        
                     
        }

        drawSprites();
    }

    displayRanks(){
        camera.position.y = 0;
        camera.position.x = 0;
        Player.getPlayerInfo();
        textAlign(CENTER);
        textSize(50);
        for(var plr in allPlayers){
            if(allPlayers[plr].place === 1){
                text("1st: " + allPlayers[plr].name, 0, 85);
            }else if(allPlayers[plr].place === 2){
                text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
            }else if(allPlayers[plr].place === 3){
                text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
            }else{
                textSize(30);
                text("Honorable Mention: " + allPlayers[plr].name, 0, 225);
            }
        }
    

    }

    
    }


    