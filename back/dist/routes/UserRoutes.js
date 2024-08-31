"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../dbFirebase/db");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
dotenv_1.default.config();
router.post('/login', (req, res) => {
    const { user, password } = req.body;
    if (user === process.env.GESTOR_USER && password === process.env.PASSWORD) {
        const token = jsonwebtoken_1.default.sign({
            user
        }, 'secret', {
            expiresIn: '4h'
        });
        res
            .cookie('acces_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 4 // 1hs
        })
            .send({ user, token });
    }
    res.status(401).send('Username or password incorrect');
});
router.get('/logout', (req, res) => {
    res.status(200).cookie('acces_token', '', {
        maxAge: 1
    }).send("Log Out");
});
router.get('/protected', (req, res) => {
    const { user } = req.session;
    try {
        if (user) {
            res.status(203).send(user);
        }
        else {
            res.status(401).send('Not authenticated');
        }
    }
    catch (error) {
        res.status(500).send('Error at user access');
    }
});
router.get('/getUsers', async (req, res) => {
    try {
        const allUsers = await (0, db_1.getAllUsers)();
        if (allUsers) {
            res.json(allUsers);
        }
        else {
            res.status(400).send('Error at getUsers');
        }
    }
    catch (error) {
        res.status(400).send("Users not finded");
    }
});
router.post('/createUser', async (req, res) => {
    const { user } = req.session;
    if (user) {
        try {
            const userData = req.body;
            console.log(req.body, 'UPDATE USER REQ.BODY');
            if (userData) {
                try {
                    const responseDB = await (0, db_1.createUser)(userData);
                    if (responseDB) {
                        res.status(200).send('User created');
                    }
                }
                catch (error) {
                    console.error('Error at updateUser DB function');
                }
            }
            else {
                res.status(400).send("Error at upload user!");
            }
        }
        catch (error) {
            console.error("User data not recieved");
            res.status(400).send("User data not recieved");
        }
    }
    else {
        res.status(401).send('Unauthorized for UserRoutes/updateUser');
    }
});
router.put('/updateUser', async (req, res) => {
    const { user } = req.session;
    if (user) {
        try {
            const userData = req.body;
            console.log(req.body, 'UPDATE USER REQ.BODY');
            if (userData) {
                try {
                    await (0, db_1.updateUser)(userData);
                    res.status(200).send('User updated');
                }
                catch (error) {
                    console.error('Error at updateUser DB function');
                }
            }
            else {
                res.status(400).send("Error at upload user!");
            }
        }
        catch (error) {
            console.error("User data not recieved");
            res.status(400).send("User data not recieved");
        }
    }
    else {
        res.status(401).send('Unauthorized for UserRoutes/updateUser');
    }
});
router.delete("/deleteUser", async (req, res) => {
    const { user } = req.session;
    if (user) {
        const { email } = req.body;
        if (email) {
            try {
                await (0, db_1.deleteUser)(email);
                res.send('User deleted succesfully');
            }
            catch (error) {
                res.send("Error at delete user process!");
            }
        }
    }
    else {
        res.status(401).send("Unauthorized for userRoutes/deleteUser !");
    }
});
exports.default = router;
