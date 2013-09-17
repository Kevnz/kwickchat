var passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
    returnURL: '{{url}}}/auth/google/return',
    realm: '{{url}}}'
  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));

exports.routes = function(app){
	console.log('in the auth thing');
	app.get('/auth/google', passport.authenticate('google'));

	// Google will redirect the user to this URL after authentication.  Finish
	// the process by verifying the assertion.  If valid, the user will be
	// logged in.  Otherwise, authentication has failed.
	app.get('/auth/google/return', 
	  passport.authenticate('google', { successRedirect: '/',
	                                    failureRedirect: '/login' }));

};