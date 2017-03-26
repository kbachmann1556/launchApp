function Request(method, path, data, callback, contentType) {

  // defaults  
  this.method = typeof method !== 'undefined' ? method : "GET";
  this.path = typeof path !== 'undefined' ? launch.base_path + path : null;
  this.contentType = typeof path !== 'undefined' ? contentType : "application/x-www-form-urlencoded; charset=UTF-8";
  this.dataType = "json";

  // add token if data present
  if (typeof data !== 'undefined') {
    // data._token = launch.token;
    this.data = JSON.parse(JSON.stringify(data));
  }
  else {
    this.data = null;
  }

  this.setDataType = function(dataType) {
    this.dataType = dataType;
  }

  this.setData = function(data) {
    this.data = data;
  }

  this.setCallback = function(callback) {
    this.callback = callback;
  }

  this.setData = function(data) {
    // data._token = launch.token;
    this.data = JSON.parse(JSON.stringify(data));
  }

  this.setMethod = function(method) {
    this.method = method;
  }

  this.setPath = function(path) {
    this.path = launch.base_path + path;
  }

  this.getResponse = function() {
    return this.reponse;
  }

  this.execute = function() {
    var data = this.data;
    $.ajax({
      type: this.method,
      contentType: this.contentType,
      url: './'+path,
      data: this.data,
      dataType: this.dataType
    }).done(function(response){
      launch.response = response;
      callback(data);
    });
  }

};