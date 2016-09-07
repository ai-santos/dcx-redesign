'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

$(function () {
  // $('.parallax').parallax();

  var isBefore = function isBefore(index, visibleCells, cellsLength) {
    var beforeFirstIndex = visibleCells[0] - 1;
    if (beforeFirstIndex < 0) beforeFirstIndex += cellsLength;
    return index === beforeFirstIndex;
  };

  var isAfter = function isAfter(index, visibleCells, cellsLength) {
    var afterLastIndex = visibleCells[visibleCells.length - 1] + 1;
    if (afterLastIndex > cellsLength) afterLastIndex -= cellsLength;
    return index === afterLastIndex;
  };

  var positionGalleryFilmstrip = function positionGalleryFilmstrip(offset) {
    var animate = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var filmstrip = $('.gallery-filmstrip');
    var numberOfCells = 5;
    var cells = filmstrip.children();
    if (offset < 0) offset += cells.length;
    var visibleCells = visibleIndicies(cells.length, numberOfCells, offset);
    console.log('visibleCells', visibleCells);
    if (animate) {
      filmstrip.addClass('gallery-filmstrip-animated');
    } else {
      filmstrip.removeClass('gallery-filmstrip-animated');
    }
    cells.each(function (index) {
      var cell = $(this);
      var position = visibleCells.indexOf(index);
      if (isBefore(index, visibleCells, cells.length)) {
        cell.css({
          display: 'block',
          zIndex: '0',
          opacity: '0',
          transform: 'translateX(100px) translateY(31px) scale(.6)'
        });
      } else if (isAfter(index, visibleCells, cells.length)) {
        cell.css({
          display: 'block',
          zIndex: '0',
          opacity: '0',
          transform: 'translateX(890px) translateY(31px) scale(.6)'
        });
      } else if (position === -1) {
        cell.css({
          display: 'none',
          zIndex: '0',
          opacity: '1',
          transform: ''
        });
      } else {
        cell.css({
          display: 'block',
          zIndex: zIndexForPosition(position),
          opacity: opacityForPosition(position),
          transform: transformForPosition(position)
        });
      }
      if (position === 2) {
        var _ret = function () {
          var src = cell.find('> img').attr('src');
          var image = $('<img>').attr('src', src);
          var gallery = filmstrip.closest('.gallery');
          var galleryMain = gallery.find('> .gallery-main');
          var currentImageWrapper = galleryMain.find('.gallery-main-image:first');
          var nextImageWrapper = currentImageWrapper.clone();
          var nextImage = nextImageWrapper.find('> img');
          if (nextImage.attr('src') === src) return {
              v: void 0
            };
          nextImage.attr('src', src);
          galleryMain.prepend(nextImageWrapper);
          currentImageWrapper.fadeOut(function () {
            currentImageWrapper.remove();
          });
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    });
  };

  var initializeGallery = function initializeGallery() {
    positionGalleryFilmstrip(0, false);

    $('.gallery-filmstrip > *').on('click', function (event) {
      event.preventDefault();
      var cell = $(this);
      var index = cell.index();
      console.log('CLICKED', index);
      positionGalleryFilmstrip(index - 2);
    });
  };
  var zIndexForPosition = function zIndexForPosition(position) {
    return position === 0 || position === 4 ? 1 : position === 1 || position === 3 ? 2 : 3;
  };
  var opacityForPosition = function opacityForPosition(position) {
    return position === 0 || position === 4 ? 0.4 : position === 1 || position === 3 ? 0.7 : 1;
  };
  var transformForPosition = function transformForPosition(position) {
    return {
      0: 'translateX(160px) translateY(31px) scale(.8)',
      1: 'translateX(300px) translateY(31px) scale(1)',
      2: 'translateX(500px) translateY(31px) scale(1.3)',
      3: 'translateX(700px) translateY(31px) scale(1)',
      4: 'translateX(860px) translateY(31px) scale(.8)'
    }[position];
  };
  var visibleIndicies = function visibleIndicies(totalNumberOfCells, numberOfVisibleCells, offset) {
    var visible = [];
    for (var index = 0; index < numberOfVisibleCells; index++) {
      visible[index] = (index + offset) % totalNumberOfCells;
    }
    return visible;
  };

  initializeGallery();

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