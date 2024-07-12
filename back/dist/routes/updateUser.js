"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../dbFirebase/db");
const router = express_1.default.Router();
router.post('/uploadUser', (req, res) => {
    try {
        const userData = req.body;
        console.log(req.body, 'USER DATA REQ.BODY');
        if (userData) {
            (0, db_1.updateUser)(userData);
        }
        res.send('Data recieved');
    }
    catch (error) {
        console.log("User data not recieved", error);
        res.status(400).send("User data not recieved");
    }
});
exports.default = router;
