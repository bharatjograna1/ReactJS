/* 
    Developer : Kevin Ladani
    Date : 13-12-2018
    UpdatedBy : Salim Deraiya 26-12-2018
    File Comment : Follower Profile Configuration Validation
*/

import validator from 'validator';

module.exports = function validateFollowerProfileConfigForm(data) {
    let errors = {};

    //Check Empty Can_Copy_Trade...
    if (typeof (data.Can_Copy_Trade) != 'undefined' && validator.isEmpty(data.Can_Copy_Trade.trim())) {
        errors.Can_Copy_Trade = "my_account.err.fieldRequired";
    }

    //Check Empty Can_Mirror_Trade...
    if (typeof (data.Can_Mirror_Trade) != 'undefined' && validator.isEmpty(data.Can_Mirror_Trade.trim())) {
        errors.Can_Mirror_Trade = "my_account.err.fieldRequired";
    }

    //Check Empty Enable_Auto_Copy_Trade_Functionality...
    if (typeof (data.Enable_Auto_Copy_Trade_Functionality) != 'undefined' && validator.isEmpty(data.Enable_Auto_Copy_Trade_Functionality.trim())) {
        errors.Enable_Auto_Copy_Trade_Functionality = "my_account.err.fieldRequired";
    }

    //Check Empty Default_Copy_Trade_Percentage...
    if (typeof (data.Default_Copy_Trade_Percentage) != 'undefined' && validator.isEmpty(data.Default_Copy_Trade_Percentage.trim())) {
        errors.Default_Copy_Trade_Percentage = "my_account.err.fieldRequired";
    } else if (!validator.isNumeric(data.Default_Copy_Trade_Percentage, { no_symbols: true })) {
        errors.Default_Copy_Trade_Percentage = "my_account.err.requireNumericField";
    } else if (data.Default_Copy_Trade_Percentage > 100) {
        errors.Default_Copy_Trade_Percentage = "my_account.err.invalidPercentage";
    }

    //Check Empty Maximum_Copy_Trade_Percentage...
    if (typeof (data.Maximum_Copy_Trade_Percentage) != 'undefined' && validator.isEmpty(data.Maximum_Copy_Trade_Percentage.trim())) {
        errors.Maximum_Copy_Trade_Percentage = "my_account.err.fieldRequired";
    } else if (!validator.isNumeric(data.Maximum_Copy_Trade_Percentage, { no_symbols: true })) {
        errors.Maximum_Copy_Trade_Percentage = "my_account.err.requireNumericField";
    } else if (data.Maximum_Copy_Trade_Percentage > 100) {
        errors.Maximum_Copy_Trade_Percentage = "my_account.err.invalidPercentage";
    }

    //Check Empty Maximum_Transaction_Amount_Limit...
    if (typeof (data.Maximum_Transaction_Amount_Limit) != 'undefined' && validator.isEmpty(data.Maximum_Transaction_Amount_Limit.trim())) {
        errors.Maximum_Transaction_Amount_Limit = "my_account.err.fieldRequired";
    } else if (!validator.isNumeric(data.Maximum_Transaction_Amount_Limit, { no_symbols: true })) {
        errors.Maximum_Transaction_Amount_Limit = "my_account.err.requireNumericField";
    }

    //Check Empty Maximum_Number_of_Transactions_Limit...
    if (typeof (data.Maximum_Number_of_Transactions_Limit) != 'undefined' && validator.isEmpty(data.Maximum_Number_of_Transactions_Limit.trim())) {
        errors.Maximum_Number_of_Transactions_Limit = "my_account.err.fieldRequired";
    } else if (!validator.isDecimal(data.Maximum_Number_of_Transactions_Limit, { force_decimal: false, decimal_digits: '0,9' })) {
        errors.Maximum_Number_of_Transactions_Limit = "my_account.err.requireDecimalField";
    }

    return {
        errors,
        isValid: Object.keys(errors).length > 0 ? false : true
    };
};