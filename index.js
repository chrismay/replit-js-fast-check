const Mocha = require('mocha')

const runner = new Mocha({})

runner.addFile('./test.js')

runner.run(failures => {
  if (failures) {
    console.error(failures)
  } else {
    console.log('All passed.')
  }
})