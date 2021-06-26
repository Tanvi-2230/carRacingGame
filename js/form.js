class Form{
    constructor(){
        this.title = createElement("h1");
        this.title.html("Car Racing Game");
        this.title.position(width/2-60, 10);

        this.input = createInput();
        this.input.position(width/2-30,250);

        this.button = createButton("Play");
        this.button.position(width/2-30, 320);

        this.greeting = createElement("h2");
        this.greeting.position(width/2, height/2);

        this.resetButton = createButton("RESET");
        this.resetButton.position(width-150, 70);
    }

    display(){
        // Caller of the callback function - button
        // Normal function - this refers to the caller (button)
        // Owner of the callback function - form
        // Arrow function - this refers to the owner(form)
        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();

            player.name = this.input.value();            
            this.greeting.html("Hello " + player.name);
            playerCount += 1; // playerCount = playerCount + 1
            player.updateCount(playerCount);
            player.index = playerCount;
            player.update();
            
        })

        this.resetButton.mousePressed(() =>{
            player.updateCount(0);
            game.updateState(0);
            player.updateCarsAtEnd(0);

            db.ref("players").remove();

        })

        
    }
}