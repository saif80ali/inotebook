const express = require('express')
const router = express.Router()
const Stock = require('../models/Stock')
var fetchuser = require('../middleware/fethuser')
const { body, validationResult } = require('express-validator');

router.get("/", fetchuser, async (req, res) => {
    try {
        const stock = await Stock.find({user: req.user.id});
        res.status(200).send(stock);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post("/addTransaction", fetchuser,[
    body("stock_name", "Invalid stock name").isLength({min:3}),
    body("transaction_type", "Invalid type is required").notEmpty(),
    body("price", "Invalid price").isFloat({ min: 0}),
    body("quantity", "Invalid quantity").isInt({ min: 1}),
    body("amount", "Invalid amount").isFloat({ min: 0.1}),
    body("transaction_date", "Invalid day received").isISO8601().toDate(),
    ], async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            let {stock_name, transaction_type, price, quantity, amount, transaction_date} = req.body;
            const newRecord = new Stock({user: req.user.id,stock_name, transaction_type, price, quantity, amount, transaction_date});
            await newRecord.save();
            res.status(200).json(newRecord);
        }
    } catch (err) {
        res.status(400).send(err);
    }
})

router.delete("/:id", fetchuser, async (req, res) => {
    try {
        const id = req.params.id;
        await Stock.findByIdAndDelete(id);
        res.status(200).send({message: "Record deleted successfully"});
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;