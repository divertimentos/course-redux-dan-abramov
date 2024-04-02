
const counter = require('./counter')

test('Increment 0 to 1', () => {
  expect(counter(0, { type: 'INCREMENT' })).toEqual(1)
})

test('Increment 1 to 2', () => {
  expect(counter(1, { type: 'INCREMENT' })).toEqual(2)
})

test('Decrement 2 to 1', () => {
  expect(counter(2, { type: "DECREMENT" })).toEqual(1)
})

test('Decrement 1 to 0', () => {
  expect(counter(1, { type: 'DECREMENT' })).toEqual(0)
})

test('Anything else', () => {
  expect(counter(1, { type: 'Anything else' })).toEqual(1)
})

test('Initial state', () => {
  expect(counter(undefined, {})).toEqual(0)
})
