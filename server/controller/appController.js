//* Register Route 
async function register(req, res) {
    res.status(200).json("Register");
}

//* Register Mail Route
async function registerMail(req, res) {
    res.status(200).json("RegisterMail");
} 

//* authenticate Route
async function authenticate(req, res) {
    res.status(200).json("authenticate");
}

//* Login Route
async function login(req, res) {
    res.status(200).json("Login");
}

//* getUser Route
async function getUser(req, res) {
    res.status(200).json("getUser route");
}

//* update user Route
async function updateUser(req, res) {
    res.status(200).json("updateUser route");
} 

//* Generate OTP Route
async function generateOTP(req, res) {
    res.status(200).json("generateOTP route");
} 

//* Verify OTP Route
async function verifyOTP(req, res) {
    res.status(200).json("verifyOTP route");
}

//* create reset session
async function createResetSession(req, res) {
    res.status(200).json("createResetSession route");
}

//* reset password
async function updatePassword(req, res) {
    res.status(200).json("resetPassword route");
}  

module.exports = {
    register,
    registerMail,
    authenticate,
    login,
    getUser,
    updateUser,
    generateOTP,
    verifyOTP,
    createResetSession,
    updatePassword
}