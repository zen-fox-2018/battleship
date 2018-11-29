const argv = process.argv.slice(2)
const aim = [argv[0],argv[1],argv[2]]

let ships =
[
  {
    ship: "Aircraft Carrier",
    size: 5,
    icon: "@"
  },
  {
    ship: "Battleship",
    size: 4,
    icon: "#"
  },
  {
    ship: "Cruiser",
    size: 3,
    icon: "$"
  },
  {
    ship: "Destroyer",
    size: 2,
    icon: "%"
  },
]

function board() {
  let board = []
  for (let i = 0; i < 10; i++) {
    let boardTemp = []
    for (let j = 0; j < 10; j++) {
      boardTemp.push("-")
    }
    board.push(boardTemp)
  }
  return board
}

var board = board()


function randomPosition() {
  let dic = ["Horizontal", "Vertical", "Diagonal-", "Diagonal+"]
  return dic[Math.floor(Math.random() * 3 + 1)]
}

function randomCoordinate() {
  let coordinate = []
  coordinate.push(Math.floor(Math.random()*10))
  coordinate.push(Math.floor(Math.random()*10))
  return coordinate
}

function checkHorizontal(coordinate, size) {
  let check = false
  if ((coordinate[1] + size - 1) > 9) {
    return false
  }
  for (let i = 0; i < size; i++) {
    if (board[coordinate[0]][coordinate[1]+i] === "-" ) {
      check = true
    }
    else {
      return false
    }
  }
  return check
}

function checkVertical(coordinate, size) {
  let check = false
  if ((coordinate[0] + size - 1) > 9) {
    return false
  }
  for (let i = 0; i < size; i++) {
    if (board[coordinate[0]+i][coordinate[1]] === "-" ) {
      check = true
    }
    else {
      return false
    }
  }
  return check
}

function checkDiagonalNeg(coordinate, size) {
  let check = false
  if ((coordinate[0] + size - 1) > 9) {
    return false
  }
  for (let i = 0; i < size; i++) {
    if (board[coordinate[0]+i][coordinate[1]+i] === "-" ) {
      check = true
    }
    else {
      return false
    }
  }
  return check
}

function checkDiagonalPos(coordinate, size) {
  let check = false
  if ((coordinate[0] + size - 1) > 9) {
    return false
  }
  for (let i = 0; i < size; i++) {
    if (board[coordinate[0]+i][coordinate[1]-i] === "-" ) {
      check = true
    }
    else {
      return false
    }
  }
  return check
}

function placeShip(coordinate, position, ship) {
  let row = coordinate[0]
  let col = coordinate[1]
  if (position === "Horizontal") {
    for (let i = 0; i < ship.size; i++) {
      board[row][col+i] = ship.icon
    }
  }
  else if (position === "Vertical") {
    for (let i = 0; i < ship.size; i++) {
      board[row+i][col] = ship.icon
    }
  }
  else if (position === "Diagonal-") {
    for (let i = 0; i < ship.size; i++) {
      board[row+i][col+i] = ship.icon
    }
  }
  else if (position === "Diagonal+") {
    for (let i = 0; i < ship.size; i++) {
      board[row+i][col-i] = ship.icon
    }
  }
}

function printBoard() {
  let coordinate = []
  let position = ""
  ships.forEach(function(element) {
    while (true) {
      coordinate = randomCoordinate()
      position = randomPosition()
      if (position === "Vertical") {
        if (checkVertical(coordinate, element.size)) {
          break
        }
      }
      else if (position === "Horizontal") {
        if (checkHorizontal(coordinate, element.size)) {
          break
        }
      }
      else if (position === "Diagonal-") {
        if (checkDiagonalNeg(coordinate, element.size)) {
          break
        }
      }
      else if (position === "Diagonal+") {
        if (checkDiagonalPos(coordinate, element.size)) {
          break
        }
      }
    }
    placeShip(coordinate, position, element)
  })
}

function attack(aim) {
  let dic = "ABCDEFGHIJ"
  let destroyedShip = []
  let message = []
  aim.forEach(function(element) {
    let row = dic.indexOf(element[0])
    let col = Number(element[1])
    if (board[row][col] === "-") {
      board[row][col] = "/"
    }
    else {
      destroyedShip.push(board[row][col])
      board[row][col] = "X"
    }
  })
  return destroyedShip
}

function main(aim) {
  printBoard()
  let message = []
  let destroyedShip = attack(aim)
  if (destroyedShip.length === 0) {
    message.push(`Tidak ada kapal yang tenggelam, anda cupu`)
  }
  else {
    for (let i = 0; i < destroyedShip.length; i++) {
      for (let j = 0; j < ships.length; j++) {
        if (destroyedShip[i] === ships[j].icon) {
          message.push(`Berhasil menenggelamkan ${ships[j].ship}`)
        }
      }
    }
  }
  console.log(board);
  return console.log(`${message.join('\n')}`);
}

main(aim)