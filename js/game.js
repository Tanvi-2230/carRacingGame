class Game{
    constructor(){
        
    }

    getState(){
        var gameStateRef = db.ref("gameState");
        gameStateRef.on("value", function(data) {
            gameState = data.val();
        }, function(error) {
            console.log(error);
        });
    }

    updateState(value) {
        var dbRef = db.ref("/");
        dbRef.update({
            gameState : value
        });
    }

    async start() {
        if(gameState === 0) {
            player = new Player();
            var playerCountRef = await db.ref("playerCount").once("value");
            if(playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }

        car1 = createSprite(width/2-300, height, 50, 50);
        car1.addImage("car1",car1Img);

        car2 = createSprite(width/2-100, height, 50, 50);
        car2.addImage("car2",car2Img);

        car3 = createSprite(width/2+100, height, 50, 50);
        car3.addImage("car3",car3Img);

        car4 = createSprite(width/2+300, height, 50, 50);
        car4.addImage("car4",car4Img);

        cars = [car1, car2, car3, car4];
    }

    play(){
        form.greeting.hide();
        textSize(30);
        //text("START!", width/2-30, height/2);
        Player.readAllPlayersInfo();
        player.getCarsAtEnd();

        if(allPlayers !== undefined) {
            background(groundImg);
            image(trackImg, 0,-(height*4) , width, height*5)
            var yPosition = 200;
            var index = 0;
            for(var plr in allPlayers ) {
                yPosition = height-allPlayers[plr].distance;
                cars[index].y = yPosition;
                if(plr === "player" + player.index) {
                    camera.position.x = width/2;
                    camera.position.y = cars[index].y;
                //    cars[index].shapeColor = "green";
                    fill("red");
                    ellipse(cars[index].x, cars[index].y, 70, 90);
                }else{
                    // cars[index].shapeColor = "black";
                }
                index++;

                // textSize(20);
                // text(allPlayers[plr].name + " : " + allPlayers[plr].distance , width/2-50, yPosition);
                // yPosition += 50;
                
            }

            if(keyIsDown(UP_ARROW)) {
                player.distance += 50;
                player.update()
            }

            if(player.distance>2900){
                gameState = 2
                player.rank = carsAtEnd+1;
                player.updateCarsAtEnd(player.rank);
                player.update();
            }
            drawSprites();
        }
        
        // allPlayers = {
        //     player1 : {
        //         name : "A",
        //         distance : 0
        //     },
        //     player2 : {
        //         name : "B",
        //         distance : 0
        //     },
        //     player3 : {
        //         name : "C",
        //         distance : 0
        //     },
        //     player4 : {
        //         name : "D",
        //         distance : 0
        //     }
        // } 
    }

    end(){

        if(endMsg === false && carsAtEnd===4){
        textSize(30);
        stroke("black");
        fill("red");
        // text("GAME ENDED!", width/2, -(height*4));
        // text("Your Rank is: "+ player.rank, width/2, -((height*4)-50));
        Player.readAllPlayersInfo();
        var yPosition = -(height*4+50);
        for(var i in allPlayers){
            text(allPlayers[i].rank + " " + allPlayers[i].name, width/2-300, yPosition);
            yPosition += 50
        }
        endMsg = true;
        }
    }
}

