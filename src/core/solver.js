import Heap from 'qheap'
// import FastPriorityQueue from 'fastpriorityqueue'

import Puzzle from './puzzle.js'

export default class Solver {

  constructor (puzzle) {
    this.puzzle = puzzle
    this.size = puzzle.size
    this.visitedNr = 0

    //     this.visited = []
//     this.visited = {}
    this.visited = new Set();
    this.queue = new Heap({
      comparBefore: (a, b) =>
        this.compareManhattan(a,b)
//         this.compareManhattanShortest(a,b)
//         this.compareManhattanAndHamming(a,b)
    });

//     this.queue = new FastPriorityQueue((a, b) =>
//       this.compareManhattan(a,b)
//    this.compareManhattanShortest(a,b)
//    this.compareManhattanAndHamming(a,b)
//     )

  }

  rowDistance = (board, i) => Math.abs(i % this.size - (board[i] - 1) % this.size)
  colDistance = (board, i) => Math.abs(Math.floor(i / this.size) - Math.floor((board[i] - 1) / this.size))

  manhattan(board) {
    let distance = 0
    for (let i = 0; i < board.length; i++) {
      if (i == board.indexOf(0)) {
        continue
      }
      distance += this.rowDistance(board, i) + this.colDistance(board, i)
    }
    return distance
  }

  hamming(board) {
    let nrOutOfPlace = 0
    for (let i = 0; i < board.length; i++) {
      if (i == board.indexOf(0)) {
        continue
      }
      if (board[i] !== i + 1) {
        nrOutOfPlace++
      }
    }
    return nrOutOfPlace
  }

  // from princeton course
  compareManhattanAndHamming(a, b) {
    const manhattan1 = this.manhattan(a.board)
    const manhattan2 = this.manhattan(b.board)

    if (manhattan1 == manhattan2) {
      return this.hamming(a.board) < this.hamming(b.board)
    }
    return manhattan1 < manhattan2
  }

  compareManhattan(a, b) {
    const manhattan1 = this.manhattan(a.board)
    const manhattan2 = this.manhattan(b.board)

    if (manhattan1 == manhattan2) {
      return a.level < b.level
    }
    return manhattan1 < manhattan2
  }

  compareManhattanShortest(a, b) {
    return this.manhattan(a.board) + a.level < this.manhattan(b.board) + b.level
  }

  solve () {
    const initialNode = {
      board: this.puzzle.board,
//       path: [],
      prevNode: null,
      dir: '',
      level: 0
    }

    const solvedString = this.puzzle.getSolvedBoard().join('.')

//     this.queue.add(initialNode)
    this.queue.insert(initialNode)
//     this.visited.push(initialNode.board.toString())
    this.visited.add(initialNode.board.join('.'))

    let steps = 0
//     const t0 = performance.now()

//     while (!this.queue.isEmpty()) {
    while (this.queue.length > 0) {

//       const current = this.queue.poll()
      const current = this.queue.remove()

      if (steps % 10000 == 0) {
        console.timeEnd('iteration')
        console.log('iterations:' + steps, 'levels:' + current.level, current.board)
        console.time('iteration')
//         console.time('trim')
//         this.queue.trim()
//         console.timeEnd('trim')
      }

//       if (max < current.level) {
//         max = current.level
//         const t1 = performance.now()
//         console.log('visits', this.visitedNr)
//         console.log(max + " Took " + (t1 - t0) + " milliseconds.")
//       }

      if (current.board.join('.') == solvedString) {

//         return current

        const reverse = []

        let node = current
        while (node.prevNode !== null) {
          reverse.push(node.dir)
          node = node.prevNode
        }

        return reverse.reverse()
      }

      this.expandNode(current)
      steps++
    }
  }

  expandNode (node) {
    const directions = ['U', 'D', 'L', 'R']

    directions.forEach(direction => {

      const puzzle = new Puzzle(this.puzzle.size, [...node.board])

      if (puzzle.moveEmpty(direction)) {

        const newNode = {
          board: puzzle.board,
//           path: [...node.path, direction],
          prevNode: node,
          dir: direction,
          level: node.level + 1,
        }

        if (!this.visited.has(puzzle.board.join('.'))) {
          this.visited.add(puzzle.board.join('.'))
//           this.queue.add(newNode)
          this.queue.insert(newNode)
          this.visitedNr += 1
        }

//         if (!this.visited.includes(puzzle.board.toString())) {
//           this.visitedNr += 1
//           this.visited.push(puzzle.board.toString())
//           this.queue.add(newNode)
//         }

      }
    })
  }
}
