$(() => {
  // $('.parallax').parallax();
  console.log('sdsasaddsa')

  const positionGalleryFilmstrip = function(offset){
    const filmstrip = $('.gallery-filmstrip')
    const width = filmstrip.width()
    const numberOfCells = 5;
    const cells = filmstrip.children()

    cells.each(function(i){
      const cell = $(this)
      let position = i+offset+1;
      console.log('cell', i, position)
      if (position > 5) position = null

      if (position === null){
        cell.css({
          display: 'none',
        })
      }else{
        cell.css({
          zIndex: zIndexForPosition(position),
          opacity: opacityForPosition(position),
          transform: transformForPosition(position),
        })
      }
    })
  }

  const initializeGallery = function() {

    positionGalleryFilmstrip(1)

    $('.gallery-filmstrip > *').on('click', function(event) {
      event.preventDefault();
      var cell = $(this);
      console.log('CLICKED', cell.index())
    })
  }
  const zIndexForPosition = function(position){
    return (
      (position === 1 || position === 5) ? 1 :
      (position === 2 || position === 4) ? 2 :
      3
    )
  }
  const opacityForPosition = function(position){
    return (
      (position === 1 || position === 5) ? 0.4 :
      (position === 2 || position === 4) ? 0.7 :
      1
    )
  }
  const transformForPosition = function(position){
    return ({
      1: 'translateX(160px) translateY(31px) scale(.8)',
      2: 'translateX(300px) translateY(31px) scale(1)',
      3: 'translateX(500px) translateY(31px) scale(1.3)',
      4: 'translateX(700px) translateY(31px) scale(1)',
      5: 'translateX(860px) translateY(31px) scale(.8)',
    })[position]
  }

  initializeGallery()


  // $('.gallery-filmstrip > *:nth-child(1)').addClass('img-1')
  // $('.gallery-filmstrip > *:nth-child(2)').addClass('img-2')
  // $('.gallery-filmstrip > *:nth-child(3)').addClass('img-3')
  // $('.gallery-filmstrip > *:nth-child(4)').addClass('img-4')
  // $('.gallery-filmstrip > *:nth-child(5)').addClass('img-5')
  //
  // $('.gallery-filmstrip > *').on('click', function(event) {
  //   event.preventDefault();
  //   var cell = $(this);
  //   var filmstrip = cell.parent();
  //   if (cell.is('.img-1')) {
  //     cell
  //       .removeClass('img-1').addClass('img-2')
  //       .next().removeClass('img-2').addClass('img-3')
  //       .next().removeClass('img-3').addClass('img-4')
  //       .next().removeClass('img-4').addClass('img-5')
  //       .next().removeClass('img-5').addClass('img-right-hidden')
  //   }
  //   if (cell.is('.img-2')) {
  //     cell.prev()
  //       .removeClass('img-1').addClass('img-2')
  //       .next().removeClass('img-2').addClass('img-3')
  //       .next().removeClass('img-3').addClass('img-4')
  //       .next().removeClass('img-4').addClass('img-5')
  //       .next().removeClass('img-5').addClass('img-right-hidden')
  //   }
  //   // if (cell.is('.img-3')) {}
  //   if (cell.is('.img-4')) {
  //     cell.prev().prev().prev()
  //       .removeClass('img-1').addClass('img-left-hidden')
  //       .next().removeClass('img-2').addClass('img-1')
  //       .next().removeClass('img-3').addClass('img-2')
  //       .next().removeClass('img-4').addClass('img-3')
  //       .next().removeClass('img-5').addClass('img-4')
  //       .next()
  //         .removeClass('img-right-hidden')
  //         .removeClass('img-left-hidden')
  //         .addClass('img-5')
  //   }
  //   if (cell.is('.img-5')) {
  //     cell.prev().prev().prev().prev()
  //       .removeClass('img-1').addClass('img-2')
  //       .next().removeClass('img-2').addClass('img-3')
  //       .next().removeClass('img-3').addClass('img-4')
  //       .next().removeClass('img-4').addClass('img-5')
  //       .next().removeClass('img-5').addClass('img-right-hidden')
  //   }
  // })

//
// });
  // })


});
