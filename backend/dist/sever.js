"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
let orders = [];
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.json({ token: 'dummy-token' });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
app.post('/api/order', (req, res) => {
    const order = req.body;
    orders.push(order);
    res.json({ message: 'Order received', order });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
