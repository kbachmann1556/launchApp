function checkAuth(data){
	var request = new Request("POST", "data", data, renderAuthCheck);
  request.execute();
}