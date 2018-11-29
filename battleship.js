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


function buatKapal(size) {


    let kordinat = randomPos();
    // console.log('                 random kordinat', kordinat, '\n');


    let X = kordinat[0]
    let Y = kordinat[1]

    for (let i = 0; i < size; i++) {
        while (!cekBatas(X, Y, size)) {
            kordinat = randomPos()

            X = kordinat[0]
            Y = kordinat[1]
        }

    }
}




function cekBatas(x, y, size) {

    let checker = true
    if (y + size > 10) {
        checker = false
    }
    return checker
}

buatKapal(2)
buatKapal(3)
buatKapal(4)
buatKapal(5)
console.log(laut);
