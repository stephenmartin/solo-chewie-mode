(function(){
  var ACCENT = 'violet';
  var TAGLINE = 'missing';

  var TAGLINES = {
    library: ['Your Mac library,', 'on your headphones.'],
    seconds: ['Load your swim headphones', 'in seconds.'],
    missing: ['The missing audio app', 'for your headphones.']
  };

  function apply() {
    document.documentElement.setAttribute('data-accent', ACCENT);

    var tl = TAGLINES[TAGLINE] || TAGLINES.library;
    var h1 = document.getElementById('h1');
    if (h1) h1.innerHTML = tl[0] + ' <span class="em">' + tl[1] + '</span>';
  }

  apply();

  // Hero video overlay
  var wrap = document.querySelector('.hero-video-wrap');
  var overlay = document.querySelector('.hero-video-overlay');
  var video = wrap && wrap.querySelector('video');
  if (overlay && video) {
    overlay.addEventListener('click', function() {
      wrap.classList.add('playing');
      video.play();
    });
    video.addEventListener('pause', function() {
      wrap.classList.remove('playing');
    });
    video.addEventListener('ended', function() {
      wrap.classList.remove('playing');
    });
  }
})();
