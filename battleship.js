// Your code here
const inputUser = process.argv
var inputProcess = inputUser.slice(2)

const row = 10
var allBomb = koordinate()
var objKapal = [{
        name: 'Aircraft carrier',
        size: 5,
        coordinate: {i:0,j:0},
        icon: 'a'
    },
    {
        name: 'Battleship',
        size: 4,
        coordinate: {i:0,j:0},
        icon: 'b'
    },
    {
        name: 'Cruiser',
        size: 3,
        coordinate: {i:0,j:0},
        icon: 'c'
    },
    {
        name: 'Destroyer',
        size: 2,
        coordinate: {i:0,j:0},
        icon: 'd'
    }
]

function koordinate(){
    let input = inputProcess
    let koor = []
    for(let i=0 ; i < input.length; i++){
        if(checkKoor(input[i][0].toUpperCase())){
            var temp=[]
            temp.push(convertKoor(input[i][0].toUpperCase()),Number(input[i][1]))
            koor.push(temp)
            
        }
    }
    return koor
}


console.log(koordinate())
function convertKoor(string){
    let kamus='ABCDEFGHIJ'
    for(let i = 0; i < kamus.length; i++){
        if(string == kamus[i]){
            return i + 1
        }
    }
}
function checkKoor(string){
    let kamus='ABCDEFGHIJ'
    for(let i = 0; i < kamus.length; i++){
        if(string == kamus[i]){
            return true
        }
    }
    return false
}


function generateBoard(){
    let generate= []
    let kamus=' ABCDEFGHIJ'
    for(let i = 0; i <= row; i++){
        let generateDalam= []
        for(let j = 0; j <= row; j++){
            if(i == 0 && j > 0 ){
                generateDalam.push(String(j))
            } else if(j == 0 && i >0){
                generateDalam.push(kamus[i])
            }
            else {
                generateDalam.push(' ')
            }
        }
        generate.push(generateDalam)
    }
    return generate
}

function randomCoordinate(){
    let randomCoor = ~~(Math.random() * row) + 1
    return randomCoor
}
function randomVertikalOrHorizontal(){
    let randomVertiOrHori = ~~(Math.random() * 2) 
    return randomVertiOrHori
}
console.log(randomVertikalOrHorizontal())
function GenerateKapal(allKapal,boardGameParam){
    for(let kapal=0; kapal < allKapal.length; kapal++){
        while(allKapal[kapal].coordinate.i == 0 && allKapal[kapal].coordinate.j == 0){
            allKapal[kapal].coordinate.i = randomCoordinate()
            allKapal[kapal].coordinate.j = randomCoordinate() 
            var vertiORHori = randomVertikalOrHorizontal() // 0 = verti 1 = Hori
           
            console.log(`Masuk ke- ${kapal} arah- ${vertiORHori} dengan koordinat :`, allKapal[kapal].coordinate  )
             let corI = allKapal[kapal].coordinate.i
             let corJ = allKapal[kapal].coordinate.j
             let checkKosong = true
             for(let k = 0; k < allKapal[kapal].size; k++){
                if(boardGameParam[corI][corJ] == ' ' &&  (corI + k) <= 10 && (corJ + k) <= 10) {
                    if(vertiORHori == 1){
                        if(boardGameParam[corI][corJ+k] !== ' '){
                            checkKosong = false
                        }
                    }else{
                        if(boardGameParam[corI + k][corJ] !== ' '){
                            checkKosong = false
                        }
                    }
                }
                else {
                    checkKosong = false
                }   
            }
            if(!checkKosong){
                allKapal[kapal].coordinate.i = 0
                allKapal[kapal].coordinate.j = 0
            }else{
                for(let i = 0;i < allKapal[kapal].size; i++){
                    if(vertiORHori == 1){
                        boardGameParam[corI][corJ+i] = allKapal[kapal].icon
                    }else{
                        boardGameParam[corI+i][corJ] = allKapal[kapal].icon
                    }
                }
            }
        }
    }
    return boardGameParam
}

function horizontal(){

}
function vertical(){

}

function throwBomb(boardGameParam){
    var countDestroy=0
    for(let i=0 ; i< boardGameParam.length; i++){
        for(let j=0; j < boardGameParam.length; j++){
            for(let bombI=0; bombI < allBomb.length ; bombI++){
                if(i == allBomb[bombI][0] && j == allBomb[bombI][1]){
                    if(boardGameParam[i][j] == ' ' ){
                        boardGameParam[i][j] = 'x'
                    }else{
                        boardGameParam[i][j] = 'x'
                        countDestroy++
                    }
                }
            } 
        }
    }
    if(countDestroy){
        console.log(`Serangan yang kena ke kapal = ${countDestroy} `)
    }else{
        console.log('Serangan tidak ada yang kena')
    }
    return boardGameParam
}   


function main(){
    var boardGames = generateBoard()
    boardKapal = GenerateKapal(objKapal,boardGames)
    return throwBomb(boardKapal)
}

//console.log(throwBomb(generateBoard()))
console.log(main())