const express = require("express")
const User = require("../../controller/user/user-controller")
const auth = require("../../helper/authentication").verify
const { superadmin } = require("../../middleware/access-controll")
const find_id = require("../../middleware/find-ID")
const Login = require("../../controller/user/login")


const router = express.Router();


router.get("/", User.GetAllUser)
router.get("/:id", User.GetUserByID)
router.get("/profile", auth, User.GetMyData)
router.post("/register", User.Register)
router.post("/login", Login)
router.patch("/update-password", auth, User.UpdatePassword)
router.delete("/delete/:id", find_id.FindIDUser, User.DeleteUser)
router.put("/user-edit", auth, User.UserUpdate)

module.exports = router;