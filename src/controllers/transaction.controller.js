const transactionModel = require("../models/transaction.models")
const ledgerModel = require("../models/ledger.model")
const accountModel = require("../models/account.model")
const emailService = require("../services/email.service")
const mongoose = require("mongoose");



/*
*-create a transaction
   -the 10-step transfer flow:
    * 1. validate request
    * 2. validate idempotencykey
    * 3. chect account status
    * 4. derive sender balence from ledger
    * 5. create transaction (PENDING)
    * 6. create DEBIT ledger entry
    * 7. create CREDIT ledger entry 
    * 8. mark transaction completed
    * 9. commit mongodb session
    * 10. send email notification
*/
async function createTransaction(req, res) {

    //validate request
    
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body

    if(!fromAccount || !toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "fromAccount, toAccount, amount, idempotencykey are required"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount
    })

    const toUserAccount = await accountModel.findOne({
        _id: toAccount
    })

    if (!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            message: "invalid fromAccount or toAccount"
        })
    }

    //* 2. validate idempotencykey

    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    })
    if(isTransactionAlreadyExists) {
        if(isTransactionAlreadyExists.status === "COMPLETED"){
            return res.status(200).json({
                message: "transaction already exist",
                transaction: isTransactionAlreadyExists
            })
        }
        if(isTransactionAlreadyExists.status === "PENDING") {
            return res.status(200).json({
                message: "transaction is still processing"
            })
        }
        if(isTransactionAlreadyExists.status === "FAILED") {
            return res.status(500).json({
                message: "transaction process failed, please try again"
            })
        }
        if(isTransactionAlreadyExists.status === "REVERSED") {
            return res.status(500).json({
                message: "transaction was reversed, please try again"
            })
        }
        
    }
    //* 3. chect account status


    if(fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE") {
         return res.status(400).json({
            message: "both fromAccount and toAccount must be active to process transaction"
         })
    }

    //* 4. derive sender balence from ledger
    const balance = await fromUserAccount.getBalance()

    if(balance < amount) {
        return res.status(400).json({
            message: `insufficient balance. current balance is ${balance}. requested amount is ${amount}`
        })
    }
    let transaction;
    const session = await mongoose.startSession()
    try{
        await session.withTransaction(async () => {
            transaction = (await transactionModel.create([{
                fromAccount,
                toAccount,
                amount,
                idempotencyKey,
                status: "PENDING"
            }], { session }))[0]

            await ledgerModel.create([{
                account: fromAccount,
                amount,
                transaction: transaction._id,
                type: "DEBIT"
            }], { session }) 
            await (() => {
            return new Promise((resolve) => setTimeout(resolve, 15 * 1000));
        })()

            await ledgerModel.create([{
                account: toAccount,
                amount,
                transaction: transaction._id,
                type: "CREDIT"
            }], { session })

            await transactionModel.findOneAndUpdate(
            { _id: transaction._id },
            { status: "COMPLETED" },
            { session }
        )


        await session.commitTransaction()
        session.endSession()

        })
    } catch (error) {
        return res.status(400).json({
            message: "Transaction could not be completed. Retry after some minutes",
            
        })
    } 
    
    //* 10. send email notification

    await emailService.sendTransactionEmail(req.user.email, req.user.name, amount, toAccount)

    return res.status(201).json({
        message: "transaction completed successfully",
        transaction: transaction
    })
}

async function createInitialFundsTransaction(req, res){
    const {toAccount, amount, idempotencyKey} = req.body

    if(!toAccount || !amount || !idempotencyKey){
        return res.status(400).json({
            message: "toAccount, amount And idempotencyKey are required"
        }) 
    }

    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
    })

    if(!toUserAccount) {
        return res.status(400).json({
            message: "invalid toAccount"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        user: req.user._id
    })
    if(!fromUserAccount){
        return res.status(400).json({
            message: "system user account not found"
        })
    }
    let transaction;
    const session = await mongoose.startSession()
    try {
        await session.withTransaction(async () => {
            transaction = new transactionModel({
                fromAccount: fromUserAccount._id,
                toAccount: toUserAccount._id,
                amount,
                idempotencyKey,
                status: "PENDING"
            })
            await transaction.save({ session })

            await ledgerModel.create([{
                account: fromUserAccount._id,
                amount,
                transaction: transaction._id,
                type: "DEBIT"
            }], { session })

            await ledgerModel.create([{
                account: toUserAccount._id,
                amount,
                transaction: transaction._id,
                type: "CREDIT"
            }], { session })

            transaction.status = "COMPLETED"
            await transaction.save({ session })
        })
    } catch (error) {
        return res.status(503).json({
            message: "Initial funds transaction could not be completed. Retry with the same idempotencyKey.",
            error: error.message
        })
    } finally {
        await session.endSession()
    }

    return res.status(201).json({
            message: "Initial funds transaction completed successfully",
            transaction: transaction
        })


}

module.exports = {
    createTransaction,
    createInitialFundsTransaction 
}