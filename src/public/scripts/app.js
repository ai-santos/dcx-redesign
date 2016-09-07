const parallaxElements = [];
const windowHeight = 0;

$(() => {
//parallax
  windowHeight = $(window).height();
  $('html, body').scrollTop(1);

$(window)
  .bind('scroll', function(e){
    let val = e.currentTarget.scrollY;
    parallax(val);
  })





//CAROUSEL
  const isBefore = function(index, visibleCells, cellsLength){
    let beforeFirstIndex = visibleCells[0]-1
    if (beforeFirstIndex < 0) beforeFirstIndex += cellsLength
    return index === beforeFirstIndex
  }

  const isAfter = function(index, visibleCells, cellsLength){
    let afterLastIndex = visibleCells[visibleCells.length-1]+1
    if (afterLastIndex > cellsLength) afterLastIndex -= cellsLength
    return index === afterLastIndex
  }

  const positionGalleryFilmstrip = function(offset, animate=true){
    const filmstrip = $('.gallery-filmstrip')
    const numberOfCells = 5;
    const cells = filmstrip.children()
    if (offset < 0) offset += cells.length
    const visibleCells = visibleIndicies(cells.length, numberOfCells, offset)
    console.log('visibleCells', visibleCells)
    if (animate){
      filmstrip.addClass('gallery-filmstrip-animated')
    }else{
      filmstrip.removeClass('gallery-filmstrip-animated')
    }
    cells.each(function(index){
      const cell = $(this)
      let position = visibleCells.indexOf(index)
      if (isBefore(index, visibleCells, cells.length)){
        cell.css({
          display: 'block',
          zIndex: '0',
          opacity: '0',
          transform: 'translateX(100px) translateY(31px) scale(.6)',
        })
      }else if (isAfter(index, visibleCells, cells.length)){
        cell.css({
          display: 'block',
          zIndex: '0',
          opacity: '0',
          transform: 'translateX(890px) translateY(31px) scale(.6)',
        })
      }else if (position === -1){
        cell.css({
          display: 'none',
          zIndex: '0',
          opacity: '1',
          transform: '',
        })
      }else{
        cell.css({
          display: 'block',
          zIndex: zIndexForPosition(position),
          opacity: opacityForPosition(position),
          transform: transformForPosition(position),
        })
      }
      if (position === 2){
        const src = cell.find('> img').attr('src')
        const image = $('<img>').attr('src', src)
        const gallery = filmstrip.closest('.gallery')
        const galleryMain = gallery.find('> .gallery-main')
        const currentImageWrapper = galleryMain.find('.gallery-main-image:first')
        const nextImageWrapper = currentImageWrapper.clone()
        const nextImage = nextImageWrapper.find('> img')
        if (nextImage.attr('src') === src) return;
        nextImage.attr('src', src)
        galleryMain.prepend(nextImageWrapper)
        currentImageWrapper.fadeOut(function(){
          currentImageWrapper.remove()
        })
      }
    })
  }

  const initializeGallery = function() {
    positionGalleryFilmstrip(0, false)

    $('.gallery-filmstrip > *').on('click', function(event) {
      event.preventDefault();
      const cell = $(this);
      const index = cell.index()
      console.log('CLICKED', index)
      positionGalleryFilmstrip(index-2)
    })
  }
  const zIndexForPosition = function(position){
    return (
      (position === 0 || position === 4) ? 1 :
      (position === 1 || position === 3) ? 2 :
      3
    )
  }
  const opacityForPosition = function(position){
    return (
      (position === 0 || position === 4) ? 0.4 :
      (position === 1 || position === 3) ? 0.7 :
      1
    )
  }
  const transformForPosition = function(position){
    return ({
      0: 'translateX(160px) translateY(31px) scale(.8)',
      1: 'translateX(300px) translateY(31px) scale(1)',
      2: 'translateX(500px) translateY(31px) scale(1.3)',
      3: 'translateX(700px) translateY(31px) scale(1)',
      4: 'translateX(860px) translateY(31px) scale(.8)',
    })[position]
  }
  const visibleIndicies = function(totalNumberOfCells, numberOfVisibleCells, offset){
    let visible = []
    for (let index = 0; index < numberOfVisibleCells; index++) {
      visible[index] = (index+offset) % totalNumberOfCells
    }
    return visible
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
