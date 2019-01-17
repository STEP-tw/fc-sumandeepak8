const invisible = function () {
  let gifDiv = document.getElementById('gif_div');
  gifDiv.style.visibility = 'hidden';

  setTimeout(() => {
    gifDiv.style.visibility = 'visible';
  }, 1000);
};

const submit = function () {
  let name = document.getElementById('name').value;
  let comment = document.getElementById('comment').value;
  var time = (new Date()).toLocaleTimeString();
  document.getElementById('input').innerText = `${time} ${name}   ${comment}`;

};