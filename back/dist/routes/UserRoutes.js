"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../dbFirebase/db");
const router = express_1.default.Router();
router.get('/getUsers', async (req, res) => {
    try {
        const allUsers = await (0, db_1.getAllUsers)();
        console.log(allUsers, 'ALL USERS USER ROUTES');
        res.json(allUsers);
    }
    catch (error) {
        res.status(400).send("Users not finded");
    }
});
router.post('/updateUser', async (req, res) => {
    try {
        const userData = req.body;
        console.log(req.body, 'USER DATA REQ.BODY');
        if (userData) {
            try {
                await (0, db_1.updateUser)(userData);
            }
            catch (error) {
                res.status(400).send("Error at upload user!");
            }
        }
        res.send('Data recieved');
    }
    catch (error) {
        console.log("User data not recieved", error);
        res.status(400).send("User data not recieved");
    }
});
router.delete("/deleteUser", (req, res) => {
    const email = req.body.email;
    if (email) {
        try {
            (0, db_1.deleteUser)(email);
            res.send('User deleted succesfully');
        }
        catch (error) {
            res.send("Error at delete user process!");
        }
    }
});
exports.default = router;
