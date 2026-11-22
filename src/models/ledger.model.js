const mongoose = require("mongoose");
const ledgerSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "account",
        required: [true, "ledger must be associated with an account"],
        index: true,
        immutable: true
    },
    amount: {
        type: Number,
        required: [true, "amount is required for created a ledger entry"],
        immutable: true
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction",
        required: [true, "ledger must be associated with a transaction"],
        index: true,
        immutable: true
    },
    type:{
        type: String,
        enum: {
            values: ["CREDIT", "DEBIT"],
            message: "type can be either CREDIT or DEBIT"
        },
        required: [true, "ledger type is required"],
        immutable: true
    }
})


function preventLedgerModificaton() {
    throw new Error("ledger entries are immutable and cannot be modifier or deleted");
}
ledgerSchema.pre('findOneAndUpdate',preventLedgerModificaton);
ledgerSchema.pre('UpdateOne',preventLedgerModificaton);
ledgerSchema.pre('deleteOne',preventLedgerModificaton);
ledgerSchema.pre('remove',preventLedgerModificaton);
ledgerSchema.pre('deleteMany',preventLedgerModificaton);
ledgerSchema.pre('updateMany',preventLedgerModificaton);
ledgerSchema.pre('findOneAndDelete',preventLedgerModificaton);
ledgerSchema.pre('findOneAndReplace',preventLedgerModificaton);



const ledgerModel = mongoose.model('ledger', ledgerSchema)

module.exports = ledgerModel; 