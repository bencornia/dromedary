const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { config } = require("../config/config");
const { User } = require("../models/users.model");
const { handleServerError } = require("../middleware/serverError");
const { deleteImage } = require("../helpers/deleteImage.helper");

async function getUsers(req, res) {
    try {
        const users = await User.find({});

        if (!users) {
            return res.status(404).json({ error: "No users exist" });
        }

        return res.status(200).json(users);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function getUser(req, res) {
    // Get id
    let id = req.params.id;

    // Try making request
    try {
        const user = await User.findById(id);

        if (!user) {
            // User not found
            return res
                .status(404)
                .json({ message: `Resource with ID: [ ${id} ] not found.` });
        }

        // User found
        return res.status(200).json(user);
    } catch (error) {
        // Server error
        return handleServerError(res, error);
    }
}

async function postUser(req, res) {
    try {
        const imagePath = `${req.protocol}://${req.get("host")}/images/${
            req.body.imagePath
        }`;

        const document = {
            businessName: req.body.businessName,
            ownerName: req.body.ownerName,
            email: req.body.email,
            password: req.body.password,
            apiKey: req.body.apiKey,
            profileImagePath: imagePath,
            authToken: "",
            createdDate: new Date().toISOString(),
            lastUpdatedDate: new Date().toISOString(),
        };

        // Check for existing user
        const existing = await User.exists({ email: req.body.email });

        if (existing) {
            deleteImage(req.body.imagePath);
            return res.status(400).json({ error: "Email already exists!" });
        }

        const user = await User.create(document);

        const authResponse = {
            profileImagePath: user.profileImagePath,
            ownerName: user.ownerName,
            businessName: user.businessName,
            email: user.email,
            apiKey: user.apiKey,
        };

        return res.status(201).json(authResponse);
    } catch (error) {
        // Delete image
        deleteImage(req.body.imagePath);

        // Document Creation failed
        return handleServerError(res, error);
    }
}

async function putUser(req, res) {
    // Check for valid object id
    let id = req.params.id;

    // Try making request
    try {
        const user = await User.findById(id);

        if (!user) {
            // User not found
            return res
                .status(404)
                .json({ message: `Resource with ID: [ ${id} ] not found.` });
        }

        // Make update
        user.businessName = req.body.businessName;
        user.ownerName = req.body.ownerName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.apiKey = req.body.apiKey;
        user.profileImagePath = req.body.imagePath || "";
        user.authToken = "";
        user.lastUpdatedDate = new Date().toISOString();
        await user.save(req.body);

        // User found
        return res.sendStatus(204);
    } catch (error) {
        // Server error
        return handleServerError(res, error);
    }
}

async function deleteUser(req, res) {
    let id = req.params.id;
    try {
        const result = await User.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            // User not found
            return res
                .status(404)
                .json({ message: `Resource with ID: [ ${id} ] not found.` });
        }
        // Successful deletion
        return res.sendStatus(204);
    } catch (error) {
        return handleServerError(res, error);
    }
}

// Handle login
async function login(req, res, next) {
    try {
        const password = req.body.password;
        const email = req.body.email;

        // Check for existing user
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "User does not exist!" });
        }

        // Compare password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Authentication failed!" });
        }

        // Create jwt
        const token = jwt.sign(
            { email: user.email, userId: user._id },
            config.secretKey,
            { expiresIn: "1h" }
        );

        // Send success response
        return res.status(200).json({
            token: token,
        });
    } catch (error) {
        handleServerError(res, error);
    }
}

module.exports = {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser,
    login,
};
