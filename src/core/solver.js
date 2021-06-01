import FastPriorityQueue from 'fastpriorityqueue'
import _ from 'lodash'
import Puzzle from './puzzle_old.js'
// import HashSet from './hashset'

export default class Solver {

  constructor (puzzle) {
    this.puzzle = puzzle
//     this.visited = []
    this.visited = {}
//     this.visited = new HashSet();

    this.puzzle1 = new Puzzle(puzzle.size)
    this.puzzle2 = new Puzzle(puzzle.size)

    this.visitedNr = 0

    this.queue = new FastPriorityQueue((a, b) => {
//       return this.compareFastest(a, b)
//       return this.compareShortest(a, b)
      return this.comparePrinceton(a, b)
    })
  }

  comparePrinceton (a, b) {
    this.puzzle1.board = a.board
    this.puzzle2.board = b.board
    const distance1 = this.puzzle1.distances()
    const distance2 = this.puzzle2.distances()

    if (distance1.manhattan == distance2.manhattan) {
        return distance1.hamming < distance2.hamming
    }
    return distance1.manhattan < distance2.manhattan
  }

  compareShortest (a, b) {
    this.puzzle1.board = a.board
    this.puzzle2.board = b.board
    return this.puzzle1.manhattan() + a.level < this.puzzle2.manhattan() + b.level
  }

  compareFastest (a, b) {
    this.puzzle1.board = a.board
    this.puzzle2.board = b.board
    const manhattan1 = this.puzzle1.manhattan()
    const manhattan2 = this.puzzle2.manhattan()

    if (manhattan1 == manhattan2) {
      return a.level < b.level
    }
    return manhattan1 < manhattan2
  }

  solve () {
    const initialNode = {
      board: this.puzzle.board,
      path: [],
      level: 0
    }

    const solvedString = this.puzzle.getSolvedBoard().join('.')

    this.queue.add(initialNode)
//     this.visited.push(initialNode.board.toString())
    _.set(this.visited, initialNode.board.join('.'), true)
//     this.visited.add(initialNode.board.join('.'))

    let steps = 0
//     const t0 = performance.now()

    while (!this.queue.isEmpty()) {
      if (steps > 200000) {
        break
      }

      const current = this.queue.poll()

//       if (max < current.level) {
//         max = current.level
//         const t1 = performance.now()
//         console.log('visits', this.visitedNr)
//         console.log(max + " Took " + (t1 - t0) + " milliseconds.")
//       }

      if (current.board.join('.') == solvedString) {
        return current
      }

      this.expandNode(current)
      steps++
    }
  }

  expandNode (node) {
    const directions = ['U', 'D', 'L', 'R']

    directions.forEach(direction => {

      const puzzle = new Puzzle(this.puzzle.size, node.board)

      if (puzzle.emptyMoveTo(direction)) {

        const newNode = {
          board: puzzle.board,
          path: [...node.path, direction],
          level: node.level + 1,
        }

//         if (!this.visited.includes(puzzle.board.toString())) {
//           this.visitedNr += 1
//           this.visited.push(puzzle.board.toString())
//           this.queue.add(newNode)
//         }

        if (_.get(this.visited, puzzle.board, false) === false) {
          this.visitedNr += 1
          _.set(this.visited, puzzle.board.join('.'), true)
          this.queue.add(newNode)
        }

//         if (!this.visited.contains(puzzle.board.join('.'))) {
//           this.visitedNr += 1
//           this.visited.add(puzzle.board.join('.'))
//           this.queue.add(newNode)
//         }
      }
    })
  }
}
