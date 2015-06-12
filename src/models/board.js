import Point from './point'

export default class Board {
  constructor(size) {
    this.size = size
    this.columns = []

    for(let i = 0; i < this.size; i++) {
      const column = []
      for(let j = 0; j < this.size; j++) {
        column.push(null)
      }
      this.columns.push(column)
    }
  }

  getColumn(index) {
    // slice for read-only
    return this.columns[index].slice()
  }

  getRow(index) {
    return this.columns.map((column) => {
      return column[index]
    })
  }

  updateRowByIndex(row, index) {
    this.columns.forEach((column, x) => {
      column[index] = row[x]
    })
  }

  updateColumnByIndex(column, index) {
    this.columns[index] = column
  }

  isPointFree(point) {
    return columns[point.x][point.y] === null
  }

  insertSquareAtPoint(square, point) {
    this.columns[point.x][point.y] = square
  }

  getFreePoints() {
    const free = []

    this.columns.forEach((column, x) => {
      column.forEach((square, y) => {
        if (square === null) {
          free.push(new Point(x, y))
        }
      })
    })

    return free
  }
}
