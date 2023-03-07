const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

/* Put this stuff in .env file */
const GOOGLE_CLIENT_ID =
  "773894358678-1ibvr30beij0c42d4m6spqrlg1cvm61f.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      /* here, profile is basically all the user information */
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
