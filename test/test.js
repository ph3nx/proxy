var a = require('assert')

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      a.equal(-1, [1,2,3].indexOf(5))
      a.equal(-1, [1,2,3].indexOf(0))
    })
  })
})