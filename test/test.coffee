describe 'Array', ->

  describe '#indexOf()', ->

    it 'returns -1 when the value is not present', ->
      [1,2,3].indexOf(5).should.eql -1
      [1,2,3].indexOf(0).should.eql -1

    it 'returns the index of an value', ->
      [1,2,3].indexOf(2).should.eql 1

describe 'Number 5', ->

  it 'is exactly 5 and a number', ->

    (5).should.be.exactly(5).and.a.Number