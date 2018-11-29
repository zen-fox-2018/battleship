// Your code here
const argv = process.argv.slice(2)
let board = generateBoard()
let Ships = [
    {
        ship:"Aircraft carrier",
        size: 5,
        print: "O",
        coordinate: [],
        pos: generatepos()
    },
    {
        ship:"Battleship",
        size:4,
        print: "Z",
        coordinate:[]
    },
    {
        ship:"Cruiser",
        size:3,
        print: "G",
        coordinate:[]
    },
    {
        ship:"Destroyer",
        size:2,
        print: "P",
        coordinate:[]
    }
]

function generateBoard () {
    let board = []
    for (let i = 0 ; i < 10 ; i++) {
        let sub = []
        for (let j = 0 ; j < 10 ; j++) {
            sub.push(" ")
        }
        board.push(sub)
    }
    return board
}

function printShip() {
    for (let i = 0 ; i < Ships.length; i++){
        let check = false
        while (check === false) {
            generateShip(Ships[i])
            if(Ships[i].pos === "vertical") {
                if(checkVertical(Ships[i])) {
                    check = true
                }
            } else if (Ships[i].pos === "horizontal") {
                if (checkHorizontal(Ships[i])) {
                    // console.log("masuk")
                    check = true
                }
            }
            if (check === true) {
                break
            }
        } 
        // console.log(Ships)
        Ships[i].coordinate.forEach(x =>{
            board[x[0]][x[1]] = Ships[i].print
        })
    }

   return board
   
}

function generateShip (obj) {
    obj.coordinate[0] = [generatekoordinat(),generatekoordinat()]
    obj.pos = generatepos()
}

function generatekoordinat () {
    let random = Math.floor(Math.random()* 10)
    return random
}
function generatepos () {
    let pos = ["vertical","horizontal"]
    let random = Math.floor(Math.random()*pos.length)
    return pos[random]
}
function checkHorizontal(obj) {
    arr = []
    for (let i = 0 ; i< obj.size ; i++){
        if (obj.coordinate[0][1]+i !== undefined) {
            if (board[obj.coordinate[0][0]][obj.coordinate[0][1]+i] === " ") {
                arr.push([obj.coordinate[0][0] , obj.coordinate[0][1]+i])
            }
        }
    }
    if(arr.length < obj.size) {
        return false
    } else if (arr.length === obj.size){
        obj.coordinate = arr
        return true
    }
}
function checkVertical(obj) {
    arr = []
    for (let i = 0 ; i< obj.size ; i++){
        if(obj.coordinate[0][0]+i < 10){
            if (board[obj.coordinate[0][0]+i][obj.coordinate[0][1]] === " ") {
                arr.push([obj.coordinate[0][0]+i , obj.coordinate[0][1]])
            }
        }
    }
    if(arr.length < obj.size) {
        return false
    } else if (arr.length === obj.size){
        obj.coordinate = arr
        return true
    }
}

printShip()
const huruf = ["A","B","C","D","E","F","G","H","I","J"]
let boms = []
for (let i = 0 ; i < argv.length ; i++) {
    let data = argv[i].split("")
    let X = huruf.findIndex(x => {
        return x === data[0] 
    })
    boms.push([X+1,data[1]])
}

boms.forEach(bom =>{
    // console.log(bom)
    let x = bom[0]
    let y = bom[1] 
    if(board[x][y] === " ") {
        board[x][y] = "X"
        console.log(`weeeeek gak kena`)
    } else {
        let kapal =  Ships.filter((e) => {
            return e.print === board[x][y]
        } )
        // console.log(kapal)
        board[x][y] = "X"
        console.log(`yang kena adalah kapal ${kapal[0].ship}`)   
    }
    
})
console.log(board)

