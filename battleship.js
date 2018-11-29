// Your code here
let kapal = [
    ['aircraft', 5],
    ['battleship',4],
    ['cruiser',3],
    ['destroyer',2]
]

let huruf = 'ABCDEFGHIJ'
let kenaShip = 0

function boardGame (){
    let row = []
    let k = 0
    for(let i = 0; i < 11; i++){
        let col = []
        for(let j = 0; j < 11; j++) {
            if(i == 0 && j !== 0 ){
                col.push(String(j))
            }else if (j == 0 && i !== 0){
                col.push(huruf[k])
                k++
            }else{
                col.push(' ')
            }
        }
        row.push(col)
    }
    return row
}

function mainGame (){
    let arr = boardGame()
    let input = inputGame()
    for(let i = 0; i < kapal.length; i++) {
        let isCHeck = false
        while(!isCHeck){
            let m = Math.ceil(Math.random()*10)
            let k = Math.ceil(Math.random()*10)
            let arah = Math.floor(Math.random()*2)
            if(arr[m][k] === ' '){
                let count = 0
                if(arah === 1){
                    for(let j = 0; j < kapal[i][1]; j++) {
                        if(arr[m][k+j] === ' ') {
                            count++
                            if (count == kapal[i][1]) {
                                count--
                                while(count >= 0){
                                    arr[m][k+(j-count)] = 'X'
                                    count--
                                }
                                isCHeck = true
                            }
                        }
                    }
                }else{
                    for(let j = 0; j < kapal[i][1]; j++) {
                        if(arr[m+j] === undefined){
                            break
                        }
                        if(arr[m+j][k] === ' ') {
                            count++
                            if (count == kapal[i][1]) {
                                count--
                                while(count >= 0) {
                                    arr[m+(j-count)][k] = 'X'
                                    count--
                                }
                                isCHeck = true
                            }
                        }
                    }
                }
                
            }
        } 
    }
    
    for(let j = 0; j < input[0].length; j++){
        if(arr[input[0][j]][input[1][j]] === ' '){
            arr[input[0][j]][input[1][j]] = '#'
        }else if (arr[input[0][j]][input[1][j]] !== ' '){
            arr[input[0][j]][input[1][j]] = '/'
            kenaShip++
        }
    }
    return arr
}

function inputGame (){
    let print = process.argv
    print = print.slice(2)
    return print
}

function inputGame (){
    let print = process.argv
    print = print.slice(2)
    let arr = [[],[]]
    for(let i = 0; i < print.length; i++){
        for(let j = 0; j < huruf.length; j++){
            if(print[i][0] == huruf[j]){
                arr[0].push(j+1)
            }
        } 
        arr[1].push(Number(print[i][1]))
    }
    return arr
}

console.log(mainGame())
console.log (`${kenaShip} kapal tertembak`)

// console.log(inputGame())


// console.log(position('aircraft'))

            // 1. koordinat random row dan col
            // 2. check apakah board[row][col] kosong apa tidak
            // 3. dia kosong isCheck = true kalo gak ya random lg
            // 4. setelah keluar dr while masukin board[row][col] jadi kapal[i][0]