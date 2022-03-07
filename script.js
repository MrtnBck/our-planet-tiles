/* Blurred BG Image */

const blurBoxes = document.querySelectorAll('.blurBox');
const bgs = document.querySelectorAll('.bg-blur');
const loadTexts = document.querySelectorAll('.loading-text');

let load = [];
let int;
let deBlurFlag = true;
let blurFlag = true;

blurBoxes.forEach((blurBox, idx) => {
  load[idx] = 0;
  blurBox.addEventListener('click', (e) => {
    if (deBlurFlag === true && blurFlag === true && load[idx] === 0) {
      deBlurFlag = false;
      int = setInterval(function (e) {
        deblurring(idx, e);
      }, 30);
    } else if (blurFlag === true && deBlurFlag === true && load[idx] === 100) {
      blurFlag = false;
      int = setInterval(function () {
        blurring(idx, e);
      }, 30);
    } else {
      console.log('Please wait until the loading finish');
    }
  });
});

function blurring(idx, e) {
  e.preventDefault();
  load[idx] -= 5;
  if (load[idx] < 1) {
    clearInterval(int);
    blurFlag = true;
  }
  loadTexts[idx].innerText = `${load[idx]}%`;
  loadTexts[idx].style.opacity = scale(load[idx], 0, 100, 1, 0);
  bgs[idx].style.filter = `blur(${scale(load[idx], 0, 100, 30, 0)}px)`;
}

function deblurring(idx) {
  load[idx] += 5;
  if (load[idx] > 99) {
    clearInterval(int);
    deBlurFlag = true;
  }
  loadTexts[idx].innerText = `${load[idx]}%`;
  loadTexts[idx].style.opacity = scale(load[idx], 0, 100, 1, 0);
  bgs[idx].style.filter = `blur(${scale(load[idx], 0, 100, 30, 0)}px)`;
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
/* Blurred Image - End */

/* Quote section */
const main = document.querySelector('.quote-container');
let quoteNumber = 0;
const animationSpeed = 7000;

const quotes = [
  'We moved from being a part of nature to being apart from nature.',
  'We often talk of saving the planet, but the truth is that we must do these things to save ourselves. With or without us, the wild will return.',
  'We humans, alone on Earth, are powerful enough to create worlds, and then destroy them.',
  'Give and take, that is the essence of what balance is all about.',
];
displayQuote();

setInterval(displayQuote, animationSpeed);

function displayQuote() {
  if (quoteNumber < quotes.length) {
    main.classList.add('fadeIn');
    const mainHTML = `
    <div id="quote">"${quotes[quoteNumber]}"</div>
    <div id="author">David Attenborough</div>
    `;
    main.innerHTML = mainHTML;
    quoteNumber++;
    setTimeout(function () {
      main.classList.remove('fadeIn');
    }, animationSpeed - 1500);
  } else {
    quoteNumber = 0;
  }
}
/* Quote section - END */
