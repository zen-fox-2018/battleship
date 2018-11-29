// Your code here
//yang ingin gw kerjakan
//1. bikin board 10 x 10
//2. bikin kapal 4 dari yang terbesar sampai yang terkecil
//3. taruh kapal secara random, horisontal dulu
function randomCoord() {
    let result = 0
    //dice range
    let max = 6
    let min = 1
    result = Math.floor(Math.random() * (max - min + 1) + min);
    return result
}

function battleShip() {
    let koleksiKapal = ['K', 'L', 'M', 'N']

    let sizekapal = [5, 4, 3, 2]

    let arena = []
    let angka = 0
    let huruf = '0ABCDEFGHIJ'
    for (let i = 0; i < 11; i++) {
        let arenaDalam = []

        for (let j = 0; j < 11; j++) {

            if (i === 0) {
                arenaDalam.push(String(angka))
                angka++
            }
            else {
                if (j === 0) {
                    arenaDalam.push(huruf[i] + '|')
                }
                else {
                    arenaDalam.push('~')


                }
            }
        }
        arena.push(arenaDalam)
    }

    // return ''
    for (var k = 0; k < koleksiKapal.length; k++) {
        var x = randomCoord()
        var y = randomCoord()
        for (var m = 0; m < sizekapal[k]; m++) {
            arena[x][y + m] = koleksiKapal[k]
        }
    }
    console.log(arena)
}


console.log(battleShip())