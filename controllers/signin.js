handleSignin = (req, res, db, bcrypt) => {
	const { email, password } = req.body;
		if (!email || !password) {
		return res.status(400).json('incorrect form submission')
	}
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash);
		if (isValid) {
			return db.select('*').from('users')
			.where('email', '=', email)
			.then(user => {
				res.json(user[0])
			})
			.catch(err => res.status(400).json('unable to get user'))
        } else {
        	res.status(400).json('received wrong credentials')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
// Load hash from your password DB.
// bcrypt.compare("apples", "$2a$10$Y8thvrpaCQH3q/nk7SiTbOKdwddQDlA4xpe646j9phg9Z8LGnpGbe", function(err, res) {
// 	console.log("first guess", res)
//     // res == true
// });
// bcrypt.compare("veggies", "$2a$10$Y8thvrpaCQH3q/nk7SiTbOKdwddQDlA4xpe646j9phg9Z8LGnpGbe", function(err, res) {
//     // res = false
//     console.log("second guess", res)
// });
}

module.exports = {
	handleSignin: handleSignin,
}