// Your code here

const command = process.argv

function printBoard(n) {
    let arrBoard = []

    for (let row = 0; row <= n; row++) {
        let arrRow = []

        for (let col = 0; col <= n; col++) {
            if (col == 0 & row > 0) {
                arrRow.push(String.fromCharCode(row + 64))
            }
            else if (row == 0 && col > 0) {
                arrRow.push(col + '')
            }
            else if (row == 0 && col == 0) {
                arrRow.push('~')
            }
            else {
                arrRow.push(' ')
            }
        }
        arrBoard.push(arrRow)
    }
    return arrBoard
}

function shipDirection() {
    let direction = ['vertical', 'horizontal']
    return direction[Math.floor(Math.random() * 2)]
}


function printBattleship(n) {
    let board = printBoard(n)
    let ship = ['a', 'b', 'c', 'd']
    let shipSize = [5, 4, 3, 2]
    let x = 0
    let y = 0

    for (let row = 0; row < ship.length; row++) {

        while (board[x][y] !== " " || x + shipSize[row] > n + 1 || y + shipSize[row] > n + 1) {
            x = Math.floor(Math.random() * n + 1)
            y = Math.floor(Math.random() * n + 1)
        }
        
        if (shipDirection() == 'vertical') {

            for (let size = 0; size < shipSize[row]; size++) {
                if (board[x + size][y] !== ' ') {
                    return printBattleship(n)
                }
                board[x + size][y] = ship[row]
            }
        } else {

            for (let size = 0; size < shipSize[row]; size++) {
                if (board[x][y + size] !== ' ') {
                    return printBattleship(n)
                }
                board[x][y + size] = ship[row]
            }
        }
    }
    return board
}


function startGame(coordinate) {
    let n = 10
    let board = printBattleship(n)
    let countHit = 0

    for(let i = 0; i < n ; i++){
        for(let j = 0; j < n ; j++){
            for(let k = 0; k < coordinate.length; k++){
                if(board[i][0] === coordinate[k][0] && board[0][j] === coordinate[k][1] ){
                    if(board[i][j] !== ' '){
                        countHit++
                    }
                    board [i][j] = 'X'
                }
            }
        }
    }
    console.log(board)
    return 'kapal tertembak: ' + countHit
    
}

console.log(startGame(command.slice(2)));



