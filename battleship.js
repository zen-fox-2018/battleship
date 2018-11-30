let laut = getBoard(10)

function getBoard(size) {

    let boardArea = [];
    let valueRow = 1;

    for (let row = 0; row <= size; row++) {
        let areaInside = [];
        for (let col = 0; col <= size; col++) {
            if (row === 0 && col !== 0) {
                areaInside.push(valueRow + '')
                valueRow++
            } else if (row !== 0 & col === 0) {
                areaInside.push(String.fromCharCode(row + 64))
            }
            else {
                areaInside.push(' ')
            }
        }
        boardArea.push(areaInside)
    }

    return boardArea

}


function randomPos() {
    var random = Math.floor(Math.random() * 100);

    if (random < 10) {
        random = '0' + random
    } else {
        random = random + ''
    }


    return [+random[0] + 1, +random[1] + 1]

}

function getDirection() {
    return Math.round(Math.random())
}


function buatKapal(size) {


    let kordinat = randomPos();
    let arah = getDirection();
    let X = kordinat[0]
    let Y = kordinat[1]
    console.log('                 random kordinat', kordinat, '\n');


    for (let i = 0; i < size; i++) {
        while (cekBatas(X, Y, size)) {
            kordinat = randomPos()
            arah = getDirection()
            X = kordinat[0]
            Y = kordinat[1]

        }

        if (arah === 0) {
            laut[X+i][Y] = 'X'
        } else {
            laut[X][Y+i] = 'T'
        }
        
    }
}



function cekBatas(x, y, size, arah) {

    let checker = false

    if (y + size > 10 || x + size > 10) {
        checker = true
    }
    return checker
}

buatKapal(2)
buatKapal(3)
buatKapal(4)
buatKapal(5)

console.log(laut);
