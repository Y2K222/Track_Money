function Activity(){

  var data;
  var key;

//add activity function
  this.add = function(key,data){

    this.data = data;
    this.key = key;
    var date = new Date();

    var current_data = [];

    var existing = localStorage.getItem(key);

    if(existing){

      current_data = localStorage.getItem(key);
      current_data = JSON.parse(current_data);
      data = JSON.parse(data);
      current_data['data'].push(data);
      current_data = JSON.stringify(current_data);

      localStorage.setItem(key, current_data);

    }else{
      current_data.push(data);
      localStorage.setItem(key, '{"data": ['+data+'],"date": "'+date+'"}');
    }

  }

//get activity function
  this.get = function(key){

    this.key = key;

    var text = localStorage.getItem(key);
    var data = text.split(',');
    // var json_data = JSON.parse(text);

    console.log(data);
  }

//delete activity function
  this.deleteActi = function(index,key){

    this.key = key;
    var current_data = [];
    current_data = localStorage.getItem(key);
    current_data = JSON.parse(current_data);

    console.log(current_data['data'][index]['activity']);
    var user = new User();
    if(current_data['data'][index]['activity'] == "Income "){
      user.reduceAmont(current_data['data'][index]['amont']);
    }else{
      console.log('should update');
      user.updateAmont(current_data['data'][index]['amont']);
    }

    if (index > -1) {
      current_data['data'].splice(index, 1);
    }
    current_data = JSON.stringify(current_data);

    localStorage.setItem(key, current_data);
  }

//array remove function
function arrayRemove(arr, value) { return arr.filter(function(ele){ return ele != value; });}

}
