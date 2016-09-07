
const positionFor = function(totalNumberOfCells, numberOfVisibleCells, offset, index){
  if ((index+offset) < (numberOfVisibleCells-1)) return false
  if ((index+offset) > (numberOfVisibleCells-1)) return false
  return (index+offset) > (numberOfVisibleCells-1) ? false : index+1
}


var expect = require('expect.js');
describe('positionFor', function() {
  describe('offset 0', function() {
    it('should work', function() {
      expect(positionFor(40, 5, 0, 0)).to.equal(1);
      expect(positionFor(40, 5, 0, 1)).to.equal(2);
      expect(positionFor(40, 5, 0, 2)).to.equal(3);
      expect(positionFor(40, 5, 0, 3)).to.equal(4);
      expect(positionFor(40, 5, 0, 4)).to.equal(5);
      expect(positionFor(40, 5, 0, 6)).to.equal(false);
      expect(positionFor(40, 5, 0, 10)).to.equal(false);
      expect(positionFor(40, 5, 0, 40)).to.equal(false);
    });
  });

  describe('offset 1', function() {
    it('should work', function() {
      expect(positionFor(40, 5, 1, 0)).to.equal(false);
      expect(positionFor(40, 5, 1, 1)).to.equal(1);
      expect(positionFor(40, 5, 1, 2)).to.equal(2);
      expect(positionFor(40, 5, 1, 3)).to.equal(3);
      expect(positionFor(40, 5, 1, 4)).to.equal(4);
      expect(positionFor(40, 5, 1, 6)).to.equal(5);
      expect(positionFor(40, 5, 1, 10)).to.equal(false);
      expect(positionFor(40, 5, 1, 40)).to.equal(false);
    });
  });

});
