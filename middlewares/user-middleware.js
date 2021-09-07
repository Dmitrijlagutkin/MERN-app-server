const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const UserModel = require("../models/user-model")

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_SECRET,
}

passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            const { id } = jwtPayload
            const user = await UserModel.findById(id).select("_id")
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (e) {
            console.log(e)
        }
    })
)

const useUserMiddleWare = () => passport.authenticate("jwt", { session: false })

module.exports = {
    passport,
    useUserMiddleWare,
}
