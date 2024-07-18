const router = require("express").Router();
const controller = require("../controller/appController");
const {authMiddleware, localVar} = require("../middleware/authMiddleware");
const {registerMail} = require("../controller/mailer");

//* POST Routes
router.route("/register").post(controller.register);
router.route("/registerMail").post(registerMail);
router.route("/authenticate").post(controller.authenticate);
router.route("/login").post(controller.login);

//* GET Routes
router.route("/user/:username").get(controller.getUser);
router.route("/generateOTP").get(controller.verifyUser, localVar, controller.generateOTP);
router.route("/verifyOTP").get(controller.verifyUser,controller.verifyOTP);
router.route("/createResetSession").get(controller.createResetSession);

//* PUT Routes
router.route("/updateUser").put(authMiddleware, controller.updateUser);
router.route("/updatePassword").put(controller.verifyUser, controller.updatePassword);

module.exports = router;
