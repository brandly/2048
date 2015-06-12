import Game from './game'
import keypress from 'keypress'
keypress(process.stdin)

export default class TwentyFourtyEight {
  constructor() {
    this.game = new Game

    // init with two squares
    this.game.insertRandomSquare()
    this.game.insertRandomSquare()
    drawBoard(this.game.board)

    process.stdin.on('keypress', (ch, key) => {
      switch (key.name) {
        case 'up':
          this.game.up()
          break;
        case 'right':
          this.game.right()
          break;
        case 'down':
          this.game.down()
          break;
        case 'left':
          this.game.left()
          break;
      }
      drawBoard(this.game.board)
    })
  }
}

function drawBoard(board) {
  for (let i = 0; i < board.size; i++) {
    let row = board.getRow(i)

    let printedValues = row.map(square => {
      let defaultValue = '    '
      if (square === null) {
        return defaultValue
      } else {
        let squareValue = square.getValue().toString()
        return defaultValue.slice(0, defaultValue.length - squareValue.length) + squareValue
      }
    })

    console.log(printedValues.join(' | '))
  }
}
