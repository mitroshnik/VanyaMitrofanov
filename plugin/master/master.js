var RevealMaster = window.RevealMaster || (function() {

  var headerHtml = '\
        <div class="master header">\
          <div class="left"></div>\
          <div class="center"></div>\
          <div class="right"></div>\
        </div>\
        ',

      footerHtml = '\
        <div class="master footer">\
          <div class="left"></div>\
          <div class="center"></div>\
          <div class="right"></div>\
        </div>\
        ',

      stylesheet = '\
        .reveal .master.header div,\
        .reveal .master.footer div {\
            position: fixed;\
            padding: 0.5em;\
            left: 0;\
            right: 0;\
        }\
        \
        .reveal .master.header .left,\
        .reveal .master.header .center,\
        .reveal .master.header .right { top: 0; }\
        \
        .reveal .master.footer .left,\
        .reveal .master.footer .center,\
        .reveal .master.footer .right { bottom: 0; }\
        \
        .reveal .master.footer .left   { text-align: left;    }\
        .reveal .master.footer .center { text-align: center;  }\
        .reveal .master.footer .right  { text-align: right;   }\
        \
        .reveal .master.header .left   { text-align: left;    }\
        .reveal .master.header .center { text-align: center;  }\
        .reveal .master.header .right  { text-align: right;   }\
        ',

      config = Reveal.getConfig() || {},
      readyEvent = {};

  jquery = 'https://code.jquery.com/jquery-1.12.3.min.js';
  config = config.master || {};

  config.header = config.header || false;
  config.footer = config.footer || false;

  var variables = {
    slideNumber: 1,
    slideCount:  2
  };





  loadScript(jquery, function() {
    var slides = $('.reveal');
    
    $('<style>')
      .appendTo('head')
      .attr('type', 'text/css')
      .text(stylesheet);

    var show = function(element) { element.show(); },
        hide = function(element) { element.hide(); };    

    var element = function(type) {
      return $('.reveal .master.' + type);
    };

    var toggle = function(type, slide) {
      var thing = element(type);

      if (slide.attr(type) == 'false')
        hide(thing);
      else 
        show(thing);
    };

    if (config.header) {
      prepareConfig(config.header);
      slides.prepend(headerHtml);
    }

    if (config.footer) {
      prepareConfig(config.footer);
      slides.append(footerHtml);
    }

    if (typeof config.header.size !== 'undefined') 
      $('.reveal .master.header div').css('font-size', config.header.size);

    if (typeof config.footer.size !== 'undefined') 
      $('.reveal .master.footer div').css('font-size', config.footer.size);

    var slideChanged = function(event) {
      variables.slideCount  = $('.reveal section[count!="false"]').size();
      variables.slideNumber = $('.reveal section.past[count!="false"]').size() + 1;

      populate(slides.find('.header'), config.header);
      populate(slides.find('.footer'), config.footer);

      toggle('header', $(event.currentSlide));
      toggle('footer', $(event.currentSlide));
    };

    Reveal.addEventListener('slidechanged', slideChanged);

    slideChanged(readyEvent);
  });

  Reveal.addEventListener('ready', function(event) {
    readyEvent = event;
  });

  function populate(masterElement, config) {
    masterElement.find('.left  ').html(renderTemplate(config.left,   variables));
    masterElement.find('.center').html(renderTemplate(config.center, variables));
    masterElement.find('.right ').html(renderTemplate(config.right,  variables));
  }

  function prepareConfig(config) {
    config.left   = config.left   || '';
    config.center = config.center || '';
    config.right  = config.right  || '';
  }

  function renderTemplate(str, obj) {
    do {
      var beforeReplace = str;
      str = str.replace(/#{([^}]+)}/g, function(wholeMatch, key) {
        var substitution = obj[$.trim(key)];
        return (substitution === undefined ? wholeMatch : substitution);
      });

      var afterReplace = str !== beforeReplace;
    } while (afterReplace);

    return str;
  }

  function loadScript(url, callback) {
    var head = document.querySelector('head');
    var script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = url;

    var finish = function() {
      if(typeof callback === 'function') {
        callback.call();
        callback = null;
      }
    }

    script.onload = finish;
    script.onreadystatechange = function() {
      if (this.readyState === 'loaded') 
        finish();
    }

    //head.appendChild(script);
  }

})();