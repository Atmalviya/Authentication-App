const router = require("express").Router();
const controller = require("../controller/appController");

//* POST Routes
router.route("/register").post(controller.register);

router.route("/registerMail").post(controller.registerMail);

router.route("/authenticate").post(controller.authenticate);

router.route("/login").post(controller.login);

//* GET Routes
router.route("/user/:username").get(controller.getUser);
router.route("/generateOTP").get(controller.generateOTP);
router.route("/verifyOTP").get(controller.verifyOTP);
router.route("/createResetSession").get(controller.createResetSession);

//* PUT Routes
router.route("/updatePassword").put(controller.updatePassword);
router.route("/updateUser").put(controller.updateUser);

module.exports = router;
