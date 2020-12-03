const {Router} = require('express')
const router = Router()

router.get("/", async (req, res) =>{
    res.json("Welcome to the back-end");
})

module.exports = router
