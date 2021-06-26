class Player{
    constructor(){
       this.name = "";
       this.distance = 0;
       this.index = null;
       this.rank = null;
    }

    getCount(){
        var playerRef = db.ref("playerCount");
        playerRef.on("value", function(data) {
            playerCount = data.val();
        }, function(error) {
            console.log(error);
        });
    }

    updateCount(value) {
        var dbRef = db.ref("/");
        dbRef.update({
            playerCount : value
        });
    }

    update(){
        var playerRef = db.ref("players/player" + this.index);
        playerRef.set({
            name : this.name,
            distance : this.distance,
            rank : this.rank
        });
    }

    static readAllPlayersInfo(){ // can be called directly using the class name
        var playersRef = db.ref("players");
        playersRef.on("value", function(data){
            allPlayers = data.val();
        })
        
    }

    getCarsAtEnd(){
        var carsRef = db.ref("carsAtEnd");
        carsRef.on("value", function(data){
            carsAtEnd = data.val();
        })
    }
    
    updateCarsAtEnd(value){
        var dbref = db.ref("/");
        dbref.update({
            carsAtEnd: value
        })
    }
}