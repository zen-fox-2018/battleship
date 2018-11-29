const argv = process.argv.slice(2)
const boardSize = 11
const alphabet = 'ABCDEFGHIJ'

const ships = {
    aircraft: {size: 5, icon: 'A'},
    battleship: {size: 4, icon: 'B'},
    cruiser: {size: 3, icon: 'C'},
    destroyer: {size: 2, icon: 'D'}
}

var bom = argv.map(e => e.toUpperCase())
bom = bom.map(e => [alphabet.indexOf(e[0])+1, Number(e[1])])

function makeBoard() {
    let result = []
    for (let i = 0; i < boardSize; i++) {
        let temp = []
        for (let j = 0; j < boardSize; j++) {
            if (i === 0 && j >= 1) {
                temp.push(`${j}`)
            } else if (i >= 1 && j === 0) {
                temp.push(`${alphabet[i-1]}`)
            } else {
                temp.push(' ')
            }
        }
        result.push(temp)
    }
    return result
}

function randomHead() {
    let i = Math.floor(Math.random() * 10) + 1
    let j = Math.floor(Math.random() * 10) + 1
    return [i, j]
}

// checkVertical(makeBoard(), [1, 1], 5, 'A')
function checkVertical(board, coordinate, size, icon) {
    let check = false
    let shipCoord = []
    for (let i = 0; i < size; i++) {
        if ([coordinate[0]+size] <= 11) {
            if (board[coordinate[0]+i][coordinate[1]] === ' ') {
                check = true
                shipCoord.push([coordinate[0]+i, coordinate[1]])
            } else {
                check = false
                shipCoord = []
                break
            }
        } else {
            return false
        }
    }
    if (check) {
        shipCoord.forEach(e => {
            board[e[0]][e[1]] = icon
        });
    } else {
        return false
    }
    return true
}

function checkHorizontal(board, coordinate, size, icon) {
    let check = false
    let shipCoord = []
    for (let i = 0; i < size; i++) {
        if ([coordinate[1]+size] <= 11) {
            if (board[coordinate[0]][coordinate[1]+i] === ' ') {
                check = true
                shipCoord.push([coordinate[0], coordinate[1]+i])
            } else {
                check = false
                shipCoord = []
                break
            }
        } else {
            return false
        }
    }
    if (check) {
        shipCoord.forEach(e => {
            board[e[0]][e[1]] = icon
        });
    } else {
        return false
    }
    return true
}

function print() {
    let board = makeBoard()
    let keyShips = Object.keys(ships)
    for (let i = 0; i < keyShips.length; i++) {
        let head = randomHead()
        let randomBody = Math.floor(Math.random() * 2)
        let size = ships[keyShips[i]].size
        let icon = ships[keyShips[i]].icon
        if (randomBody === 0) {
            if(!checkHorizontal(board, head, size, icon)) {
                i--
            }
        } else {
            if(!checkVertical(board, head, size, icon)) {
                i--
            }
        }
    }
    let count = 0
    bom.forEach(e => {
        if (board[e[0]][e[1]] === ' ') {
            board[e[0]][e[1]] = '/'
        } else {
            board[e[0]][e[1]] = 'X'
            count += 1
        }
    });
    console.log(board);
    if (count > 0) {
        console.log(`You hit ${count} spot`);
    } else {
        console.log('You lose');
    }
}

print()