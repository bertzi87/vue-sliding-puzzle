class Puzzle {

  constructor(size, board = false) {

    this.size = parseInt(size)
    this.range = this.size * this.size
    this.board = board ? board : this.getSolvedBoard()
    this.indexOfEmpty = this.board.indexOf(0)
  }

  getSolvedBoard = () => [...Array(this.range).keys()].map(item => item == this.range - 1 ? 0 : item + 1)

  col = (index) =>  index % this.size
  row = (index) => Math.floor(index / this.size)

//   indexOfEmpty = () => this.board.indexOf(0)

  colOfEmpty = () => this.col(this.indexOfEmpty)
  rowOfEmpty = () => this.row(this.indexOfEmpty)

  colDiff = (index1, index2) => this.col(index1) - this.col(index2)
  rowDiff = (index1, index2) => this.row(index1) - this.row(index2)

  colDiffEmpty = (index) => this.colDiff(this.indexOfEmpty, index)
  rowDiffEmpty = (index) => this.rowDiff(this.indexOfEmpty, index)

  swap(index1, index2) {
    [this.board[index1], this.board[index2]] = [this.board[index2], this.board[index1]]
  }

  swapWithEmpty(index) {
    this.swap(index, this.indexOfEmpty)
    this.indexOfEmpty = index
  }

  moveEmptyLeft() {
    if (this.colOfEmpty() > 0) {
      this.swapWithEmpty(this.indexOfEmpty - 1)
      return true
    }
  }

  moveEmptyRight() {
    if (this.colOfEmpty() < this.size - 1) {
      this.swapWithEmpty(this.indexOfEmpty + 1)
      return true
    }
  }

  moveEmptyUp() {
    if (this.rowOfEmpty() > 0) {
      this.swapWithEmpty(this.indexOfEmpty - this.size)
      return true
    }
  }

  moveEmptyDown() {
    if (this.rowOfEmpty() < this.size - 1) {
      this.swapWithEmpty(this.indexOfEmpty + this.size)
      return true
    }
  }

  moveEmpty(direction, reverse = false) {
    switch(direction) {
      case 'left':
      case 'L':
        return (reverse) ? this.moveEmptyRight() : this.moveEmptyLeft()
      case 'right':
      case 'R':
        return (reverse) ? this.moveEmptyLeft() : this.moveEmptyRight()
      case 'up':
      case 'U':
        return (reverse) ? this.moveEmptyDown() : this.moveEmptyUp()
      case 'down':
      case 'D':
        return (reverse) ? this.moveEmptyUp() : this.moveEmptyDown()
    }
  }

  move(direction) {
    return this.moveEmpty(direction, true)
  }

  shuffle() {
    const directions = ['U', 'D', 'L', 'R']
    let moves = 0
    while (moves < this.range * 100) {
      const di = Math.floor(Math.random() * 4)
      if (this.moveEmpty(directions[di])) {
        moves++
      }
    }
  }

  moveEmptyMultiple(times, direction) {
    for (let i = 0; i < times; i++) {
      this.moveEmpty(direction)
    }
  }

  clickTo(index) {

    const rowDiff = this.rowDiffEmpty(index)
    const colDiff = this.colDiffEmpty(index)

    const isSameRow = rowDiff == 0
    const isSameCol = colDiff == 0

    if (!isSameRow && !isSameCol) {
      return false
    }

    const diff = rowDiff || colDiff
    this.moveEmptyMultiple(Math.abs(diff),
      (isSameRow) ? (diff > 0 ? 'left' : 'right')
                  : (diff > 0 ? 'up' : 'down')
    )
  }

  toString() {
    let result = ''

    this.board.forEach((item, index) => {
      result += (this.col(index) == 0 ) ? '        ' : ''
      result += (item == 0) ? '  '
              : (item < 10) ? ' ' + item : item
      result += (this.col(index) == this.size - 1 ) ? '\n' : ' '
    })

    return result
  }
}

module.exports = Puzzle
