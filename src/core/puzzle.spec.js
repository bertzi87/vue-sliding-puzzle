const Puzzle = require('./puzzle.js')

const solved3 = [
  1,2,3,
  4,5,6,
  7,8,0
]

const sum = (array) => {
  return array.reduce((acc, item) => acc + item)
}

describe('Puzzle 3x3', () => {
  const puzzle3 = new Puzzle(3)
  const puzzle3_1 = new Puzzle("3")

  console.log(puzzle3.toString())

  test('constructor', () => {
    expect(puzzle3.board).toEqual(solved3)
    expect(puzzle3_1.board).toEqual(solved3)
  })

  test('shuffle', () => {
    const sumOld = sum(puzzle3.board)
    puzzle3.shuffle()
    const sumNew = sum(puzzle3.board)

    expect(puzzle3.board.length).toEqual(solved3.length)
    expect(sumOld).toEqual(sumNew)
    expect(puzzle3.board).not.toEqual(solved3)
  })
})

describe('Clicks for 3x3', () => {
  const puzzle3 = new Puzzle(3)

  test('left, right', () => {
    puzzle3.clickTo(7)
    expect(puzzle3.board).toEqual([
      1,2,3,
      4,5,6,
      7,0,8
    ])

    puzzle3.clickTo(6)
    expect(puzzle3.board).toEqual([
      1,2,3,
      4,5,6,
      0,7,8
    ])
    puzzle3.clickTo(7)
    expect(puzzle3.board).toEqual([
      1,2,3,
      4,5,6,
      7,0,8
    ])
    puzzle3.clickTo(8)
    expect(puzzle3.board).toEqual([
      1,2,3,
      4,5,6,
      7,8,0
    ])

  })

  test('left, right multi', () => {
    puzzle3.clickTo(6)
    expect(puzzle3.board).toEqual([
      1,2,3,
      4,5,6,
      0,7,8
    ])
    puzzle3.clickTo(8)
    expect(puzzle3.board).toEqual([
      1,2,3,
      4,5,6,
      7,8,0
    ])
  })

  test('up, down multi', () => {
    puzzle3.clickTo(2)
    expect(puzzle3.board).toEqual([
      1,2,0,
      4,5,3,
      7,8,6
    ])
    puzzle3.clickTo(8)
    expect(puzzle3.board).toEqual([
      1,2,3,
      4,5,6,
      7,8,0
    ])
  })

  test('invalid clicks', () => {
    puzzle3.clickTo(0)
    puzzle3.clickTo(1)
    puzzle3.clickTo(3)
    puzzle3.clickTo(4)
    expect(puzzle3.board).toEqual(solved3)
  })
})

describe('Moves for 3x3', () => {
  const puzzle3 = new Puzzle(3)

  test('empty left, right', () => {
    puzzle3.moveEmpty('left')
    expect(puzzle3.board).toEqual([
      1,2,3,
      4,5,6,
      7,0,8
    ])
    puzzle3.moveEmpty('left')
    expect(puzzle3.board).toEqual([
      1,2,3,
      4,5,6,
      0,7,8
    ])
    puzzle3.moveEmpty('left')
    expect(puzzle3.board).toEqual([
      1,2,3,
      4,5,6,
      0,7,8
    ])
    puzzle3.moveEmpty('right')
    expect(puzzle3.board).toEqual([
      1,2,3,
      4,5,6,
      7,0,8
    ])
    puzzle3.moveEmpty('right')
    expect(puzzle3.board).toEqual(solved3)
    puzzle3.moveEmpty('right')
    expect(puzzle3.board).toEqual(solved3)
  })

  test('empty up, down', () => {
    puzzle3.moveEmpty('up')
    expect(puzzle3.board).toEqual([
      1,2,3,
      4,5,0,
      7,8,6
    ])
    puzzle3.moveEmpty('up')
    expect(puzzle3.board).toEqual([
      1,2,0,
      4,5,3,
      7,8,6
    ])
    puzzle3.moveEmpty('up')
    expect(puzzle3.board).toEqual([
      1,2,0,
      4,5,3,
      7,8,6
    ])
    puzzle3.moveEmpty('down')
    puzzle3.moveEmpty('down')
    puzzle3.moveEmpty('down')
    puzzle3.moveEmpty('down')
    expect(puzzle3.board).toEqual(solved3)
  })

})
