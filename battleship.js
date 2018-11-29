// Your code here

let array = [];

let ships = [
    {name: "A", size: 5, shipName: "Aircraft Carrier"},
    {name: "B", size: 4, shipName: "Battleship"},
    {name: "C", size: 3, shipName: "Cruiser"},
    {name: "D", size: 2, shipName: "Destroyer"}
]
let index = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 10
}
let command = process.argv.slice(2);

function playing() {
    battleShipBoard();
    console.clear();
    bomb(command[0], array)
}
playing();

function battleShipBoard() {
    let index = 0;
    let alphabet = "ABCDEFGHIJ";
    for (let i = 0; i <= 10; i++) {
        let temp = [];
        for (let j = 0; j <= 10; j++) {
            if (j === 0 && i > 0) {
                temp.push(alphabet[index]);
                index++;
            } else if (i === 0 && j > 0) {
                temp.push(j + "");
            } else {
                temp.push(" ");
            }
        }
        array.push(temp);
    }
    for (let i = 0; i <= ships.length-1; i++) {
        randomShipPosition(array, ships[i]);
    }

    return array;
}

function randomShipPosition(array, ships) {
    let verticalOrHorizontal = randomVerticalOrHorizontal();
    if (verticalOrHorizontal === "Horizontal") {
        changePosition(array, ships, verticalOrHorizontal);
    } else {
        changePosition(array, ships, verticalOrHorizontal);
    }
}

function randomIndex() {
    let indexCol = Math.floor((Math.random() * 10) + 1);
    let indexRow = Math.floor((Math.random() * 10) + 1);
    let index = [indexRow, indexCol];
    return index;
}

function changePosition(array, ships, verticalOrHorizontal) {
    let isVacant = false;

    while (isVacant === false) {
        let getIndex = randomIndex(array);
        let index = 0
        if (verticalOrHorizontal === "Horizontal") {
            index = getIndex[1];
        } else {
            index = getIndex[0];
        }
        if (array[index + ships.size] !== undefined) {
            for (let j = index; j <= index + ships.size; j++) {  
                if (verticalOrHorizontal === "Horizontal") {
                    if (array[getIndex[0]][j] === " " ) {
                        isVacant = true;
                    } else {
                        isVacant = false;
                        break;
                    }
                } else {
                    if (verticalOrHorizontal === "Vertical") {
                        if (array[j][getIndex[1]] === " " ) {
                            isVacant = true;
                        } else {
                            isVacant = false;
                            break;
                        }
                    }
                }
            }
        }
        if (isVacant === true) {
            if (verticalOrHorizontal === "Horizontal") {
                for (let i = index; i <= index + ships.size; i++) {
                    array[getIndex[0]][i] = ships.name;
                }
            } else {
                for (let i = index; i <= index + ships.size; i++) {
                    array[i][getIndex[1]] = ships.name;
                }
            }
           
        } 
    }
} 

function randomVerticalOrHorizontal() {
    let array = ["Vertical", "Horizontal"];
    let index = Math.floor(Math.random() * 2);
    return array[index];
}

function bomb(target, array) {
    let indexHorizontal = index[target[0]];
    let indexVertical = Number(target[1]);
    let result = '';
    if (array[indexHorizontal][indexVertical] === " ") {
        array[indexHorizontal][indexVertical] = "/";
        result = `semua kapal selamat`;
    } else {
        let victim = checkWhoGotBombed(array[indexHorizontal][indexVertical]);
        result = `kapal ${victim} telah terbom`;
        array[indexHorizontal][indexVertical] = "X";
    }
    console.log(array); 
    console.log(result);
}
function checkWhoGotBombed(type) {
    for (let i = 0; i <= ships.length-1; i++) {
        if (ships[i].name === type) {
            return ships[i].shipName;
        }
    }
}

