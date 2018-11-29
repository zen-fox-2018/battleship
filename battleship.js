// Your code here
let column = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
let input = process.argv.slice(2);
input = input.map(e => e.toUpperCase()).map(e => [column.indexOf(e[0])+1, +(e.slice(1))]);

function generateBoard () {
  let myBoard = [];
  for (let i = 0; i <= 10; i++) {
    let newRows = [];
    for (var j = 0; j <= 10; j ++) {
      if(j !== 0 && i === 0) {
        newRows.push(j + '');
      } else if (j === 0 && i !== 0) {
        newRows.push(column[i-1]);
      } else {
        newRows.push(' ');
      }
    }
    myBoard.push(newRows);
  }
  return myBoard;
}

function throwBomb (board) {
  let objResult = {};
  input.forEach(e => {
    if(board[e[0]][e[1]] !== ' ') {
      if(objResult[board[e[0]][e[1]]] === undefined) {
        objResult[board[e[0]][e[1]]] = 0;
      }
      objResult[board[e[0]][e[1]]]++;
    }
    board[e[0]][e[1]] = 'X';
  });
  console.log(board);
  return objResult;
}

function getIndex() {
  return [Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10)]
}

function shipHorizontal (board, index, shipSize, char) {
  let objResult = {
    arr : [],
    indexArr : []
  };
  for (let i = 0; i < shipSize; i++) {
    objResult.arr.push(board[index[0]][index[1] + i]);
    objResult.indexArr.push([index[0], index[1] + i]);
  }
  if(checkPosition(objResult)) {
    objResult.indexArr.forEach( e => {
      board[e[0]][e[1]] = char;
    });
  }
  return checkPosition(objResult);
}

function shipVertical (board, index, shipSize, char) {
  let objResult = {
    arr : [],
    indexArr : []
  };
  for (let i = 0; i < shipSize; i++) {
    if (index[0] + i <= 10) {
      objResult.arr.push(board[index[0] + i][index[1]]);
      objResult.indexArr.push([index[0] + i, index[1]]);
    } else {
      objResult.arr.push('x');
      objResult.indexArr.push([index[0], index[1]]);
    }
  }
  if(checkPosition(objResult)) {
    objResult.indexArr.forEach( e => {
      board[e[0]][e[1]] = char;
    });
  }
  return checkPosition(objResult);
}

function checkPosition (obj) {
  return obj.arr.every( e =>{
    return e === ' ';
  });
}

function battleShip () {
  if (input.length > 10 || !input.length) {
    console.log(`UNTUK MENAJALANKAN GAME BATTLE SHIP KETIKKAN COMMAND BERIKUT
    node battleship.js [koordinat, bom1] [koordinat, bom2] [koordinat, bom3] .....
                          NOTE -  * koordinat bom = ['A-J', '1 - 10']
                                  * jumlah bom maksimal adalah 10`);
    return '';
  }
  let counter = 0;
  let shipCatalog = {
    'Aircraft carrier' : [5, 'A'],
    'Battleship' : [4, 'B'],
    'Cruiser' : [3, 'C'],
    'Destroyer' : [2, 'D']
  };

  let board = generateBoard();
  let keyShip = Object.keys(shipCatalog);
  for (let i = 0; i < keyShip.length; i++) {
    let direction = Math.round(Math.random());
    let index = getIndex();
    if(direction) {
      if(shipVertical(board, index, shipCatalog[keyShip[i]][0], shipCatalog[keyShip[i]][1])) {
        continue;
      } else {
        i--;
      }
    } else {
      if(shipHorizontal(board, index, shipCatalog[keyShip[i]][0], shipCatalog[keyShip[i]][1])) {
        continue;
      } else {
        i--;
      }
    }
  }
  console.clear();
  let result = throwBomb(board);
  for(let e in result) {
    counter++;
    let K =Object.keys(shipCatalog).find(keyO => shipCatalog[keyO][1] === e);
    console.log(`Kapal ${K} telah terbom`);
  }
  if(!counter){
    console.log(`Semua Kapal Selamat`);
  }
}
battleShip();
