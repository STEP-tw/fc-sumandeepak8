const invisible = function () {
  let gifDiv = document.getElementById('gif_div');
  gifDiv.style.visibility = 'hidden';

  setTimeout(() => {
    gifDiv.style.visibility = 'visible';
  }, 1000);
};

const updateOnlyTable = function () {
  fetch('/updateComments')
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      document.getElementsByTagName('table')[0].innerHTML = response;
    });
};