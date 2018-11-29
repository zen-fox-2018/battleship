const board = generateBoard()
const bom = []
const ships = [
  {
    name: 'Aircraft carrier',
    icon: 'A',
    size: 5,
    arah: '',
    pos: []
  }, 
  {
    name: 'Battleship',
    icon: 'B',
    size: 4,
    arah: '',
    pos: []
  },
  {
    name: 'Cruiser',
    icon: 'C',
    size: 3,
    arah: '',
    pos: []
  },
  {
    name: 'Destroyer',
    icon: 'D',
    size: 2,
    arah: '',
    pos: []
  }
]

function generateBoard() {
  let result = [] 
  for (let i = 0; i < 10; i++) {
    let temp = []
    for (let j = 0; j < 10; j++) {
      temp.push(' ')
    }
    result.push(temp)
  }
  return result
}

function randomShip() {
  ships.forEach((ship)=> {
    let check = false
    while(check == false) {
      var randomRow = Math.floor(Math.random()*9)
      var randomCol = Math.floor(Math.random()*9)
      var dic = ['ver', 'hor']
      var arah = dic[Math.floor(Math.random() * dic.length)]
      if (board[randomRow][randomCol] === ' ' ) {
        let temp =[]
        for (let i = 0; i < ship.size; i++) {
          if (arah === 'ver') {
            if(cekCoor([randomRow, randomCol + i]) && board[randomRow][randomCol + i] == ' ' && (randomCol+i) !== undefined ){
              temp.push([randomRow, randomCol + i])
            }
          } else if (arah === 'hor') {
            if(cekCoor([randomRow + i,randomCol]) && board[randomRow + i][randomCol] == ' ' && (randomRow + i) !== undefined ){
              temp.push([randomRow + i, randomCol])
            }
          }
        }
        if(temp.length == ship.size) {
          check = true
          ship.pos.push(temp)
        }
        
      }
      if (check === true) {
        break
      }
    }
    
    ship.pos.forEach(pos => {
      pos.forEach(x => {
        board[x[0]][x[1]] = ship.icon
      })
    })
  })

  
}

function cekCoor(coor) {
  if (coor[0] >=9 || coor[1] >= 9) return false
  if (board[coor[0]][coor[1]] === ' ' ) return true
  return false
}

function genBom() {
  let kamus = 'ABCDEFGHIJ'
  process.argv.slice(2).map( x => {
    let temp = kamus.indexOf(x[0])
    bom.push([temp ,Number(x[1])])
  })
}

function checkBom(sea) {
  let count = 0
  let kapal = []
  bom.forEach( x => {
    if (sea[x[0]][x[1]] == 'A') {
      sea[x[0]][x[1]] = 'X'
      count++ 
      // kapal.push('A')
    } else if (sea[x[0]][x[1]] == 'B') {
      sea[x[0]][x[1]] = 'X'
      count++ 
      // kapal.push('B')
    } else if (sea[x[0]][x[1]] == 'C') {
      sea[x[0]][x[1]] = 'X'
      count++ 
      // kapal.push('C')
    } else if (sea[x[0]][x[1]] == 'D') {
      sea[x[0]][x[1]] = 'X'
      count++ 
      // kapal.push('D')
    } else {
      sea[x[0]][x[1]] = '/'
    }
  })

 
  console.log(`Anda berhasil menenggelamkan ${count} kapal`)
}


function main() {
  randomShip()
  genBom()
  checkBom(board)
  console.log(board)

  // console.log(bom)
  // console.log(ships)
  // console.log(ships.map(x => JSON.stringify(x.pos)))
}
main()