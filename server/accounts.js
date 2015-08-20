Accounts.onCreateUser(function(options, user) {
  user.points = 0;
  options.profile.screenName = user.emails[0].address.substr(0, user.emails[0].address.indexOf('@'));
  if (options.profile) {
    user.profile = options.profile;
  }
  return user;
    // var points = 0;
    // var screenName = "Jack Williams";
    // user.points = points;
    // user.screenName = screenName;
    //
    // if (options.profile) {
    //     user.profile = options.profile;
    // }
    //
    // return user;
});
