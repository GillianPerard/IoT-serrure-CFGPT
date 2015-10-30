module.exports = {
	
	changeStateByToken_afterUpdate: function(req, res, err, updated){
		if (err) {
			return res.send(400, 'Error when trying updated ' + err);
		};
		return res.send(200, 'Success Updated Element ' + updated);
	},

};