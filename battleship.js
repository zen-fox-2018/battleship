// Your code here


let huruf = '0ABCDEFGHIJ'
let kotakPapan = 10

function buatPapan() {
    let papan = []
    for (let i = 0; i < kotakPapan + 1; i++) {
        let box = []
        for (let j = 0; j < kotakPapan + 1; j++) {
            if (i == 0 && j == 0) {
                box.push('0A')
            } else if (i == 0 && j > 0) {
                box.push(huruf[j])
            } else if (i > 0 & j == 0) {
                if (String(i).length > 1) {
                    box.push(String(i))
                } else {
                    box.push('0' + String(i))
                }
            } else {
                box.push('~')
            }
        }
        papan.push(box)
    }
    return papan
}

function randomIndex() {
    let random = Math.floor(Math.random() * 100)
    if (random < 10) {
        random = '0' + random
    } else {
        random = random + ''
    }
    return [+random[0] + 1, +random[1] + 1]
}


let board = buatPapan()

function buatKapal(panjang, kapal) {
    let koordinat = randomIndex()
    let arah = randomVH()
    let x = koordinat[0]
    let y = koordinat[1]


    for (let i = 0; i < panjang; i++) {

        while (batas(x, y, panjang, arah)) {
            koordinat = randomIndex()
            x = koordinat[0]
            y = koordinat[1]
            batas(x, y, panjang, arah)
        }

        if(arah) {
            board[x][y + i] = kapal
        } else {
            board[x+i][y] = kapal
        }

    }
    // console.log(x, y);
}

function batas(x, y, panjang, arah) {
    let cek = false
    // console.log(y);
    if(arah) {
        if (y + panjang > 10) {
            cek = true
        }
    } else {
        if (x + panjang > 10) {
            cek = true
        }
    }
    

    return cek
}

function randomVH() {
    let VH = Math.floor(Math.random() * 2)
    return VH
}

buatKapal(2, 'X');
buatKapal(3, 'Y');
buatKapal(4, 'Z');
buatKapal(5, 'A');
console.log(board)
