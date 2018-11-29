// Your code here
let gameModel = {
    ships: [{
        name: `A`,
        length: 5,
        location: [],
        type: true
    }, {
        name: `B`,
        length: 4,
        location: [],
        type: false
    }, {
        name: `C`,
        length: 3,
        location: [],
        type: true
    }, {
        name: `D`,
        length: 2,
        location: [],
        type: false
    }],
    boardSize: 100,
    MathSqrt: 10,
    registeredArray: []
}

//====================================================================================================
generateBoard(gameModel.ships.boardSize)

function generateBoard(size) {

    let board = []
    let boardTemp = []
    //REGISTERING ARRAY
    for (let i = 1; i < gameModel.boardSize + 1; i++) {
        gameModel.registeredArray[i] = {
            arr: i,
            fill: undefined
        }
    }

    //GENERATE SHIPS
    generateShips()
    checkShips()
    console.clear()
    let counter = 1


    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            if (counter % 10 == 0) {
                gameModel.registeredArray[counter].fill == undefined ? boardTemp.push(`~`) : boardTemp.push(`${gameModel.registeredArray[counter].fill}`)

            } else if (counter % 10 != 0) {
                gameModel.registeredArray[counter].fill == undefined ? boardTemp.push(`~`) : boardTemp.push(`${gameModel.registeredArray[counter].fill}`)
            }
            counter++
        }
        board.push(boardTemp)
        boardTemp = []
    }
    shoot(board)
}


//GENERATE SHIP VERTICAL OR HORIZONTAL 
function generateShips(params) {
    for (let i = 0; i < gameModel.ships.length; i++) {
        gameModel.ships[i].type == true ?
            generateVertical(gameModel.ships[i].length, gameModel.ships[i].name) :
            generateHorizontal(gameModel.ships[i].length, gameModel.ships[i].name)
    }
}

function generateVertical(index, name) {
    let temp = gameModel.registeredArray
    let initialPosition = firstPosition()
    let counter = index
    let counterPosition = initialPosition
    if (initialPosition % 10 < 7 && initialPosition % 10 > 0) {
        for (let i = 1; i <= temp.length; i++) {
            if (counter > 0) {
                temp[counterPosition].fill = name
                counter--
            }
            counterPosition++
        }

    } else if (initialPosition % 10 > 6 || initialPosition % 10 == 0) {
        return generateVertical(index)
    }
    gameModel.registeredArray = temp
}

function generateHorizontal(length, name) {
    let arrTemp = gameModel.registeredArray
    let initialPosHorizontal = firstPosition()
    let counterJumlah = length
    let counterPosition = initialPosHorizontal
    if (initialPosHorizontal / 10 < 6) {
        for (let i = 1; i < arrTemp.length; i++) {
            if (counterJumlah > 0) {
                arrTemp[counterPosition].fill = name
                counterJumlah--
            }
            counterPosition += 10
        }

    } else if (initialPosHorizontal / 10 >= 6) {
        return generateHorizontal(length)
    }
    gameModel.registeredArray = arrTemp
}

function firstPosition() {
    return Math.floor(
        Math.random() * 99 + 1
    )
}

function checkShips(params) {
    let count = 0
    let shipOnBoard = 0
    for (let i = 1; i < gameModel.ships.length; i++) {
        count += gameModel.ships.length
    }

    for (let i = 1; i < gameModel.registeredArray.length; i++) {
        if (gameModel.registeredArray[i].fill != undefined) {
            shipOnBoard++
        }
    }

    if (shipOnBoard < 14) {
        return generateBoard()
    }
}

function shoot(array) {

    let board2 = array
    let argv = process.argv.slice(2)
    let alph = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
    let v = Number(alph.indexOf(argv[0][0]))
    let h = Number(argv[0][1])

    let koordinat = (v * 10) + h

    if (board2[v][h] != '~') {
        console.log(`KENA KAPAL ${board2[v][h]}`);
        board2[v][h] = `X`
        console.log(board2);
    } else {
        console.log(`GAK KENAA WEKK`);
        board2[v][h] = `X`
        console.log(board2);
    }
}

