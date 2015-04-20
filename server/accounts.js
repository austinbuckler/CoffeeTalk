Accounts.onCreateUser(function(options, user) {
   var points = 0;
    var screenName = "Jack Williams";
    user.points = points;
    user.screenName = screenName;

    if (options.profile) {
        user.profile = options.profile;
    }

    return user;
});