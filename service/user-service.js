const UserModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const mailService = require("./mail-service")
const tokenService = require("./token-service")
const UserDto = require("../dto/user-dto")

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email })
        if (candidate) {
            throw new Error(`User with email: ${email} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserModel.create({
            email,
            password: hashPassword,
            activationLink,
        })
        await mailService.sendActivetionMail(
            email,
            `${process.env.API_URL}/api/activate/${activationLink}`
        )

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink })

        if (!user) {
            throw new Error("Uncorrect activation link")
        }
        user.isActivated = true
        await user.save()
    }
}

module.exports = new UserService()