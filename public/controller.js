const invisible = function () {
  let gifDiv = document.getElementById('gif_div');
  gifDiv.style.visibility = 'hidden';

  setTimeout(() => {
    gifDiv.style.visibility = 'visible';
  }, 1000);
};