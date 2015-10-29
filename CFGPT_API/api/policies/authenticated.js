
module.exports = function authenticated(req, res, next) {
	var token = req.headers.authorization || false;
	if(!token) {
		return res.json(401,{ err: "user should be authenticated"});
	}
	User.findOne({token:token}, function(err,user){
		if (err|| !user) return res.json(401, {err : 'user should be authenticated'});
		req.user = user;
		req.token = token;
		next();
	})
};