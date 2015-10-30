module.exports = {
	cleanConnectedObjectLog : function (connectedObject){
		var logToDestroy = [];
		var result = true;

        connectedObject.logs.forEach(function(obj, index){
          logToDestroy.push(obj.id);
        });
        if (logToDestroy.length > 0)
	        Logs.destroy({id:logToDestroy}).exec(function (err, logToDestroy){
	          if (err) result = false;
	          console.log("destroy ----" , err)
	        });
        console.log("result")
        return result;
	}
};