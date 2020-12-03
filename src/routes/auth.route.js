const db = require("../models");
const {Router} = require('express')
const router = Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const User = db.users
const {check, validationResult} = require('express-validator')

router.post(
    "/register",
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длинна пароля 8 символов')
            .isLength({min: 8}),
        check( 'username', 'Минимальная длина имени пользователя 6')
            .isLength({min: 6})
    ],
    async (req,res) => {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Данные введены некорректно", errors: errors.array()})

            }

            const {email, password, username} = req.body

            const candidate = User.findOne({email,username})

            if(candidate){
                return res.status(400).json({message: 'Пользователь с такими данными уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = {
                username: username,
                password: hashedPassword,
                email: email,
                admin: false
            }

            await User.create(user)
                .then(data => {
                    res.send(data).status(200).json({message:"Пользователь успешно создан"})
                })
                .catch(err => {
                    res.status(500).json({errors: err})
                })

        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, попробуйте снова"})
        }
})

router.post(
    "/login",
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Данные введены некорректно", errors: errors.array()})

            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if(!user){
                return res.status(400).json({message: 'Пользователя с таким eMail не существует'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '2h' }
            )

            res.json({token , userId: user.id })


        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, попробуйте снова"})
        }
    }
    )

module.exports = router
