// Your code here
const argv = process.argv.slice(2)
let board = printBoard(10)

function randCoordinate() {
    return Math.floor((Math.random() * 10))
}

let shipsFlett = [
    {name: 'Aircraft Carrier', size: 5, icon: '#'},
    {name: 'Battleship', size: 4, icon: '@'},
    {name: 'Cruiser', size: 3, icon: '&'},
    {name: 'Destroyer', size: 2, icon: '%'}
]

function shipDirection() { 
    let direction = ['horizontal', 'vertical']
    let a = Math.round(Math.random())
    return direction[a]
}

function printBoard(size) {
    let board = []
    for (let i = 1; i <= size; i++) {
        let temp = []
        for (let j = 1; j <= size; j++) {
            temp.push(' ')
        }
        board.push(temp)
    }
    return board
}

// generate random ship
function generateShip(board) {
    let temp = []
    for(let i = 0; i < shipsFlett.length; i++) {
        let condition = false
        // cek koordx n koord y
        while(condition === false) {
            temp = []
            condition = true
            let coordX = randCoordinate()
            let coordY = randCoordinate()
            let getDirection = shipDirection()
            if(getDirection === 'vertical') {
                for(let j = 0; j < shipsFlett[i].size; j++) {
                    if(board[coordX + j][coordY] === undefined || board[coordX + j][coordY] === ' ') { 
                        condition = false
                        break; 
                    }
                    temp.push([coordX + j, coordY])
                }
            } else if (getDirection === 'horizontal') {
                for(let k = 0; k < shipsFlett[i].size; k++){
                    if(board[coordX][coordY + k] === undefined || board[coordX][coordY + k] !== ' '){
                        condition = false
                        break;
                    }
                    temp.push([coordX, coordY + k])
                }
            }
        }
        temp.forEach((e, j) => {
            board[temp[j][0]][temp[j][1]] = shipsFlett[i].icon
        })
    }
}

function bombCoor(){
    let abjad = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    argv.forEach((e, i) => {
        argv[i] = argv[i].split('')
        abjad.forEach((x, j) => {
            if(argv[i][0] === abjad[j]){
                argv[i][0] = j
            }
        })
    })
}

function fireBombs() {
    bombCoor()
    argv.forEach((e, i) => {
        shipsFlett.map((x, j) => {
            if(board[argv[i][0]][argv[i][1]] === shipsFlett[j].icon) {
                console.log(`Berhasil menembak kapal ${shipsFlett[j].name}`)
            } 
        })
        board[argv[i][0]][argv[i][1]] = 'X'    
    })
    console.log(board);
}
generateShip(board)
fireBombs()
