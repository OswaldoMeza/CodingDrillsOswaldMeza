window.onload = goNow;

function goNow(){

    var btnDress = document.getElementById("btn_dress");
    var bowtieDiv = document.getElementById("bowtie");
    btnDress.onclick = check;
        
        function check() {
            var height = document.getElementById('height').value;
            var width = height*2;
            //var midpoint = Math.ceil(height / 2); This wasn't used
            bowtieDiv.innerHTML = "";

            console.log(width);
            if (height % 2 != 0 && height>=5) {//checks if number is odd and 5 or higher
                //console.log(midpoint);
                for (var i=0; i<height*2; i++)//since it prints on every odd number I need to double the amount of time the loop prints
                {
                    //bowtieDiv.innerHTML += "*";
                    if (i <= height && i % 2 !=0)//if i is less then the midpoint, the print normally
                    {
                        for (var j=0; j < width; j++)
                        {
                            if(j >= i && j<width-i )
                            {
                                //I added dashes because spaces don't show up well
                                bowtieDiv.innerHTML += "_";
                            }else{
                                bowtieDiv.innerHTML += "*";
                            }

                        }
                        bowtieDiv.innerHTML += "</br>";
                    }else if (i > height && i % 2 !=0)//if i is higher then the midpoint, reverse the process
                    {
                        for (var j=0; j < width; j++)
                        {
                            if(j < i && j>=width-i )
                            {
                                bowtieDiv.innerHTML += "_";
                            }else{
                                bowtieDiv.innerHTML += "*";
                            }
                        }   
                    bowtieDiv.innerHTML += "</br>";
                    }
                //bowtieDiv.innerHTML += "</br>";
                }
            } else {
                bowtieDiv.innerHTML = "<strong>Invalid Number, please enter a odd number greater then 3<strong>";
                console.log("Invald");
            }

        }
    var btnSteps = document.getElementById("btn_steps");
    var resultDiv = document.getElementById("results");
    btnSteps.onclick = calcWinner;

    //This was the definition of overthinking
    //Spent a lot of time with an original idea, took a break, continued and gave up.
    //Came back later and rethough my proccess, looked online for hints and realized it was much easier than I thought.
        function calcWinner(){
            //Make sure to conver values to numbers
            var NikkyForw = Number(document.getElementById("nikkyForw").value);
            var NikkyBack = Number(document.getElementById("nikkyBack").value);
            var ByronForw = Number(document.getElementById("byronForw").value);
            var ByronBack = Number(document.getElementById("byronBack").value);
            var TotalSteps = Number(document.getElementById("totalSteps").value);
            //Steps that nikky and byron take
            var nikkySteps;
            var byronSteps;
            //Nikky and byrons position
            var nikkySum = 0;
            var byronSum = 0;

            //I have to check to see if forwards values are higher then backward values
            if (NikkyForw > NikkyBack && ByronForw > ByronBack){
                var next = NikkyForw;
                //round is a variable that keeps track whether the player is moving forward or backwards, it changed between positive and negative after every loop to add or subtract values.
                var round = 1;
                for (nikkySteps = 0; nikkySteps <= TotalSteps;){
                    if (nikkySteps + next > TotalSteps)break;//if it goes over the value, stop the loop.
                    nikkySteps += next;
                    nikkySum += next*round;
                    //console.log(nikkySum, nikkySteps, nikkySteps+next, next, round);
                    if (round == 1){
                        next = NikkyBack;
                    }else{
                        next = NikkyForw;
                    }
                    round *= -1;
                }
                //update steps with the remaining steps left that couldnt be calculate through the loop
                nikkySum += round*(TotalSteps-nikkySteps);

                var next = ByronForw;
                var round = 1;
                for (byronSteps = 0; byronSteps <= TotalSteps;){
                    if (byronSteps + next > TotalSteps)break;
                    byronSteps += next;
                    byronSum += next*round;
                    //resultDiv.innerHTML+= byronSum+ " "+  byronSteps+ " "+ (byronSteps+next)+ " "+ next+  " "+ round+"</br>";
                    if (round == 1){
                        next = ByronBack;
                    }else{
                        next = ByronForw;
                    }
                    round *= -1;
                }
                byronSum += round*(TotalSteps-byronSteps);
                //compare the two values to announce results.
                if (nikkySum > byronSum){
                    resultDiv.innerHTML = "<strong>Nikky took a total of "+nikkySum+" steps forward, while Byron took "+byronSum+" steps forward. Nikky is ahead</strong>";
                }else if(nikkySum < byronSum){
                    resultDiv.innerHTML = "<strong>Byron took a total of "+byronSum+" steps forward, while Nikky took "+nikkySum+" steps forward. Byron is ahead</strong>";
                }else{
                    resultDiv.innerHTML = "<strong>Nikky took a total of "+nikkySum+" steps forward, while Byron took "+byronSum+" steps forward. Nikky and Byron are Tied</strong>";
                }
            }else{
                resultDiv.innerHTML = "invalid";
            }
        }
////////////////////////////////////////////
////J3-2014/////////////////////////////////
////////////////////////////////////////////
//Weirdly enough, this was the easiest of the 3 challenges

    var btnDie = document.getElementById("btn_die");
    var dieRoundsDiv = document.getElementById("dieRounds");
    var dieResultsDiv = document.getElementById("dieGameResults");
    btnDie.onclick = playDice;

    function playDice(){
        var GameRounds = Number(document.getElementById("gameRounds").value);
        var PlayerOneTotal = 100;
        var PlayerTwoTotal = 100;
        dieRoundsDiv.innerHTML = "";
        dieResultsDiv.innerHTML = "";
        //this loop will run for each round of the game
        for (var round=0; round<GameRounds; round++){
            //randomly chooses a number between 1 and 6, like rolling a die
            var PlayerOneRoll = Math.floor(Math.random() * 6) + 1;
            var PlayerTwoRoll = Math.floor(Math.random() * 6) + 1;
            //prints each die roll
            dieRoundsDiv.innerHTML += PlayerOneRoll +" "+PlayerTwoRoll + "</br>";
            //Whoever gets the lower number, that higher number will be subtracted from their total.
            //if same roll, nothing happens
            if (PlayerOneRoll > PlayerTwoRoll){
                PlayerTwoTotal -= PlayerOneRoll;
            }else if (PlayerOneRoll < PlayerTwoRoll){
                PlayerOneTotal -= PlayerTwoRoll;
            }
        //This just prints the result.
        if (PlayerOneTotal > PlayerTwoTotal){
            dieResultsDiv.innerHTML = "<strong>"+PlayerOneTotal+" "+PlayerTwoTotal+"</strong></br> <span>Player One is the Winner</span>";
        }else{
            dieResultsDiv.innerHTML = "<strong>"+PlayerOneTotal+" "+PlayerTwoTotal+"</strong></br> <span>Player Two is the Winner</span>";
        }
        }
    }

}
