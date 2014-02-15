var processAuth = function (token, tokenSecret, profile, done) {
    try {
        console.log('try to processAuth');
        console.log(profile);
        var user;
        if (profile.provider === 'facebook') {
            user = require('./facebook')(profile);
        } else if (profile.provider === 'twitter') {
            user = require('./twitter')(profile);
        } else {
            user = profile;
        }

        console.log(user);
        userDB.findOrCreate(user, function(err, savedUser) {
            console.log('findOrCreate returned');
            console.log(savedUser);
            done(null, savedUser);
            
        });
    } catch(e) {
        console.log(e);
        //done(e, profile);
    }
};