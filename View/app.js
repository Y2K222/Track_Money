document.getElementById('info_submit').onclick = function(){submitInfo()};
//Controllers

function submitInfo() {

  var name = document.getElementById('name').value;
  var amont = document.getElementById('amont').value;

  var user = new User();
  user.create(name,amont);

}
