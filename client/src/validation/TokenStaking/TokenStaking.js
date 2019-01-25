import validator from 'validator';

module.exports = function validateStakingRequest(data) {
    let errors = {};
    //Check Required Field...
    if (validator.isEmpty(data.PolicyDetailID)) {
        errors.PolicyDetailID = "wallet.errSelectPlan";
    }
    if (validator.isEmpty(data.AccWalletID)) {
        errors.AccWalletID = "wallet.errSelectWallet";
    }
    if (validator.isEmpty(data.amount)) {
        errors.amount = "trade.errTradeAmountRequired";
    }
    return {
        errors,
        isValid: Object.keys(errors).length > 0 ? false : true
    };
};