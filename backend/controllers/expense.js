const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        // validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ msg: "Please fill all the fields." })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ msg: "Amount must be a positive number" })
        }
        await expense.save()
        res.status(200).json({ msg: "Expense added successfully" })
    } catch (error) {
        res.status(500).json({ msg: "Error" })
    }

    console.log(expense)
}

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 })
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({ msg: 'Error' })
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({ msg: 'This has been deleted successfully' })
        })
        .catch((err) => {
            res.status(500).json({ msg: "Error" })
        })
}