const isAdmin = (req, res, next) => {
	console.log(req.session.user);
	if(req.session && req.session.role == "admin"){
		return next()
	}

	res.send("No pa")
	// return async(req, res, next) => {
    //     console.log(req.user);
	// 	if(!req.user){
	// 		return res.status(401).json({error: "No authenticated"})
	// 	}

	// 	if(req.user.role !== role){
	// 		return res.status(403).json({error: "Access Denied"})
	// 	}
	// 	next();
	// }
};

export default isAdmin