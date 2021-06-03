import Solver from './solver.js'
import Puzzle from './puzzle.js'

describe('A* Solver', () => {

  it('should solve 3x3 in 1 step', () => {
    const puzzle = new Puzzle(3, [1, 2, 3, 4, 5, 0, 7, 8, 6])
    const solver = new Solver(puzzle)
    const node = solver.solve()
    expect(node.path.toString()).toMatch('D')
    expect(node.level).toEqual(1)
  })

  it('should solve 3x3 in 31 step', () => {
    const puzzle = new Puzzle(3, [6, 4, 7, 8, 5, 0, 3, 2, 1])
    const solver = new Solver(puzzle)
    const node = solver.solve()

    node.path.forEach((direction) => {
      puzzle.moveEmpty(direction)
    })
    expect(puzzle.board).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0])
  })

  it('should solve 4x4 in 31 step', () => {
    const puzzle = new Puzzle(4, [
      10, 7, 5, 2,
      3, 8, 1, 11,
      15, 14, 0, 4,
      6, 9, 13, 12])
    const solver = new Solver(puzzle)
    const node = solver.solve()

    node.path.forEach((direction) => {
      puzzle.moveEmpty(direction)
    })

    expect(puzzle.board).toEqual(puzzle.getSolvedBoard())
  })

//   it('should solve 5x5 in ? step', () => {
//     const puzzle = new Puzzle(5, [
//       0, 6, 13, 15, 4,
//       14, 16, 12, 19, 23,
//       1, 11, 10, 8, 17,
//       18, 22, 7, 20, 2,
//       21, 24, 9, 3, 5
//     ])
//     const solver = new Solver(puzzle)
//     const node = solver.solve()
//
//     node.path.forEach((direction) => {
//       puzzle.moveEmpty(direction)
//     })
//
//     expect(puzzle.board).toEqual(puzzle.getSolvedBoard())
//   })
})
