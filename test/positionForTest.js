var expect = require('expect.js');

const visibleIndicies = function(totalNumberOfCells, numberOfVisibleCells, offset){
  let visible = []
  for (let index = 0; index < numberOfVisibleCells; index++) {
    visible[index] = (index+offset) % totalNumberOfCells
  }
  return visible
}

describe('visibleIndicies', function() {
  describe('offset 0', function() {
    it('should work', function() {
      expect(visibleIndicies(40, 5, 0)).to.eql([0,1,2,3,4]);
      expect(visibleIndicies(40, 5, 1)).to.eql([1,2,3,4,5]);
      expect(visibleIndicies(40, 5, 2)).to.eql([2,3,4,5,6]);
      expect(visibleIndicies(40, 5, 38)).to.eql([38,39,0,1,2]);
      expect(visibleIndicies(40, 5, 39)).to.eql([39,0,1,2,3]);
    })
  })
})




// const positionFor = function(totalNumberOfCells, numberOfVisibleCells, offset, index){
//   const x = (index + offset) % totalNumberOfCells
//   console.log(x)
//   return x > offset
//   // if ((index+offset) < (numberOfVisibleCells-1)) return false
//   // if ((index+offset) > (numberOfVisibleCells-1)) return false
//   return (index+offset) > (numberOfVisibleCells-1) ? false : index+1
// }
//
// describe('positionFor', function() {
//   describe('offset 0', function() {
//     it('should work', function() {
//       expect(positionFor(40, 5, 0, 0)).to.equal(1);
//       expect(positionFor(40, 5, 0, 1)).to.equal(2);
//       expect(positionFor(40, 5, 0, 2)).to.equal(3);
//       expect(positionFor(40, 5, 0, 3)).to.equal(4);
//       expect(positionFor(40, 5, 0, 4)).to.equal(5);
//       expect(positionFor(40, 5, 0, 6)).to.equal(false);
//       expect(positionFor(40, 5, 0, 10)).to.equal(false);
//       expect(positionFor(40, 5, 0, 40)).to.equal(false);
//     });
//   });
//
//   describe('offset 1', function() {
//     it('should work', function() {
//       expect(positionFor(40, 5, 1, 0)).to.equal(false);
//       expect(positionFor(40, 5, 1, 1)).to.equal(1);
//       expect(positionFor(40, 5, 1, 2)).to.equal(2);
//       expect(positionFor(40, 5, 1, 3)).to.equal(3);
//       expect(positionFor(40, 5, 1, 4)).to.equal(4);
//       expect(positionFor(40, 5, 1, 6)).to.equal(5);
//       expect(positionFor(40, 5, 1, 10)).to.equal(false);
//       expect(positionFor(40, 5, 1, 40)).to.equal(false);
//     });
//   });
//
// });
