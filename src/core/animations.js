
const col = (index, size) => index % size
const row = (index, size) => Math.floor(index / size)

const delay = (index, size, reverse = false, time1 = 0.05, time2 = 0.05) => {

  const random1 = Math.floor(Math.random() * size)
  const random2 = Math.floor(Math.random() * size)

  time1 *= random1 == col(index, size) % size ? 3 : 1
  time2 *= random2 == row(index, size) % size ? 3 : 1

  if (reverse) {
    return  time1 * (size - col(index, size))
          + time2 * (size - row(index, size))
  }
  return time1 * col(index, size) + time2 * row(index, size)
}

export const getGSAPVars = (reverse, nr, index, size, done) => {

  let vars = {
    opacity: 1,
    rotationX: (reverse) ? -360 : 360,
    duration: 1,
    delay: delay(index, size, reverse),
    ease: 'bounce',
    onComplete: done
  }

  if (reverse || nr == 0) {
    vars.opacity = 0
  }

  return vars
}
