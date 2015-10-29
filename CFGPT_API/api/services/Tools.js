module.exports = {
	contains: function (array, item) {
		var isContains = false;
		var i = 0;
		while(i < array.length && isContains == false){
			if (array[i] == item) {isContains = true;};
			i++;
		}
		return isContains;
	}	
};