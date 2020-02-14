var rand = 0;
var word = "";
var numWrong = 0;
var numRight = 0;
var phraseLength = 0;
var numChar = 0;
//var req = require('./node_modules/req/node_modules/request');

// *var phrases = ["Early bird gets the worm", "Read between the lines", "I can eat a horse", "Twenty-four seven", "Cat got your tounge", "One in one million", "I beg to differ", "Easier said than done", "Add insult to injury", "Don't cry over spilled milk", "Curiosity killed the cat", "Two peas in a pod", "That's the last straw", "Piece of cake", "Speak of the devil", "Go the whole nine yards", "An eye for an eye", "Hit the hay", "Stab someone in the back", "Quit cold turkey", "Cut to the chase", "Best of both worlds", "Kill two birds with one stone", "Break a leg", "Hit the nail on the head", "Kick the bucket"];  */
var movies = ["Apocalypse Now","Skyrim","Jack Reacher","Mission Impossible","The Godfather","Rampage","Baywatch","Jumanji","American Psycho","The Shining","The Conjuring","Insidious","Sinister","The Prestige","Gladiator","The Sound of Music","Deadpool","Wolverine","Dark Knight","Moana","Home Alone","Deathnote","Catch Me If You Can"];
var songs = ["Gangnam Style", "Shape of you", "Cheap Thrills", "Despacito", "Love Me Like You Do", "Taki Taki", "Rockstar", "Titanium", "Wavin Flag", "Stressed Out", "Boulevard of Broken Dreams"];
//var challenges = ["A"];
var emailid
function sp(){
    //console.log(req.body);
    //console.log('sp here ');

    emailid = document.getElementById('cloudemailtest').value;
    var params = {'emailid':emailid};
    console.log(emailid);
    //cloudant
    var http = new XMLHttpRequest();
    http.open('POST','/api/emailinsert', true);
    http.setRequestHeader('Content-type','application/json');
    http.onreadystatechange=function(){
      if(http.readyState === 4 && http.status === 200){
        // console.log('went through');
      }else if(http.status===400){
        document.getElementById('singlePage').innerHTML="<p>you can't try again</p>";      }
    }
    http.send(JSON.stringify(params));

    document.getElementById('introPage').style.display = "none";
    document.getElementById('multiPage').style.display = "none";
    document.getElementById('singlePage').style.display = "block";
}


/*function mp(){
    document.getElementById('introPage').style.display = "none";
    document.getElementById('singlePage').style.display = "none";
    document.getElementById('multiPage').style.display = "block";
}*/

function phrase(){
    rand = Math.floor(Math.random()*phrases.length);
    word = phrases[rand];
    document.getElementById('singlePage').style.display = "none";
    document.getElementById('categoryName').innerHTML = "Phrases";
    hangman();

}

function movie(){
    rand = Math.floor(Math.random()*movies.length);
    word = movies[rand];
    document.getElementById('singlePage').style.display = "none";
    document.getElementById('categoryName').innerHTML = "Movies";
    hangman();
}

function song(){
    rand = Math.floor(Math.random()*songs.length);
    word = songs[rand];
    document.getElementById('singlePage').style.display = "none";
    document.getElementById('categoryName').innerHTML = "Song titles";
    hangman();
}

function challenge(){
    rand = Math.floor(Math.random()*challenges.length);
    word = challenges[rand];
    numChar = 1;
    var letter = word.substring(0,1);
        document.getElementById('letter1').innerHTML = letter;
        document.getElementById('letter1').style.visibility = "hidden";
        document.getElementById('underline1').style.display = "block";
        document.getElementById('underline1').style.borderBottom = "3px solid black";
    document.getElementById('singlePage').style.display = "none";
    document.getElementById('gamePage').style.display = "block";
    document.getElementById('categoryName').innerHTML = "Guess every letter other than the correct one to win!";
    document.getElementById('categoryName').style.width = "100%";
    if(document.getElementById('underline1').offsetWidth == 50){
        document.getElementById('categoryName').style.fontSize = "45px";
    }
    if(document.getElementById('underline1').offsetWidth == 28){
        document.getElementById('categoryName').style.fontSize = "30px";
    }
    if(document.getElementById('underline1').offsetWidth == 18){
        document.getElementById('categoryName').style.fontSize = "20px";
    }
    document.getElementById('letterBank').style.display = "none";
    document.getElementById('challengeBank').style.display = "block";
    phraseLength = 1;
    draw();
}

function challengeGuess(){
    var target = event.target || event.srcElement;
    target.style.visibility = "hidden";
    var lower = target.id;
    var upper = document.getElementById(lower).getAttribute('value');
    var results = document.getElementById('results');
    if(document.getElementById('letter1').innerHTML === upper){
        document.getElementById('letter1').style.visibility = "visible";
        numRight++;
    }
    if(numRight==0){
        numWrong++;
        hang();
    }
    if(numRight==1){
        results.style.visibility = "visible";
        results.style.color = "red";
        results.innerHTML = "You lose!";
        if(document.getElementById('underline1').offsetWidth == 50){
            results.style.fontSize = "200px";
            results.style.height = "200px";
            results.style.lineHeight = "200px";
        }
        if(document.getElementById('underline1').offsetWidth == 28){
            results.style.marginTop = "20px";
            results.style.fontSize = "100px";
            results.style.height = "100px";
            results.style.lineHeight = "100px";
        }
        if(document.getElementById('underline1').offsetWidth == 18){
            results.style.marginTop = "15px";
            results.style.fontSize = "75px";
            results.style.height = "75px";
            results.style.lineHeight = "75px";
        }
        document.getElementById('challengeBank').style.display = "none";
        document.getElementById('vidSent').style.display = "block";
        document.getElementById('again').style.display = "block";
        document.getElementById('home').style.display = "block";
    }
    if(numWrong==25){
        results.style.visibility = "visible";
        results.style.color = "#00b100";
        results.innerHTML = "You win!";
        if(document.getElementById('underline1').offsetWidth == 50){
            results.style.fontSize = "200px";
            results.style.height = "200px";
            results.style.lineHeight = "200px";
        }
        if(document.getElementById('underline1').offsetWidth == 28){
            results.style.marginTop = "20px";
            results.style.fontSize = "100px";
            results.style.height = "100px";
            results.style.lineHeight = "100px";
        }
        if(document.getElementById('underline1').offsetWidth == 18){
            results.style.marginTop = "15px";
            results.style.fontSize = "75px";
            results.style.height = "75px";
            results.style.lineHeight = "75px";
        }
        document.getElementById('challengeBank').style.display = "none";
        document.getElementById('vidSent').style.display = "block";
        document.getElementById('again').style.display = "block";
        document.getElementById('home').style.display = "block";
        document.getElementById('letter1').style.visibility = "visible";
    }
}

function countChars(countfrom,displayto) {
    var len = document.getElementById(countfrom).value.length;
    document.getElementById(displayto).innerHTML = len;
}

function readText(){
    word = document.getElementById('input').value;
    hangman();
}

function hangman(){
    var x = word.length;
        if(x==0){
            alert("Please enter something into the text box.");
            return;
        }
    var y = x-1;
    var spaces = 0;
    var validChar = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "?", "!", ",", ".", "-", "'");
    for(z = 0; z < word.length; z++){
        var letter = word.substring(y,x);
        if(validChar.indexOf(letter) > -1){
            x--;
            y--;
        }
        else{
            alert("Please remove any special characters.");
            return;
        }
    }
    x = word.length;
    y = x-1;
    while (x>0){
        numChar++;
        var letter = word.substring(y,x);
        if(letter === " "){
            document.getElementById('letter'+x).innerHTML = "&nbsp;";
            document.getElementById('letter'+x).style.visibility = "hidden";
            document.getElementById('letter'+x).style.display = "block";
            document.getElementById('underline'+x).style.display = "block";
            spaces++;
        }
        else if(letter === "?" || letter === "!" || letter === "," || letter === "." || letter === "-" || letter === "'"){
            document.getElementById('letter'+x).innerHTML = letter;
            document.getElementById('letter'+x).style.display = "block";
            document.getElementById('underline'+x).style.display = "block";
            spaces++;
        }
        else{
            document.getElementById('letter'+x).innerHTML = letter;
            document.getElementById('letter'+x).style.visibility = "hidden";
            document.getElementById('underline'+x).style.display = "block";
            document.getElementById('underline'+x).style.borderBottom = "3px solid black";
        }
        x--;
        y--;
    }
    phraseLength = word.length - spaces;
    document.getElementById('multiPage').style.display = "none";
    document.getElementById('gamePage').style.display = "block";
    splitWords();
    document.getElementById('challengeBank').style.display = "none";
    draw();
}

function draw(){
    var ctx = document.getElementById("hangman").getContext('2d');
        ctx.fillStyle = "white";
        ctx.lineWidth=3;
        ctx.fillRect(0, 0, 300, 300);
        ctx.beginPath(); //vertical bar
            ctx.moveTo(50,270);
            ctx.lineTo(50,25);
            ctx.stroke();
        ctx.beginPath(); //vertical bar long piece
            ctx.moveTo(65,270);
            ctx.lineTo(65,85);
            ctx.stroke();
        ctx.beginPath(); //vertical bar short piece
            ctx.moveTo(65,64);
            ctx.lineTo(65,40);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar
            ctx.moveTo(49,25);
            ctx.lineTo(175,25);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar short piece
            ctx.moveTo(49,40);
            ctx.lineTo(86,40);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar long piece
            ctx.moveTo(106,40);
            ctx.lineTo(175,40);
            ctx.stroke();
        ctx.beginPath(); //small vertical bar
            ctx.moveTo(173,25);
            ctx.lineTo(173,40);
            ctx.stroke();
        ctx.beginPath(); //cross bar
            ctx.moveTo(50,80);
            ctx.lineTo(100,25);
            ctx.stroke();
        ctx.beginPath(); //cross bar
            ctx.moveTo(60,90);
            ctx.lineTo(111,35);
            ctx.stroke();
        ctx.beginPath(); //cross bar
            ctx.moveTo(50,80);
            ctx.lineTo(60,90);
            ctx.stroke();
        ctx.beginPath(); //cross bar
            ctx.moveTo(100,25);
            ctx.lineTo(111,35);
            ctx.stroke();
        ctx.beginPath(); //ground
            ctx.moveTo(35,270);
            ctx.lineTo(265,270);
            ctx.stroke();
        ctx.beginPath(); //noose
            ctx.moveTo(150,40);
            ctx.lineTo(150,80);
            ctx.stroke();
    var cntx = document.getElementById("homeHangman").getContext('2d');
        cntx.fillStyle = "white";
        cntx.lineWidth=3;
        cntx.fillRect(0, 0, 300, 300);
        cntx.beginPath(); //vertical bar
            cntx.moveTo(50,270);
            cntx.lineTo(50,25);
            cntx.stroke();
        cntx.beginPath(); //vertical bar long piece
            cntx.moveTo(65,270);
            cntx.lineTo(65,85);
            cntx.stroke();
        cntx.beginPath(); //vertical bar short piece
            cntx.moveTo(65,64);
            cntx.lineTo(65,40);
            cntx.stroke();
        cntx.beginPath(); //horizontal bar
            cntx.moveTo(49,25);
            cntx.lineTo(175,25);
            cntx.stroke();
        cntx.beginPath(); //horizontal bar short piece
            cntx.moveTo(49,40);
            cntx.lineTo(86,40);
            cntx.stroke();
        cntx.beginPath(); //horizontal bar long piece
            cntx.moveTo(106,40);
            cntx.lineTo(175,40);
            cntx.stroke();
        cntx.beginPath(); //small vertical bar
            cntx.moveTo(173,25);
            cntx.lineTo(173,40);
            cntx.stroke();
        cntx.beginPath(); //cross bar
            cntx.moveTo(50,80);
            cntx.lineTo(100,25);
            cntx.stroke();
        cntx.beginPath(); //cross bar
            cntx.moveTo(60,90);
            cntx.lineTo(111,35);
            cntx.stroke();
        cntx.beginPath(); //cross bar
            cntx.moveTo(50,80);
            cntx.lineTo(60,90);
            cntx.stroke();
        cntx.beginPath(); //cross bar
            cntx.moveTo(100,25);
            cntx.lineTo(111,35);
            cntx.stroke();
        cntx.beginPath(); //ground
            cntx.moveTo(35,270);
            cntx.lineTo(265,270);
            cntx.stroke();
        cntx.beginPath(); //noose
            cntx.moveTo(150,40);
            cntx.lineTo(150,80);
            cntx.stroke();
}

function splitWords(){
    var placeKeep = 0;
    var countBack = 16;
    if(numChar > 15){
        while(countBack > 1){
            if(document.getElementById('letter16').innerHTML == "&nbsp;"){
                document.getElementById('underline16').style.width = "0px";
                document.getElementById('underline16').style.marginRight = "0px";
            }
            if(document.getElementById('letter'+countBack).innerHTML == "&nbsp;"){
                document.getElementById('underline'+countBack).style.width = (document.getElementById('underline1').offsetWidth)*(16-countBack)+"px";
                placeKeep = countBack;
                countBack = 0;
            }
            countBack--;
        }
    }
    for(x=0;x<8;x++){
        countBack = 15+placeKeep;
        if(numChar > countBack){
            while(countBack > 1){
                if(document.getElementById('letter'+countBack).innerHTML == "&nbsp;"){
                    document.getElementById('underline'+countBack).style.width = (document.getElementById('underline1').offsetWidth*((16+placeKeep)-countBack))+"px";
                    placeKeep = countBack;
                    countBack = 0;
                }
                countBack--;
            }
        }
    }

}

function guessLetter(){
    var correct = 0;
    var target = event.target || event.srcElement;
    target.style.visibility = "hidden";
    var lower = target.id;
    var upper = document.getElementById(lower).getAttribute('value');
    var results = document.getElementById('results');
    var ul1 = document.getElementById('underline1').offsetWidth;
    for(a = 1; a < 101; a++){
        if(document.getElementById('letter'+a).innerHTML === upper || document.getElementById('letter'+a).innerHTML === lower){
            document.getElementById('letter'+a).style.visibility = "visible";
            correct++;
            numRight++;
        }
    }
    if(correct==0){
        numWrong++;
        hang();
    }
    if(numWrong==6){
        results.style.visibility = "visible";
        results.style.color = "red";
        results.innerHTML = "You can't miss another letter!";
        if(ul1 == 50){
            results.style.lineHeight = "70px";
            results.style.fontSize = "30px";
        }
        if(ul1 == 28){
            results.style.lineHeight = "50px";
            results.style.fontSize = "25px";
        }
        if(ul1 == 18){
            results.style.lineHeight = "40px";
            results.style.fontSize = "20px";
        }
    }
    if(numWrong==7){
        results.innerHTML = "You lose!<br>Keep guessing until you get it right";
        document.getElementById('again').style.display = "block";
        document.getElementById('home').style.display = "block";
        document.getElementById('vidSent').style.display = "block";
        if(ul1 == 50){
            results.style.lineHeight = "40px";
        }
        if(ul1 == 28){
            results.style.lineHeight = "25px";
        }
        if(ul1 == 18){
            results.style.lineHeight = "20px";
        }
    }
    if(numRight==phraseLength){
        win();
    }
}

function win(){
    var ul1 = document.getElementById('underline1').offsetWidth;
    var again = document.getElementById('again');
    var results = document.getElementById('results');
        results.style.visibility = "visible";
        results.style.color = "#FF0000";
    if(numWrong > 6){
        results.innerHTML = "You lost!";
        document.getElementById('letterBank').style.display = "none";
        again.style.display = "block";
        document.getElementById('home').style.display = "block";
        document.getElementById('vidSent').style.display = "block";
        if(ul1 == 50){
            results.style.lineHeight = "70px";
            results.style.fontSize = "30px";
        }
        if(ul1 == 28){
            results.style.lineHeight = "50px";
            results.style.fontSize = "25px";
        }
        if(ul1 == 18){
            results.style.lineHeight = "40px";
            results.style.fontSize = "20px";
        }
    }
    else{
        results.innerHTML = "<h1><span style='color:rgb(0,0,0)]'>"+emailid+"</span>"+"  You win!";
        document.getElementById('letterBank').style.display = "none";
        again.style.display = "block";
        document.getElementById('home').style.display = "block";
        document.getElementById('vidSent').style.display = "block";
        if(ul1 == 50){
            again.style.marginTop = "75px";
            results.style.marginTop = "75px";
            results.style.fontSize = "200px";
        }
        if(ul1 == 28){
            again.style.marginTop = "50px";
            results.style.marginTop = "40px";
            results.style.fontSize = "100px";
        }
        if(ul1 == 18){
            again.style.marginTop = "40px";
            results.style.marginTop = "15px";
            results.style.fontSize = "75px";
        }
    }
}

function hang(){
    var ctx = document.getElementById("hangman").getContext('2d');
    if(numWrong==1){
        ctx.beginPath(); //head
            ctx.arc(150, 100, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 95, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 95, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //mouth
            ctx.arc(150, 103, 9, 0, Math.PI);
            ctx.stroke();
    }
    if(numWrong==2){
        ctx.beginPath(); //body
            ctx.moveTo(150,120);
            ctx.lineTo(150,190);
            ctx.stroke();
    }
    if(numWrong==3){
        ctx.fillStyle = "white";
        ctx.fillRect(138, 102, 24, 12); //cover mouth
        ctx.beginPath(); //straight mouth
            ctx.moveTo(140,108);
            ctx.lineTo(160,108);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(150,135);
            ctx.lineTo(180,160);
            ctx.stroke();
    }
    if(numWrong==4){
        ctx.beginPath(); //left arm
            ctx.moveTo(150,135);
            ctx.lineTo(120,160);
            ctx.stroke();
    }
    if(numWrong==5){
        ctx.fillRect(138, 102, 24, 12); //cover mouth
        ctx.beginPath(); //sad mouth
            ctx.arc(150, 112, 9, 0, Math.PI, true);
            ctx.stroke();
        ctx.beginPath(); //right leg
            ctx.moveTo(149,188);
            ctx.lineTo(180,230);
            ctx.stroke();
    }
    if(numWrong==6){
        ctx.beginPath(); //left leg
            ctx.moveTo(151,188);
            ctx.lineTo(120,230);
            ctx.stroke();
    }
    if(numWrong==7){
        ctx.fillRect(138, 90, 24, 24); //cover face
        ctx.fillRect(118, 121.2, 70, 120); //cover body
        ctx.beginPath(); //straight mouth
            ctx.moveTo(140,108);
            ctx.lineTo(160,108);
            ctx.stroke();
        ctx.beginPath(); //body
            ctx.moveTo(150,135);
            ctx.lineTo(150,205);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(150,150);
            ctx.lineTo(180,175);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(150,150);
            ctx.lineTo(120,175);
            ctx.stroke();
        ctx.beginPath(); //right leg
            ctx.moveTo(149,203);
            ctx.lineTo(180,245);
            ctx.stroke();
        ctx.beginPath(); //left leg
            ctx.moveTo(151,203);
            ctx.lineTo(120,245);
            ctx.stroke();
        ctx.lineWidth=2;
        ctx.beginPath(); //left eye
            ctx.moveTo(140,93);
            ctx.lineTo(146,98);
            ctx.stroke();
            ctx.moveTo(140,98);
            ctx.lineTo(146,93);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.moveTo(154,98);
            ctx.lineTo(160,93);
            ctx.stroke();
            ctx.moveTo(154,93);
            ctx.lineTo(160,98);
            ctx.stroke();
    }
    if(numWrong==8){
        ctx.fillRect(118, 135, 70, 120); //cover body
        ctx.lineWidth=3;
        ctx.beginPath(); //body
            ctx.moveTo(150,150);
            ctx.lineTo(150,220);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(150,165);
            ctx.lineTo(180,180);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(150,165);
            ctx.lineTo(120,180);
            ctx.stroke();
        ctx.beginPath(); //right leg
            ctx.moveTo(149,218);
            ctx.lineTo(180,260);
            ctx.stroke();
        ctx.beginPath(); //left leg
            ctx.moveTo(151,218);
            ctx.lineTo(120,260);
            ctx.stroke();
    }
    if(numWrong==9){
        ctx.fillRect(118, 143, 70, 120); //cover body
        ctx.lineWidth=3;
        ctx.beginPath(); //body
            ctx.moveTo(150,165);
            ctx.lineTo(150,235);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(150,180);
            ctx.lineTo(180,195);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(150,180);
            ctx.lineTo(120,195);
            ctx.stroke();
        ctx.beginPath(); //right leg
            ctx.moveTo(149,232);
            ctx.lineTo(180,270);
            ctx.stroke();
        ctx.beginPath(); //left leg
            ctx.moveTo(151,232);
            ctx.lineTo(120,270);
            ctx.stroke();
    }
    if(numWrong==10){
        ctx.fillRect(118, 148, 70, 120); //cover body
        ctx.lineWidth=3;
        ctx.beginPath(); //body
            ctx.moveTo(150,180);
            ctx.lineTo(150,250);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(150,195);
            ctx.lineTo(180,210);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(150,195);
            ctx.lineTo(120,210);
            ctx.stroke();
        ctx.beginPath(); //right leg
            ctx.moveTo(149,247);
            ctx.lineTo(200,270);
            ctx.stroke();
        ctx.beginPath(); //left leg
            ctx.moveTo(151,247);
            ctx.lineTo(100,270);
            ctx.stroke();
    }
    if(numWrong==11){
        ctx.fillRect(90, 148, 120, 120); //cover body
        ctx.lineWidth=3;
        ctx.beginPath(); //body
            ctx.moveTo(200,195);
            ctx.lineTo(150,268);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(191,210);
            ctx.lineTo(220,245);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(191,210);
            ctx.lineTo(145,237);
            ctx.stroke();
        ctx.beginPath(); //right leg
            ctx.moveTo(149,268);
            ctx.lineTo(210,268);
            ctx.stroke();
        ctx.beginPath(); //left leg
            ctx.moveTo(151,268);
            ctx.lineTo(90,268);
            ctx.stroke();
    }
    if(numWrong==12){
        ctx.fillRect(90, 145, 140, 120); //cover body
        ctx.lineWidth=3;
        ctx.beginPath(); //body
            ctx.moveTo(230,220);
            ctx.lineTo(150,268);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(212,230);
            ctx.lineTo(240,255);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(212,230);
            ctx.lineTo(165,237);
            ctx.stroke();
    }
    if(numWrong==13){
        ctx.fillRect(90, 145, 160, 120); //cover body
        ctx.lineWidth=3;
        ctx.beginPath(); //body
            ctx.moveTo(245,255);
            ctx.lineTo(150,268);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(225,255);
            ctx.lineTo(255,268);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(225,255);
            ctx.lineTo(185,250);
            ctx.stroke();
    }
    if(numWrong==14){
        ctx.fillRect(90, 145, 160, 120); //cover body
        ctx.lineWidth=3;
        ctx.beginPath(); //body
            ctx.moveTo(245,264);
            ctx.lineTo(150,268);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(225,268);
            ctx.lineTo(255,268);
            ctx.stroke();
        ctx.beginPath(); //left arm
            ctx.moveTo(225,264);
            ctx.lineTo(185,264);
            ctx.stroke();
        ctx.fillRect(138, 90, 24, 24); //cover face
        ctx.beginPath(); //straight mouth
            ctx.moveTo(140,108);
            ctx.lineTo(160,108);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 95, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 95, 3.5, 0, 2*Math.PI);
            ctx.stroke();
    }
    if(numWrong==15){
        ctx.fillRect(138, 102, 24, 12); //cover mouth
        ctx.beginPath(); //mouth
            ctx.arc(150, 103, 9, 0, Math.PI);
            ctx.stroke();
    }
    if(numWrong==16){
        ctx.fillRect(128, 78, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 120, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 115, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 115, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //mouth
            ctx.arc(150, 123, 9, 0, Math.PI);
            ctx.stroke();
    }
    if(numWrong==17){
        ctx.fillRect(128, 98, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 140, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 135, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 135, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //mouth
            ctx.arc(150, 143, 9, 0, Math.PI);
            ctx.stroke();
    }
    if(numWrong==17){
        ctx.fillRect(128, 118, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 160, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 155, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 155, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //straight mouth
            ctx.moveTo(140,168);
            ctx.lineTo(160,168);
            ctx.stroke();
    }
    if(numWrong==18){
        ctx.fillRect(128, 138, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 180, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 175, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 175, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //straight mouth
            ctx.moveTo(140,188);
            ctx.lineTo(160,188);
            ctx.stroke();
    }
    if(numWrong==19){
        ctx.fillRect(128, 158, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 200, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 195, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 195, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //sad mouth
            ctx.arc(150, 213, 9, 0, Math.PI, true);
            ctx.stroke();
    }
    if(numWrong==20){
        ctx.fillRect(128, 178, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 220, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 215, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 215, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //sad mouth
            ctx.arc(150, 233, 9, 0, Math.PI, true);
            ctx.stroke();
    }
    if(numWrong==21){
        ctx.fillRect(128, 198, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 240, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.arc(143, 235, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.arc(157, 235, 3.5, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //sad mouth
            ctx.arc(150, 253, 9, 0, Math.PI, true);
            ctx.stroke();
    }
    if(numWrong==22){
        ctx.fillRect(128, 218, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(150, 243, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.moveTo(140,234);
            ctx.lineTo(146,239);
            ctx.stroke();
            ctx.moveTo(140,239);
            ctx.lineTo(146,234);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.moveTo(154,234);
            ctx.lineTo(160,239);
            ctx.stroke();
            ctx.moveTo(154,239);
            ctx.lineTo(160,234);
            ctx.stroke();
        ctx.beginPath(); //straight mouth
            ctx.moveTo(140,250);
            ctx.lineTo(160,250);
            ctx.stroke();
    }
    if(numWrong==23){
        ctx.fillRect(128, 220, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(129, 246, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.moveTo(115,245);
            ctx.lineTo(121,250);
            ctx.stroke();
            ctx.moveTo(115,250);
            ctx.lineTo(121,245);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.moveTo(120,234);
            ctx.lineTo(126,239);
            ctx.stroke();
            ctx.moveTo(120,239);
            ctx.lineTo(126,234);
            ctx.stroke();
        ctx.beginPath(); //straight mouth
            ctx.moveTo(129,257);
            ctx.lineTo(138,240);
            ctx.stroke();
    }
    if(numWrong==24){
        ctx.fillRect(106, 218, 45, 45); //cover head
        ctx.fillRect(120, 261, 25, 5); //cover rest of head
        ctx.beginPath(); //head
            ctx.arc(108, 247, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.moveTo(105,257);
            ctx.lineTo(111,262);
            ctx.stroke();
            ctx.moveTo(105,262);
            ctx.lineTo(111,257);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.moveTo(94,248);
            ctx.lineTo(100,253);
            ctx.stroke();
            ctx.moveTo(94,253);
            ctx.lineTo(100,248);
            ctx.stroke();
        ctx.beginPath(); //straight mouth
            ctx.moveTo(121,248);
            ctx.lineTo(101,235);
            ctx.stroke();
    }
    if(numWrong==25){
        ctx.fillRect(86, 220, 45, 45); //cover head
        ctx.beginPath(); //head
            ctx.arc(87, 248, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //left eye
            ctx.moveTo(78,250);
            ctx.lineTo(84,256);
            ctx.stroke();
            ctx.moveTo(78,256);
            ctx.lineTo(84,250);
            ctx.stroke();
        ctx.beginPath(); //right eye
            ctx.moveTo(91,250);
            ctx.lineTo(97,256);
            ctx.stroke();
            ctx.moveTo(91,256);
            ctx.lineTo(97,250);
            ctx.stroke();
        ctx.beginPath(); //straight mouth
            ctx.moveTo(77,240);
            ctx.lineTo(97,240);
            ctx.stroke();
    }
}

function reset(){
    var ul1 = document.getElementById('underline1').offsetWidth;
    var results = document.getElementById('results');
    var again = document.getElementById('again');
    for(a = 1; a < 101; a++){
        document.getElementById('letter'+a).innerHTML = "&nbsp;";
        document.getElementById('underline'+a).style.width = ul1 + "px";
        if(ul1 == 50){
            document.getElementById('underline'+a).style.marginRight = "5px";
            results.style.height = "70px";
        }
        else if(ul1 == 28){
            document.getElementById('underline'+a).style.marginRight = "3px";
            results.style.height = "50px";
        }
        else{
            document.getElementById('underline'+a).style.marginRight = "3px";
            results.style.height = "40px";
        }
        document.getElementById('underline'+a).style.display = "none";
        document.getElementById('underline'+a).style.borderBottom = "0px";
    }
    var bank = document.getElementById("letterBank").querySelectorAll("div");
    var cBank = document.getElementById("challengeBank").querySelectorAll("div");
    for(b = 0; b < 26; b++){
        bank[b].style.visibility = "visible";
        cBank[b].style.visibility = "visible";
    }
    numWrong = 0;
    numRight = 0;
    phraseLength = 0;
    numChar = 0;
    results.style.marginTop = "5px";
    results.style.lineHeight = "40px";
    results.innerHTML = " ";
    document.getElementById('vidSent').style.display = "none";
    document.getElementById('letterBank').style.display = "block";
    again.style.marginTop = "0px";
    again.style.display = "none";
    document.getElementById('home').style.display = "none";
    if(phrases.indexOf(word) > -1){
        phrases.splice(rand,1);
        phrase();
    }
    else if(movies.indexOf(word) > -1){
        movies.splice(rand,1);
        movie();
    }
    else if(songs.indexOf(word) > -1){
        songs.splice(rand,1);
        song();
    }
    else if(document.getElementById('charcount').innerHTML > 0){
        document.getElementById('gamePage').style.display = "none";
        document.getElementById('input').value = "";
        document.getElementById('charcount').innerHTML = "0";
        document.getElementById('multiPage').style.display = "block";
    }
    else{
        challenge();
    }
}

function video(){
    document.getElementById('gamePage').style.display = "none";
    document.getElementById('videoPage').style.display = "block";
    document.getElementById('home1').style.display = "block";
}
