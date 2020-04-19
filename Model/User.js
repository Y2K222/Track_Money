function User (){

  var name , amont , key;

//create function
  this.create = function(name,amont){
    this.name = name;
    this.amont = amont;
    window.localStorage.setItem('name',name);
    window.localStorage.setItem('amont',amont);
  }

//get user function
  this.get = function(){
    name = localStorage.getItem('name');
    amont = localStorage.getItem('amont');

    result = [name,amont];
    return result;
  }

//get amont function
  this.getAmont = function(){
    amont = localStorage.getItem('amont');
    if(amont == null){
      return 0;
    }else{
      return amont;
    }
  }

//update amont function
  this.updateAmont = function(amont){
    this.amont = amont;
    old_amont = localStorage.getItem('amont');

    if(old_amont == null){
      old_amont = 0;
    }

    amont = parseInt(amont) + parseInt(old_amont);
    localStorage.setItem('amont',amont);
  }
  
//reduce amont function
  this.reduceAmont = function(amont){
    this.amont = amont;
    old_amont = localStorage.getItem('amont');

    if(old_amont == null){
      old_amont = 0;
    }
    amont = parseInt(old_amont) - parseInt(amont);
    localStorage.setItem('amont',amont);
  }

//get today usage function
  this.getTodayUsage = function(key){
    this.key = key;
    var usage = 0 ;
    var data = localStorage.getItem(key);
    var data = JSON.parse(data);

    if(data == null){
      return 0;
    }else{

      for(var i = 0 ; i < data['data'].length ; i++){
        if(data['data'][i]['activity'] == "Income "){

        }else{
          usage += parseInt(data['data'][i]['amont']);
        }
      }
      return usage;
    }
  }

  this.getData = function(key){
    this.key = key;
    var data = localStorage.getItem(key);

    return data;
  }
}
