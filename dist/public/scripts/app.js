'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

$(function () {

  //CAROUSEL
  ;(function () {

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
      var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var filmstrip = $('.gallery-filmstrip');
      var numberOfCells = 5;
      var cells = filmstrip.children();
      if (offset < 0) offset += cells.length;
      var visibleCells = visibleIndicies(cells.length, numberOfCells, offset);
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
      if ($('.gallery-filmstrip').length === 0) return;
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
        0: 'translateX(0px) translateY(31px) scale(.8)',
        1: 'translateX(140px) translateY(31px) scale(1)',
        2: 'translateX(340px) translateY(31px) scale(1.3)',
        3: 'translateX(540px) translateY(31px) scale(1)',
        4: 'translateX(700px) translateY(31px) scale(.8)'
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
  })();

  // humanized typing text
  ;(function () {

    var humanizedTimeout = function humanizedTimeout() {
      var max = 100,
          min = 40;
      return Math.random() * (max - min) + min;
    };

    var spans = $('.typing-text > li > span');
    spans.each(function () {
      var span = $(this);
      span.data('text', span.text());
      span.text('').css({ 'visibility': 'visible' });
    });

    var tick = function tick() {
      console.log('TICK!');
      var incompleteSpans = spans.filter(function () {
        var span = $(this);
        var currentText = span.text();
        var intendedText = span.data('text');
        return currentText !== intendedText;
      });

      if (incompleteSpans.length === 0) return;

      var span = incompleteSpans.first();
      var currentText = span.text();
      var intendedText = span.data('text');
      var nextChar = intendedText.replace(currentText, '')[0];
      span.text(currentText + nextChar);
      setTimeout(tick, humanizedTimeout());
    };

    tick();
  })();

  //shrinking header
  ;(function () {

    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 10) {
        $('header').addClass('shrink');
      } else {
        $('header').removeClass('shrink');
      }
    });
  })();

  // start animation when you scroll over stuff
  ;(function () {
    var detectSectionScrollIn = function detectSectionScrollIn(event) {
      var section = $('section.about-section');
      if (section.length === 0) return;
      var offsetTop = section.offset().top - $(window).height() / 2;
      if (window.scrollY >= offsetTop) {
        section.find('> .about-section-text').css({ opacity: 0 });
        section.find('> .about-section-background').css({ opacity: 1 });
        $(window).off('scroll', detectSectionScrollIn);
      }
    };
    $(window).on('scroll', detectSectionScrollIn);

    detectSectionScrollIn();
    //

    $('.text-fade-in').delay(700).animate({ opacity: 1 }, 3000);
    $('.text-fade-in-left-add').addClass('text-fade-in-left-add-go');
  })();

  ;(function () {
    $('.text-fade-in-and-out').fadeIn(3000, function () {
      $('.text-fade-in-and-out').fadeOut(5000);
    });
    $('.text-fade-in').delay(700).animate({ opacity: 1 }, 3000);
    $('.text-fade-in-left').addClass('text-fade-in-left-go');
  })();

  // modal
  ;(function () {

    $('.open-connect-modal').on('click', function (event) {
      event.preventDefault();
      $('.connect-modal').addClass('modal-open');
    });

    $('.close-connect-modal').on('click', function (event) {
      event.preventDefault();
      $('.connect-modal').removeClass('modal-open');
    });
  })();
});