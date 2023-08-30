const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

//  create jwt token
function generateJwtToken(_id) {
    return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10d",
    });
}

// signup controller function
const signup = async (req, res) => {

    try {

        let { name, email, password } = req.body;

        // Sanitize input
        name = validator.trim(name);
        email = validator.trim(email);
        password = validator.trim(password);

        //  check if all fields are filled
        if (!name || !email || !password) {
            res.status(422).json({ error: "Please fill all the fields!" })
        }

        // Validate valid email
        if (!validator.isEmail(email)) {
            return res.status(422).json({ error: "Please enter an valid email!" });
        }

        // if user already exist with give email
        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.status(422).json({ error: "User already exist with give email!" })
        }

        // password must contain atleast 8 characters
        if (password.length < 8) {
            return res.status(422).json({ error: "password must have atleast 8 characters." });
        }

        //  hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        //  create user
        const userCreated = await User.create({ name, email, password: hashedPassword });

        // if user successfully created
        if (userCreated) {

            // create data object
            const data = {
                _id: userCreated._id,
                name: userCreated.name,
                email: userCreated.email,
            }

            // send response
            res.status(200).json({ data: data, message: "Account successfully created!" });
        }
        else {

            // user not created
            return res.status(422).json({ error: "Login failed!" });
        }

    } catch (error) {
        //  catch error
        return res.status(500).json({ error: error.message });
    }

}


// login controller function
const login = async (req, res) => {

    try {

        let { email, password } = req.body;

        // Sanitize input
        email = validator.trim(email);
        password = validator.trim(password);

        // check if all fields are present
        if (!email || !password) {
            return res.status(422).json({ error: "Please fill all the fields." });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(422).json({ error: "Please enter an valid email!" });
        }

        // find user 
        const user = await User.findOne({ email: email });

        // check for user correct email and password
        if (user && (await bcrypt.compare(password, user.password))) {

            const data = {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateJwtToken(user._id),
            }

            // login success
            res.status(200).json({ data: data, message: "Successfully login!" })
        }
        else {

            // if login failed
            res.status(422).json({ error: "Incorrect email or password!" })
        }
    } catch (error) {
        //  catch error
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { signup, login }