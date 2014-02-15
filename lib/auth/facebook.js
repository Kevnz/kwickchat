var processFacebook = function (profile) {
    console.log(profile);
    var displayname = profile.displayName; 
    var first = profile.name.givenName;
    var last = profile.name.familyName;
    var email;
    if(profile.emails.length > 0) {
        email =profile.emails[0].value;
    }
    var user = {
        first:first,
        last:last,
        email: email,
        displayName: displayname,
        authType: profile.provider,
        profile_image: profile._json.profile_image_url
    }
    return user;
};

module.exports = processFacebook;