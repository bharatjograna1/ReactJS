/* 
    Developer : Kevin Ladani
    Date : 13-12-2018
    UpdatedBy : Salim Deraiya 26-12-2018
    File Comment : Leader Profile Configuration Validation
*/

import validator from 'validator';

module.exports = function validateLeaderProfileConfigForm(data) {
    let errors = {};

    //Check Empty Default_Visibility_of_Profile...
    if (typeof (data.Default_Visibility_of_Profile) != 'undefined' && validator.isEmpty(data.Default_Visibility_of_Profile.trim())) {
        errors.Default_Visibility_of_Profile = "my_account.err.fieldRequired";
    }

    //Check Empty Max_Number_Followers_can_Follow...
    if (typeof (data.Max_Number_Followers_can_Follow) != 'undefined' && validator.isEmpty(data.Max_Number_Followers_can_Follow.trim())) {
        errors.Max_Number_Followers_can_Follow = "my_account.err.fieldRequired";
    } else if (!validator.isNumeric(data.Max_Number_Followers_can_Follow, { no_symbols: true })) {
        errors.Max_Number_Followers_can_Follow = "my_account.err.requireNumericField";
    }

    //Check Empty Min_Balance_Require_in_Follower_Account_to_Follow...
    if (typeof (data.Min_Balance_Require_in_Follower_Account_to_Follow) != 'undefined' && validator.isEmpty(data.Min_Balance_Require_in_Follower_Account_to_Follow.trim())) {
        errors.Min_Balance_Require_in_Follower_Account_to_Follow = "my_account.err.fieldRequired";
    } else if (!validator.isDecimal(data.Min_Balance_Require_in_Follower_Account_to_Follow, { force_decimal: false, decimal_digits: '0,8' })) {
        errors.Min_Balance_Require_in_Follower_Account_to_Follow = "my_account.err.requireDecimalField";
    }

    return {
        errors,
        isValid: Object.keys(errors).length > 0 ? false : true
    };
};