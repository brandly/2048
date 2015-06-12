import { sortBy } from 'lodash'
import Board from './board'
import Square from './square'

export default class Game {
  constructor() {
    this.size = 4
    this.board = new Board(this.size)
  }

  up() {
    this.makeMove(this.board.getColumn, this.slideLeft, this.board.updateColumnByIndex)
  }

  right() {
    this.makeMove(this.board.getRow, this.slideRight, this.board.updateRowByIndex)
  }

  down() {
    this.makeMove(this.board.getColumn, this.slideRight, this.board.updateColumnByIndex)
  }

  left() {
    this.makeMove(this.board.getRow, this.slideLeft, this.board.updateRowByIndex)
  }

  /* ~PRIVATE~ */

  makeMove(getList, shift, updateList) {
    let anythingHasChanged = false
    for (let i = 0; i < this.size; i++) {
      const list = getList.call(this.board, i)
      const shiftedList = shift.call(this, list)
      anythingHasChanged = anythingHasChanged || !this.listIsEqual(list, shiftedList)
      updateList.call(this.board, shiftedList, i)
    }
    if (anythingHasChanged) {
      this.insertRandomSquare()
    }
  }

  insertRandomSquare() {
    const point = randomInArray(this.board.getFreePoints())
    this.board.insertSquareAtPoint(this.getNewSquare(), point)
  }

  getNewSquare() {
    // one in every `chance` is a 4 instead of a 2
    const chance = 8
    const draw = randomIntUnder(chance) + 1
    if (draw === chance) {
      return new Square(4)
    } else {
      return new Square(2)
    }
  }

  slideLeft(list) {
    list = this.fillGaps(list)

    // combine adjacent, matching squares
    for (let i = 1; i < this.size; i++) {
      let leftSquare = list[i - 1]
      let rightSquare = list[i]
      if (leftSquare && rightSquare && leftSquare.getValue() === rightSquare.getValue()) {
        leftSquare.setValue(leftSquare.getValue() + rightSquare.getValue())
        // clear rightSquare's old spot
        list[i] = null
      }
    }

    return this.fillGaps(list)
  }

  slideRight(list) {
    list = list.slice()
    list.reverse()
    list = this.slideLeft(list)
    list.reverse()
    return list
  }

  fillGaps(list) {
    // slide to fill gaps
    return sortBy(list, function (square) {
      if (square === null) {
        return 1
      } else {
        return -1
      }
    })
  }

  listIsEqual(first, second) {
    for (let i = 0; i < first.length; i++) {
      let a = first[i]
      let b = second[i]

      if (a === null && b !== null) {
        return false
      } else if (b === null && a !== null) {
        return false
      } else if (a && b && a.getValue() !== b.getValue()) {
        return false
      }
    }
    return true
  }
}

function randomIntUnder(cap) {
  return Math.floor(Math.random() * cap)
}
function randomInArray(arr) {
  return arr[randomIntUnder(arr.length)]
}
