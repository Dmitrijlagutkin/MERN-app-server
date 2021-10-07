const UserModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const mailService = require("./mail-service")
const tokenService = require("./token-service")
const UserDto = require("../dto/user-dto")
const ApiError = require("../exceptions/api-error")
class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email })
        if (candidate) {
            throw ApiError.BadRequest(
                `User with email: ${email} already exists`
            )
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
            throw ApiError.BadRequest("Uncorrect activation link")
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            console.log("email", email)
            throw ApiError.BadRequest(`User with email ${email} not found`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest("Wrong password please try again")
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }

    async getUserData(id) {
        const userData = await UserModel.findById(id).populate({
            path: "lists",
            model: "List",
            // populate: {
            //     path: "listItem",
            //     model: "ListItem",
            // },
        })
        return userData
    }
}

module.exports = new UserService()
