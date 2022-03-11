const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
chai.should()

const g = { chai }
require('./init')(g)

describe('app', () => {
  before(() => {
    const InitModule = require('../index')
    return g.InitApp(InitModule)
  })
  after(g.close)

  describe('API', () => {
    const submodules = [
      './suites/uploads_t'
    ]
    submodules.map((i) => {
      const subMod = require(i)
      subMod(g)
    })
  })
})
