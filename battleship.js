
// const args = process.argv.slice(2)
// SHIPS
const shipsObj = [{
    ships: "Aircraft carrier",
    size: 5,
    graphic: "🌸",
    location: [randomLocation(),randomLocation()]
}, {
    ships: "Battleship",
    size: 4,
    graphic: "🏵️",
    location: [randomLocation(),randomLocation()]
},{
    ships: "Cruiser",
    size: 3,
    graphic: "🌼",
    location: [randomLocation(),randomLocation()]
},{
    ships: "Destroyer",
    size: 2,
    graphic: "🌹",
    location: [randomLocation(),randomLocation()]
}]

// Generate board
function generateBoard(row, col) {
    let board = [];
    for(let i = 0; i < row; i++) {
        board.push([])
        for(let j = 0; j < col; j++) {
            board[i].push("")
        }
    }
    return board
}

function randomLocation() {
    let random = Math.floor(Math.random()*10);
    return random
}

function shipsBoard() {
    let board = generateBoard(10, 10);

    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            shipsObj.map(element => {
                if(i === element.location[0] && j === element.location[1]) {
                    board[i][j] = element.graphic
                }
            })
        }
    }
    return board
}

function graphicPosition() {
    let line = ["Vertical", "Horizontal"];
    let random = line[Math.floor(Math.random()*Math.floor(line.length))];

    return random
}

function checkHorizontal() {
    let board = shipsBoard();
    let allignment = graphicPosition();
    let checkHorizontal = false;

    shipsObj.forEach(element => {

        if(allignment === "Horizontal") {
            
            let locationHorizontalX = element.location[0];
            let locationHorizontalY = element.location[1];
            
            for(let i = 0; i < element.size; i++) {
                if(board[locationHorizontalX+i][locationHorizontalY] === "") {
                    checkHorizontal = true
                } else {
                    return false
                }
            }
        }
    });
    return checkHorizontal
}

function checkVertical() {
    let board = shipsBoard();
    let allignment = graphicPosition();
    let checkVertical = false;

    shipsObj.forEach(element => {
        if(allignment === "Vertical") {
            let locationVerticalX = element.location[0];
            let locationVerticalY = element.location[1];

            for(let i = 0; i < board.length; i++) {
                if(board[locationVerticalX][locationVerticalY+i] === "") {
                    checkVertical = true
                } else {
                    return false
                }
            }
        }
    })
    return checkVertical
}

function printShips() {
    let board = shipsBoard();
    let allignment = graphicPosition();

    shipsObj.forEach(element => {
        for(let i = 0; i < element.size; i++) {
            let locationX = element.location[0];
            let locationY = element.location[1];

            if(allignment === "horizontal") {
                board[locationX][locationY+i] = element.graphic
            } else if (allignment === "Vertical") {
                board[locationX+i][locationY] = element.graphic
            }
        }
    })
    console.log(board)
}

printShips()

//
// shipsObj.map(element => {
//     // console.log(element)
//     if(element.position === "Horizontal") {
//         let locationX = element.location[0]
//         for(let i = 0; i < element.size; i++) { // ---> horizontal
//             board[i][locationX] = element.graphic
//         }
//     } 
    
//     else if (element.position === "Vertical") {
//         let locationY = element.location[1]
//         for(let i = 0; i < element.size; i++) {
//             board[locationY][i] = element.graphic
//         }
//     }
// })

// console.log(board)