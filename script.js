const messages = [
  "Welcome, visiter!",
  "So... Do you want to feel some oldschool hacker vibes, huh?",
  "Nice! I spent lotta time on this. I hope you like it :) Btw view credits here: /credits.html",
  "Do you want to still continue???",
  "OK babeee",
  "Still waitin' what's gonna happen?",
  "Ready for it?",
  "3",
  "2",
  "1",
  "Nothing here. Or?",
  "Last hint: Ctrl + Shift + I",
  "THIS IS THE END >>HERE<<"
]
var msgNum = 0;
var isTypingActive;

const isValid = (str) => {
  if (str == null || typeof str === "undefined") {
    // console.log(new Error('There are none messages left'));
    return false;
  }
  return true;
}

const createTip = () => {
  let span = document.createElement("span");
  span.innerHTML = '> Continue by pressing <kbd>Enter</kbd>';
  span.className = "tip";
  span.id = "tip"
  document.body.appendChild(span);
}

const createMessage = (msg) => {
  if (!isValid(msg)) return;

  if (msgNum == 1) document.body.removeChild(document.getElementById('tip'));

  let id = `msg${msgNum}`;
  let span = document.createElement("span");
  span.innerHTML = '';
  document.body.appendChild(span);
  span.id = id;
  var msgArr = msg.split("");
  var interval = setInterval(function(){
    isTypingActive = true;
    let firstLetter = msgArr.shift();
    span.innerHTML += firstLetter;
    if (msgArr.length == 0) {
      if (msgNum == 1) createTip();
      clearInterval(interval);
      span.className = "active-typing";
      isTypingActive = false;
    }
  }, 10);
}

const runConsoleGame = () => {
  var isDecoded = false;
  var interval = setInterval(function(){
    if (!isDecoded) {
      console.log("You are here! Congrats! Write into console: showMessage")
    } else {
      clearInterval(interval);
    }
  }, 5000);
  // Thanks to code https://stackoverflow.com/a/52427211/15244427, by Marcin Wasilewski, licensed under https://creativecommons.org/licenses/by-sa/4.0/ (CC BY-SA 4.0)
  Object.defineProperty(window, 'showMessage', {
    get: function() {
      isDecoded = true;
      console.log("https://youtu.be/dQw4w9WgXcQ");
      return "Click on a video above :)";
    }
  });
}

window.onload = () => {
  createMessage(messages[msgNum]);
  msgNum++;

  runConsoleGame()
}

document.body.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (isTypingActive) return;
    if (event.keyCode === 13) {
      if (!isValid(messages[msgNum])) return;
      document.getElementById(`msg${msgNum-1}`).classList.remove("active-typing");
      createMessage(messages[msgNum]);
      msgNum++;
    }
});
