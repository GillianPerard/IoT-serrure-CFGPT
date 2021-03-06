
module.exports = function authenticated(req, res, next) {

  var token = null;
  //For session
  if (!req.isSocket) {
	 	token = req.headers.authorization || false;
	}else{
		token = req.param("userToken");
	}

	if(!token) {
		return res.json(401,{ err: "user should be authenticated - Where is ur token bro"});
	}

	JwtHandler.verify(token,function(err, decode){
		if (err) return res.json(401,{ err: "user should be authenticated - verifyFail bro"});
		Users.findOne({token:token}, function(err,user){
				if (err|| !user) {
          return res.json(401, {err : 'user should be authenticated - find fail bro'});
        }
				req.user = user;
				req.token = token;
				next();
			});
	});
};
