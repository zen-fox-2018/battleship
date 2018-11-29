// Your code here
"use strict"
const inputUser = process.argv.slice(2)
var num = inputUser[0]
var heading = [1,2]
var arah = heading[Math.floor(Math.random()*2)]
console.log(arah)

// function arena (){
//     let result = []
//     var counterA = 0
//     var counterB = 0
//     var counterC = 0
//    for(let i = 0; i <=num; i ++){
//        let holder = []
//        for(let j = 0; j <=num; j++){
//         if(j == 0 && i > 0){
//             holder.push(i)
//         }
//         else if(i == 0 &&j > 0){
//             holder.push(String.fromCharCode(j+64))
//         }
//         else {
//             holder.push(' ')
//         }
       
//     }
//        result.push(holder)
//    }
// //   console.log(result)
//    return result
// }
// //arena()

// function  mainFunction (){
//     let kamus = 'a'
//     var str =  arena(num)
//     for(let k = 0; k < str.length; k++){
//         for(let l = 0; l < str.length; l++){
//             if(str[l][k] == ' '){
//                 for(let m = 0; m < 5; m++){
//                     str[l][k+m] = 'a'
//                 }
//             }else if(str[l][k] == ' '){
//                 for(let n = 0; n < 4; n++){
//                     str[l][k+n] ='b'
//                 }
//             }
//         }
//     }
//   //  console.log(str)
// }
// mainFunction()


function creatBoard(){
    let board = []
    for(let i = 0; i <= num; i++){
        let holder = []
        for(let j = 0; j <= num; j++){
            if( i == 0 && j > i){
                holder.push(String.fromCharCode(j+64))
            }
            else if( i > 0 && j == 0){
                holder.push(i)
            }
            else {
                holder.push(' ')
            } 
        }
        board.push(holder)
    }
    return board
}
var randomX = Math.round(Math.random()*num)
var randomY = Math.round(Math.random()*num)
//console.log(randomX)
var kapalPerang = [{name : '#',x: randomX, y: randomY, size : 5},
 {name : '&',x: randomX, y: randomY, size : 4}, 
 {name: '@', x: randomX, y: randomY, size: 3},
 {name:'%', x: randomX, y: randomY, size: 2} ]

function inputShip(){
    let str = creatBoard()
            
            for(let m = 0; m < kapalPerang.length; m++){
                var randomX = Math.round(Math.random()*num)
                var randomY = Math.round(Math.random()*num)
                if(str[randomX][randomY] == ' ' &&  arah == 1){
                    for(let n = 0; n < kapalPerang[m].size; n++){
                        str[randomX][randomY+n] = kapalPerang[m].name
                    } 
                }
                else if(str[randomX][randomY] == ' ' && arah == 2){
                    for(let n = 0; n < kapalPerang[m].size; n++){
                        str[randomX + n][randomY] = kapalPerang[m].name
                    } 
                }
            // }
        // }
    }
    console.log(str[3][2])
    console.log(str)
}
inputShip()