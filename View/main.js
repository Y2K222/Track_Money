//Objects;
var activity = [
  {"name":"Food","icon":"fa fa-utensils"},
  {"name":"Transport","icon":"fa fa-bus"},
  {"name":"Bills","icon":"fa fa-file-contract"},
  {"name":"Home","icon":"fa fa-home"},
  {"name":"Clothing","icon":"fa fa-tshirt"},
  {"name":"Socail","icon":"fa fa-people-arrows"},
  {"name":"Health","icon":"fa fa-file-medical"},
  {"name":"Others","icon":"fa fa-star-of-life"},
]

//Initialize
index();

//adding activity
for(var i = 0 ; i < activity.length ; i++){
  if( i <= 3){
    document.getElementById('row_one').innerHTML += "<td><i class='"+activity[i]["icon"]+" activity_icon' onclick='activity_onclick(\""+ activity[i]['name']+"\")'></i><br><span class='activity_icon_text'>"+activity[i]["name"]+"</span><td>";
  }else{
    document.getElementById('row_two').innerHTML += "<td><i class='"+activity[i]["icon"]+" activity_icon' onclick='activity_onclick(\""+ activity[i]['name']+"\")'></i><br><span class='activity_icon_text'>"+activity[i]["name"]+"</span><td>";
  }
}
for(var i = 1; i <=12 ; i++){
  if(i <= 6){
    if(i==6){
      document.getElementById('number_row_one').innerHTML += '<td><button class="my-btn shadow-sm" onclick="backSpace()"><i class="fa fa-backspace"></i></button>';
    }else{
      document.getElementById('number_row_one').innerHTML += '<td><button class="my-btn shadow-sm" onclick="number_onclick(\''+i+'\')">'+i+'</button>';
    }
  }else{
    if(i==12){
      document.getElementById('number_row_two').innerHTML += '<td><button class="my-btn shadow-sm background" onclick="addToDatabase()" id="addtodatabase"><i class="fa fa-arrow-right"></i></button>';
    }else{
      var j = i-1;
      if(j==10){
        j = 0;
      }
      document.getElementById('number_row_two').innerHTML += '<td><button class="my-btn shadow-sm" onclick="number_onclick(\''+j+'\')">'+j+'</button>';
    }
  }
}

//date number to string
function dateToString(num){
  switch (num) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Thu";
    case 3:
      return "Wed";
    case 4:
      return "Tue";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
      break;
    default:
  }
}

//Initialize function
function index(){
  var date = new Date();
  var key = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

  var user = new User();
  user.getTodayUsage(key);

  document.getElementById('date').innerText = date.getDate();
  document.getElementById('day').innerText = dateToString(date.getDay());
  document.getElementById('month').innerText = date.getMonth()+1;
  document.getElementById('year').innerText = date.getFullYear();
  document.getElementById('current_amont').innerText = user.getAmont();
  document.getElementById('amont').innerText = user.getTodayUsage(key);

  //Activity list
  // console.log(user.getData(key))

  var data = user.getData(key);
  console.log(data);
  data = JSON.parse(data);
  var activity = data['data'][0];
  console.log(activity);

  if(activity == null || activity == undefined){
    document.getElementById('info').style.display = 'block';
    document.getElementById('target').style.display = 'none';

    console.log("no data");
  }else{
    document.getElementById('info').style.display = 'none';
    document.getElementById('target').style.display = 'flex';
    //clear the list
    document.getElementById('target').innerHTML = '';

    console.log("cleared the list");

    for(var i = 0 ; i < data['data'].length ; i++){
      var sign;
      if(data['data'][i]['activity'] == "Income "){
        sign = "+";
      }else{
        sign = "-";
      }

      if(i == 0){
        console.log('added');
        document.getElementById('target').innerHTML += '<div class="row"><div class="col-6 text-left"><span class="info info_activity">'+data['data'][i]['activity']+'</span><br><span class="info info_amont">'+ sign + data['data'][i]['amont']+'</span></div><div class="col-6 text-right"><span class="info info_time">'+data['data'][i]['time']+'</span><br><span class="delete_btn" onclick="indexDelete(\''+ i+'\')">x</span></div></div>';
      }else{
        document.getElementById('target').innerHTML += '<hr><div class="row"><div class="col-6 text-left"><span class="info info_activity">'+data['data'][i]['activity']+'</span><br><span class="info info_amont">'+ sign+ data['data'][i]['amont']+'</span></div><div class="col-6 text-right"><span class="info info_time">'+data['data'][i]['time']+'</span><br><span class="delete_btn" onclick="indexDelete(\''+ i+'\')">x</span></div></div>';
      }
    }
  }

  //add date list


}


//Controllers
document.getElementById('add_button').onclick = function(){openAddView()};
document.getElementById('overlay').onclick = function(){closeAddView()};
document.getElementById('return').onclick = function(){closeAddView()};
document.getElementById('income_btn').onclick = function(){incomeAction()};

function openAddView(){

  document.getElementById('add_button').style.visibility = "hidden";
  document.getElementById('add_button').style.opacity = "0";
  document.getElementById('addview_container').style.visibility = "visible";
  document.getElementById('addview_container').style.height = "450px";
  document.getElementById('overlay').style.visibility = "visible";
  document.getElementById('overlay').style.opacity = "1";

}

function closeAddView(){

  document.getElementById('add_button').style.visibility = "visible";
  document.getElementById('add_button').style.opacity = "1";
  document.getElementById('addview_container').style.visibility = "hidden";
  document.getElementById('addview_container').style.height = "0px";
  document.getElementById('overlay').style.opacity = "0";
  document.getElementById('overlay').style.visibility = "hidden";

}

function openNav(){

  document.getElementById('mySidenav').style.visibility = "visible";
  document.getElementById('mySidenav').style.maxHeight = "90%";

}

function addToDatabase(){
  //test
  var acti = document.getElementById('activity').innerText;
  var amont = document.getElementById('amont_text').innerText;
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var data = '{"activity":"'+acti+'","amont":"'+amont+'","time":"'+time+'"}';

  if(acti.length > 1 && amont.length > 0){
      var activity = new Activity();
      var user = new User();

      activity.add(date,data);
      if(acti == "Income "){
        user.updateAmont(amont);
      }else{
        user.reduceAmont(amont);
      }
  }else{
    document.getElementById('activity').innerText  = "Please add activity !";
  }
  //callback
  index();
  closeAddView();
  document.getElementById('activity').innerText = '';
  document.getElementById('amont_text').innerText = '';
}

function indexDelete(index){
  var date = new Date();
  var key = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
  var acti = new Activity();
  acti.deleteActi(index,key);

  // callback
  this.index();
}

function incomeAction(){
  document.getElementById('activity').innerText = "Income  ";
}

function backSpace(){
  var value = document.getElementById("amont_text").innerText;
  document.getElementById("amont_text").innerText = value.substr(0, value.length - 1);
}


//activity
function activity_onclick(name){
  document.getElementById('activity').innerText = name + "  ";
}
function number_onclick(number){
  document.getElementById('amont_text').innerText += number;
}
