// Your code here
let command = process.argv;
let bullet = command.slice(2);

function generateBoard(){
  var result = [];
  var abjad = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var num = 1;
  for (var h = 0; h < 11; h++) {
    var fillResult = [];
    if (h === 0){
      for (var i = 0; i < 11; i++) {
        fillResult.push(abjad[i])
      }
    }
    else{
      for (var j = 0; j < 11; j++) {
        if (j === 0){
          var numStr = String(num);
          if (num < 10){
            numStr = '0'+ numStr;
          }
          fillResult.push(numStr);
          num++
        }
        else {
          fillResult.push('_');
        }
      }
    }
    result.push(fillResult);
  }
  return result;
}

function randomOrientation() {
  var randomOrientation = Math.round(Math.random())
  if (randomOrientation === 1) {
    //true = horizontal
    return true;
  }
  else{
    //false = vertikal
    return false;
  }
}

function randomPositionLimited(fleetLength) {
  return Math.floor(Math.random()*(10-fleetLength)+1);
}

function randomPosition(){
  return Math.floor(Math.random()*10)+1;
}

function fleetPositioning(fleet,orientation){
  var fleetX = 0;
  var fleetY = 0;
  if (orientation === true) {
    fleetX = randomPositionLimited(fleet[1]);
    fleetY = randomPosition();
  }
  else {
    fleetX = randomPosition();
    fleetY = randomPositionLimited(fleet[1]);
  }
  var result = [fleetX, fleetY];
  return result;
}

function assignFLeet(){
  //vertikal atau horizontal
  var board = generateBoard();
  //array fleet = index ganjil => jenis kapal, index genap => panjang kapal
  var aircraft = ['A',5];
  var battleship = ['B',4];
  var cruiser = ['C',3];
  var destroyer = ['D',2];
  var fleetAssigned = 0;
  while(fleetAssigned < 4){
    //aircraft
    if (fleetAssigned === 0) {
      var aircraftOri = randomOrientation();
      var aircraftPos = fleetPositioning(aircraft,aircraftOri);
      console.log(board[aircraftPos[0]][aircraftPos[1]]);
      if (board[aircraftPos[0]][aircraftPos[1]] === '_'){
        if (aircraftOri === true) {
          for (var i = 0; i < aircraft[1]; i++) {
            board[(aircraftPos[0]+i)][aircraftPos[1]] = aircraft[0];
          }
        }
        else {
          for (var j = 0; j < aircraft[1]; j++) {
            board[aircraftPos[0]][(aircraftPos[1]+j)] = aircraft[0];
          }
        }
        fleetAssigned++;
      }
    }
    //battleship
    else if (fleetAssigned === 1) {
      var battleshipOri = randomOrientation();
      var battleshipPos = fleetPositioning(battleship,battleshipOri);
      if (board[battleshipPos[0]][battleshipPos[1]] === '_'){
        if (battleshipOri === true) {
          for (var k = 0; k < battleship[1]; k++) {
            board[(battleshipPos[0]+k)][battleshipPos[1]] = battleship[0];
          }
        }
        else {
          for (var l = 0; l < battleship[1]; l++) {
            board[battleshipPos[0]][(battleshipPos[1]+l)] = battleship[0];
          }
        }
        fleetAssigned++;
      }
    }
    //cruiser
    else if (fleetAssigned === 2) {
      var cruiserOri = randomOrientation();
      var cruiserPos = fleetPositioning(cruiser,cruiserOri);
      if (board[cruiserPos[0]][cruiserPos[1]] === '_'){
        if (cruiserOri === true) {
          for (var m = 0; m < cruiser[1]; m++) {
            board[(cruiserPos[0]+m)][cruiserPos[1]] = cruiser[0];
          }
        }
        else {
          for (var n = 0; n < cruiser[1]; n++) {
            board[cruiserPos[0]][(cruiserPos[1]+n)] = cruiser[0];
          }
        }
        fleetAssigned++;
      }
    }
    //destroyer
    else if (fleetAssigned === 3) {
      var destroyerOri = randomOrientation();
      var destroyerPos = fleetPositioning(destroyer,destroyerOri);
      if (board[destroyerPos[0]][destroyerPos[1]] === '_'){
        if (destroyerOri === true) {
          for (var o = 0; o < destroyer[1]; o++) {
            board[(destroyerPos[0]+o)][destroyerPos[1]] = destroyer[0];
          }
        }
        else {
          for (var p = 0; p < destroyer[1]; p++) {
            board[destroyerPos[0]][(destroyerPos[1]+p)] = destroyer[0];
          }
        }
        fleetAssigned++;
      }
    }
  }
  return board;
}

function convert(bullets){
  var abjad = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var huruf = bullets[0].toUpperCase();
  var result = [bullets[1], ''];
  for (var i = 0; i < abjad.length; i++) {
    if (huruf === abjad[i]) {
      result[1] = i;
    }
  }
  return result;
}

function battle(bullet) {
  var board = assignFLeet();
  var AShooted = 0;
  var BShooted = 0;
  var CShooted = 0;
  var DShooted = 0;
  var WShooted = 0;
  for (var i = 0; i < bullet.length; i++) {
    var bulletConv = convert(bullet[i]);
    if (board[bulletConv[0]][bulletConv[1]] === 'A') {
      AShooted++;
    }
    else if (board[bulletConv[0]][bulletConv[1]] === 'B') {
      BShooted++;
    }
    else if (board[bulletConv[0]][bulletConv[1]] === 'C') {
      CShooted++;
    }
    else if (board[bulletConv[0]][bulletConv[1]] === 'D') {
      DShooted++;
    }
    else {
      WShooted++
    }
    board[bulletConv[0]][bulletConv[1]] = '/';
  }
  console.log(board);
  console.log('Aircraft ketembak : '+ AShooted);
  console.log('Battleship ketembak : '+ BShooted);
  console.log('Cruiser ketembak : '+ CShooted);
  console.log('Destroyer ketembak : '+ DShooted);
  console.log('Aer laut ketembak (sad) : '+ WShooted);
}
battle(bullet);
// console.log(assignFLeet());
