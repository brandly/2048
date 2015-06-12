import assert from 'assert'
import Board from '../src/models/board'
import Square from '../src/models/square'
import Point from '../src/models/point'

describe('Board', function () {
  it('creates a square of empty points', function () {
    const size = 4
    const board = new Board(size)
    assert.equal(size * size, board.getFreePoints().length)
  })

  it('can fill a point', function () {
    const size = 4
    const board = new Board(size)
    board.insertSquareAtPoint(new Square(2), new Point(0, 0))
    assert.equal(size * size - 1, board.getFreePoints().length)
  })
})
