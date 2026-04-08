var data = [
  { word: 'Ukraine',     count: 512 },
  { word: 'War',         count: 505 },
  { word: 'Nation',      count: 304 },
  { word: 'Must',        count: 264 },
  { word: 'Brussels',    count: 180 },
  { word: 'Peace',       count: 119 },
  { word: 'Migration',   count: 76  },
  { word: 'Protection',  count: 64  },
  { word: 'Danger',      count: 60  },
  { word: 'Left Wing',   count: 47  },
  { word: 'Sovereignty', count: 18  }
];

var container = document.getElementById('columns');
var isMobile  = window.innerWidth <= 800;

for (var i = 0; i < data.length; i++) {
  var col = document.createElement('div');
  col.className = 'col';

  var label = document.createElement('span');
  label.className = 'col-count';
  label.textContent = data[i].count + '×';
  col.appendChild(label);

  for (var j = 0; j < data[i].count; j++) {
    var span = document.createElement('span');
    span.className = 'word-item';
    span.textContent = data[i].word;
    col.appendChild(span);
  }
  container.appendChild(col);
}


var counter    = document.getElementById('counter');
var counterNum = document.getElementById('counter-num');
var landing    = document.getElementById('landing');
var total      = 0;
for (var i = 0; i < data.length; i++) total += data[i].count;

function updateCounter() {
  var rect     = landing.getBoundingClientRect();
  var top      = rect.top + window.scrollY;
  var scrolled = window.scrollY - top;
  var progress = Math.max(0, Math.min(1, scrolled / landing.offsetHeight));

  if (window.scrollY > top && window.scrollY < top + landing.offsetHeight && progress < 0.85) {
    counter.classList.add('visible');
    counterNum.textContent = Math.round(progress * total).toLocaleString();
  } else {
    counter.classList.remove('visible');
  }
}

window.addEventListener('scroll', updateCounter, { passive: true });
updateCounter();


var marginNote = document.getElementById('margin-note');
var noteNum    = marginNote.querySelector('.note-num');
var noteText   = marginNote.querySelector('p');
var sups       = document.querySelectorAll('sup[data-note]');
var activeSup  = null;

for (var i = 0; i < sups.length; i++) {
  sups[i].addEventListener('mouseenter', function() {
    if (!isMobile) showNote(this);
  });
  sups[i].addEventListener('mouseleave', function() {
    if (!isMobile) marginNote.classList.remove('visible');
  });
  sups[i].addEventListener('click', function(e) {
    e.preventDefault();
    if (activeSup === this) {
      activeSup = null;
      marginNote.classList.remove('visible');
      return;
    }
    activeSup = this;
    showNote(this);
  });
}

function showNote(el) {
  noteNum.textContent = el.textContent + '.';
  noteText.textContent = el.getAttribute('data-note');
  if (!isMobile) {
    var r = el.getBoundingClientRect();
    var m = document.querySelector('main').getBoundingClientRect();
    marginNote.style.left = (m.right + 24) + 'px';
    marginNote.style.top  = r.top + 'px';
  }
  marginNote.classList.add('visible');
}

document.addEventListener('click', function(e) {
  if (!e.target.closest('sup[data-note]') && !e.target.closest('#margin-note')) {
    activeSup = null;
    marginNote.classList.remove('visible');
  }
});


var sections = document.querySelectorAll('section[id], div[id]');
for (var i = 0; i < sections.length; i++) {
  new IntersectionObserver(function(entries) {
    for (var j = 0; j < entries.length; j++) {
      if (entries[j].isIntersecting) {
        var links = document.querySelectorAll('nav a[data-s]');
        for (var k = 0; k < links.length; k++) {
          if (links[k].getAttribute('data-s') === entries[j].target.id)
            links[k].classList.add('active');
          else
            links[k].classList.remove('active');
        }
      }
    }
  }, { rootMargin: '-25% 0px -65% 0px' }).observe(sections[i]);
}


var fadeObserver = new IntersectionObserver(function(entries) {
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].isIntersecting) {
      entries[i].target.classList.add('visible');
      fadeObserver.unobserve(entries[i].target);
    }
  }
}, { rootMargin: '0px 0px -50px 0px' });

var fadeEls = document.querySelectorAll('.fade-in');
for (var i = 0; i < fadeEls.length; i++) fadeObserver.observe(fadeEls[i]);
document.querySelector('header').classList.add('visible');
