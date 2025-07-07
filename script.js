
let backtickHeld = false;
let wHeld = false;
let holdTimer = null;

function sendToggleRequest() {
  window.parent.postMessage({
    type: 'runFunction',
    functionName: 'toggleMode',
    args: []
  }, '*');
}

document.addEventListener('keydown', (e) => {
  if (e.key === '`') backtickHeld = true;
  if (e.key.toLowerCase() === 'w') wHeld = true;

  if (backtickHeld && wHeld && !holdTimer) {
    holdTimer = setTimeout(() => {
      sendToggleRequest();
      window.focus();
      window.focus();
      window.focus();
      window.focus();
      window.focus();
      window.focus();
      window.focus();
      window.focus();
      window.focus();
      toggleMode();
      holdTimer = null;
    }, 1000); // 1 second
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === '`') backtickHeld = false;
  if (e.key.toLowerCase() === 'w') wHeld = false;

  if (!backtickHeld || !wHeld) {
    clearTimeout(holdTimer);
    holdTimer = null;
  }
});
