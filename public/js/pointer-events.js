function stop(e){
	return e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}