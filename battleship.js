var serangan = process.argv.slice(2)
serangan = serangan.map(a => a.split(''))
var laut = printLaut();
argv()

function argv(){
  if (serangan[0] === undefined) {
    console.log(`SELAMAT DATANG DI PERMAINAN SEDERHANA KAPALAN!
    DI DALAM GAME INI TERDAPAT LAUT YANG BERISI KAPAL-KAPAL DARI MUSUH - MUSUH KALIAN
    SILAKAN INPUT KOORDINAT YANG AKAN DIGUNAKAN UNTUK MENEMBAK KAPAL MUSUH

    HINT :
    - Input koordinat hanya dari A - J
    - Kapal musuh selalu ditampilkan RANDOM
    - Kamu boleh menginput koordinat sebanyak 10x
    - Command Terminal : node battleship.js [koor-1] [koor-2] ...... [koor-10]
    `)
    console.log(laut)
  } else if (serangan[10] !== undefined) {
    console.log('Hanya boleh menembak 10x')
  } else {
    console.log(serangan);
    gameplay();
  }
}

function printLaut () {
  let output = []
  let counter = 1

  for (let i = 0 ; i < 10 ; i++) {
    let arrDalam = []
    for (let j = 0 ; j < 10 ; j++) {

        arrDalam[j] = ' '//'🌊'

    }
    output.push(arrDalam)
  }

  return output
}

function randomKoor() {
  let koor = Math.floor(Math.random() * 100)
  if (koor < 10) {
    koor = '0' + koor
  } else {
    koor = String(koor)
  }
  return koor
}

function orientasi() {
  let orient = Math.floor(Math.random() * 2)
  return orient
}

function generateKapal(n) {
  // console.log(xy);
  let cek = true
  let xy = randomKoor()
  let orient = orientasi()
  while (cek){
    xy = randomKoor()
    orient = orientasi()
    cek = checkOmbak(xy, orient, n) || checkKapal(xy, orient, n)
  }
  let x = +(xy[0])
  let y = +(xy[1])

  if(orient === 1) {
    z = 'menurun'
  } else z = 'mendatar'
  console.log(x , y, z);

  for (let i = 0 ; i < n ; i++) {
    if (orient === 0) {
      laut[x][y+i] = '🚢'
    } else if (orient === 1){
      laut[x+i][y] = '🚢'
    }
  }
}

function checkOmbak(koor, orient, panjang) {
  let x = +(koor[0])
  let y = +(koor[1])

  if (orient === 0) {
    if (y + panjang >= 9) {
      return true
    }
  } else if (orient === 1) {
    if (x + panjang >= 9) {
      return true
    }
  }

  return false
}

function checkKapal(koor, orient, panjang) {
  let x = +(koor[0])
  let y = +(koor[1])

  for (let i = 0 ; i < panjang ; i++) {
    if (orient === 0 && laut[x][y+i] === '🚢'){
      return true
    } else if (orient === 1 && laut[x+i][y] === '🚢'){
      return true
    }
  }
  return false
}

function tembakKapal(array) {
  let kamus = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  let counter = 0

  for (let i = 0 ; i < serangan.length ; i++) {
    let x = +kamus.indexOf(serangan[i][0]);
    let y = +serangan[i][1]
    if (laut[x][y] === '🚢'){
      counter++
    }
    laut[x][y] = 'X'
  }

  return counter
}

function gameplay() {
  generateKapal(2)
  generateKapal(3)
  generateKapal(4)
  generateKapal(5)
  let hasil = tembakKapal()
  console.log(laut);
  console.log(`${hasil} kapal tenggelam`);
}
