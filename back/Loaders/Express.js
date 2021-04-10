const Routes = require('../API/index').default;
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

exports.default = async ({ app }) => {

  var corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'POST,GET,DELETE,PUT',
    credentials: true
  }

	app.use(bodyParser.json());

	app.use(cors(corsOptions));

	app.use('/api/v1/', Routes());


	// Errors Middlewares Handlers
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err['status'] = 404;
		next(err);
	});

	app.use((err, req, res, next) => {

		//Handle 401 thrown by express-jwt library
		if (err.name === 'UnauthorizedError') {
      console.log("error received from jwt")
		  return res
			.status(err.status)
			.send({ message: err.message })
			.end();
    }
    
    //Handle invalid token error from jwt
    if (err.name === 'JsonWebTokenError') {
      console.log("error received from jwt")
      return res
      .status(401)
      .send({ message: err.message })
      .end();
    }

    //Handle expired token from jwt
    if (err.name === 'TokenExpiredError') {
      console.log("token has expired");
      return res
      .status(401)
      .send({ message: err.message, expiredAt: err.expiredAt })
      .end();
    }

    if (err.status === 401) {
      console.log("Unauthorized");
      return res
      .status(err.status)
      .send({ message: err.message || "Unauthorized" })
      .end();
    }

		return next(err);
    });
    


	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json({
			errors: {
				message: err.message,
			},
		});
	});

};