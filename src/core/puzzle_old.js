class Puzzle {

  constructor(size = 3, board = false) {
    this.initBoard(size, board)
  }

  initBoard(size, board = false) {
    this.size = size
    this.boardRange = size*size
    this.board = board ? [...board] : this.getSolvedBoard()
    this.indexOfEmpty = board ? this.findIndexOfEmpty() : this.boardRange - 1
  }

  getSolvedBoard() {
    const board = [...Array(this.boardRange).keys()]
    board.push(board.shift())
    return board;
  }
  
  isSolved() {
    const solved = this.getSolvedBoard()
    for (const i in this.board) {
      if (this.board[i] !== solved[i]) {
        return false
      }
    }
    return true
  }

  indexOf(nr) {
    return this.board.findIndex(item => item == nr)
  }

  findIndexOfEmpty() {
    return this.indexOf(0)
  }

  row(index) {
    return Math.floor(index / this.size)
  }

  rowDist(index1, index2) {
    return this.row(index1) - this.row(index2)
  }

  col(index) {
    return index % this.size
  }

  colDist(index1, index2) {
    return this.col(index1) - this.col(index2)
  }

  isSameRowWithEmpty(index) {
    return (this.row(index) == this.row(this.indexOfEmpty))
  }

  isSameColWithEmpty(index) {
    return (this.col(index) == this.col(this.indexOfEmpty))
  }

  swap(index1, index2) {
    [this.board[index1], this.board[index2]] = [this.board[index2], this.board[index1]]
  }

  swapWithEmpty(index) {
    this.swap(index, this.indexOfEmpty)
    this.indexOfEmpty = index
  }

  emptyLeft() {
    if (this.col(this.indexOfEmpty) > 0) {
      this.swapWithEmpty(this.indexOfEmpty - 1)
      return true
    }
  }

  emptyRight() {
    if (this.col(this.indexOfEmpty) < this.size - 1) {
      this.swapWithEmpty(this.indexOfEmpty + 1)
      return true
    }
  }

  emptyUp() {
    if (this.row(this.indexOfEmpty) > 0) {
      this.swapWithEmpty(this.indexOfEmpty - this.size)
      return true
    }
  }

  emptyDown() {
    if (this.row(this.indexOfEmpty) < this.size - 1) {
      this.swapWithEmpty(this.indexOfEmpty + this.size)
      return true
    }
  }

  emptyMoveTo (dir) {
    switch (dir) {
      case 'L':
        return this.emptyLeft()
      case 'R':
        return this.emptyRight()
      case 'U':
        return this.emptyUp()
      case 'D':
        return this.emptyDown()
    }
  }

  shuffle () {
    const directions = ['U', 'D', 'L', 'R']
    for (let i = 0; i < this.boardRange * 100; i++) {
      const di = Math.floor(Math.random() * 4)
      this.emptyMoveTo(directions[di])
    }
  }

  callMultiTimes (method, n = 1) {
    for (let i = 0; i < n; i++) {
      this.[method]()
    }
  }

  orMultiMove(method1, method2, dist) {
      if (dist < 0) {
        this.callMultiTimes(method1, -dist)
      } else {
        this.callMultiTimes(method2, dist)
      }
  }

  clickTo(index) {
    if (index == this.indexOfEmpty) {
      return
    }
    if (this.isSameRowWithEmpty(index)) {
      this.orMultiMove('emptyLeft', 'emptyRight', this.colDist(index, this.indexOfEmpty))
    }
    if (this.isSameColWithEmpty(index)) {
      this.orMultiMove('emptyUp', 'emptyDown', this.rowDist(index, this.indexOfEmpty))
    }
  }

  rowDistance = (i) => Math.abs(this.rowDist(i, this.board[i] - 1))
  colDistance = (i) => Math.abs(this.colDist(i, this.board[i] - 1))

  manhattan () {
    let distance = 0
    for (let i = 0; i < this.boardRange; i++) {
      if (i == this.indexOfEmpty) {
        continue
      }
      distance += this.rowDistance(i) + this.colDistance(i)
    }
    return distance
  }

  hamming () {
    let nrOutOfPlace = 0
    for (let i = 0; i < this.boardRange; i++) {
      if (i == this.indexOfEmpty) {
        continue
      }
      if (this.board[i] !== i + 1) {
        nrOutOfPlace++
      }
    }
    return nrOutOfPlace
  }

  distances () {
    let manhattan = 0
    let hamming = 0

    for (let i = 0; i < this.boardRange; i++) {
      if (i == this.indexOfEmpty) {
        continue
      }
      if (this.board[i] !== i + 1) {
        hamming++
      }
      manhattan += this.rowDistance(i) + this.colDistance(i)
    }

    return {
      manhattan,
      hamming
    }
  }
}

export default Puzzle
