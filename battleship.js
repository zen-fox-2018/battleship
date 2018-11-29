// Your code here

var input = process.argv
input = input.slice(2)

function generateBoard() {
  let finalBoard = []
  let counter = 1
  let col = 'ABCDEFGHIJ'
  let counterCol = 0
  for (let i = 0; i < 11; i++) {
    let tempBoard = []
    for (let j = 0; j < 11; j++) {
      if (j === 0 && i !== 0) {
        if (counter < 10) {
          tempBoard.push(`${counter} `)               
        }
        else {
          tempBoard.push(`${counter}`)               
        }
        counter++
      }
      else if (i === 0 && j !== 0) {
        tempBoard.push(`${col[counterCol]} `)
        counterCol++     
      }
      else {
        tempBoard.push('  ')   
      }
    }
    finalBoard.push(tempBoard)  
  }

//Index
  let x = Math.floor(Math.random() * 9 + 1)
  let y = Math.floor(Math.random() * 9 + 1)

//Destroyer
//   finalBoard[Math.floor(Math.random() * 9 + 1)][Math.floor(Math.random() * 9 + 1)] = 'D-'
  if (finalBoard[x][y + 1] !== undefined) {
    finalBoard[x][y] = 'D-'
    finalBoard[x][y + 1] = 'D-'
  }

//Cruiser
  let a = Math.floor(Math.random() * 9 + 1)
  let b = Math.floor(Math.random() * 9 + 1)
  if (finalBoard[a][b + 1] !== undefined && finalBoard[a][b + 2] !== undefined) {
    finalBoard[a][b] = 'C-'
    finalBoard[a][b + 1] = 'C-'
    finalBoard[a][b + 2] = 'C-'
  }

//Battleship
  let c = Math.floor(Math.random() * 9 + 1)
  let d = Math.floor(Math.random() * 9 + 1)
  if (finalBoard[c][d + 1] !== undefined && finalBoard[c][d + 2] !== undefined && finalBoard[c][d + 3] !== undefined) {
    finalBoard[c][d] = 'B-'
    finalBoard[c][d + 1] = 'B-'
    finalBoard[c][d + 2] = 'B-'
    finalBoard[c][d + 3] = 'B-'
  }

//Aircraft Carrier
  let e = Math.floor(Math.random() * 9 + 1)
  let f = Math.floor(Math.random() * 9 + 1)
  if (finalBoard[e][f + 1] !== undefined && finalBoard[e][f + 2] !== undefined && finalBoard[e][f + 3] !== undefined && finalBoard[e][f + 4] !== undefined) {
    finalBoard[e][f] = 'A-'
    finalBoard[e][f + 1] = 'A-'
    finalBoard[e][f + 2] = 'A-'
    finalBoard[e][f + 3] = 'A-'
    finalBoard[e][f + 4] = 'A-'
  }
  return finalBoard
}

var generate = generateBoard()

function generateShips(n) {
  let random = randomize()
  let x = +random[0]
  let y = +random[1]
  for (let i = 0; i < n; i++) {
    generate[x][y + i] = 'A-'  
  }
//   return generateBoard()
}

function randomize() {
  let acak = Math.floor(Math.random() * 100)
  if (acak < 10) {
    acak = '0' + acak
  }
  else {
    acak = acak.toString()
  }
  let x = acak[0]
  let y = acak[1]
  return [+x + 1, +y + 1]
}

// console.log(randomize());
// console.log(generate);

console.log(generateBoard())