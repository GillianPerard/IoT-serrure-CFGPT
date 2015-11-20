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
    },

    addLogs: function (connectedObjectId, UserId, _state, _message){
        Logs.create({ connectedobject: connectedObjectId, user: UserId, state: _state, content: _message, date: new Date()}).exec(function createCB(err, created) {
            console.log(created.user + " change state of " + created.connectedobject + " to " + created.state + " : " + created.content);
        });
    }
};