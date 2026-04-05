const authService = require('./auth.service');

const createUser = async (req, res) => {
    try {
        const user = await authService.createUser(req.body);

        res.status(201).json({
            success: true,
            data: user,
        })
    }
    catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message,
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await authService.loginUser(username, password);
        res.status(200).json({ 
            success: true,
            data: result,
        })
    }
    catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message,
        })
    }
}

module.exports = {
    createUser,
    loginUser,
}