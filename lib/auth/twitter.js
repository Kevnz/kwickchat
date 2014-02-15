var processTwitter = function (profile) {
    console.log(profile);
    var username = profile.username;
    var displayname = profile.displayName;
    var names = displayname.split(' ');
    var first = names[0];
    var last = names[1]
    if (names.length == 2) {

    }
    var user = {
        first:first,
        last:last,
        username: username,
        displayName: displayname,
        authType: profile.provider,
        profile_image: profile._json.profile_image_url
    }
    return user;
};