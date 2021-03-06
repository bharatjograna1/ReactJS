import validator from "validator";

module.exports = function validateTradeLimitRequest(data) {
    let errors = {};
    //check limit per hour...
    if (validator.isEmpty(data.LimitPerHour)) {
        errors.tradeLimitHour = "wallet.errLCInvalidLimit";
    } else if (
        !validator.isDecimal(data.LimitPerHour, {
            force_decimal: false,
            decimal_digits: "0,8"
        }) &&
        !validator.isNumeric(data.LimitPerHour)
    ) {
        errors.tradeLimitHour = "wallet.errLCInvalidLimit";
    }
    //check limit per day...
    if (validator.isEmpty(data.LimitPerDay)) {
        errors.tradeLimitDay = "wallet.errLCInvalidLimit";
    } else if (
        !validator.isDecimal(data.LimitPerDay, {
            force_decimal: false,
            decimal_digits: "0,8"
        }) &&
        !validator.isNumeric(data.LimitPerDay)
    ) {
        errors.tradeLimitDay = "wallet.errLCInvalidLimit";
    }
    //check limit per transaction...
    if (validator.isEmpty(data.LimitPerTransaction)) {
        errors.tradeLimitTrn = "wallet.errLCInvalidLimit";
    } else if (
        !validator.isDecimal(data.LimitPerTransaction, {
            force_decimal: false,
            decimal_digits: "0,8"
        }) &&
        !validator.isNumeric(data.LimitPerTransaction)
    ) {
        errors.tradeLimitTrn = "wallet.errLCInvalidLimit";
    }
    //check lifetime limits...
    if (validator.isEmpty(data.LifeTime)) {
        errors.tradeLifeTimeLimit = "wallet.errLCInvalidLimit";
    } else if (
        !validator.isDecimal(data.LifeTime, {
            force_decimal: false,
            decimal_digits: "0,8"
        }) &&
        !validator.isNumeric(data.LifeTime)
    ) {
        errors.tradeLifeTimeLimit = "wallet.errLCInvalidLimit";
    }
    //check timing start date and end date...
    if (data.StartTime != null || data.EndTime != null) {
        //check is not null ...
        if (data.StartTime == null) {
            errors.tradeStartTime = "wallet.errStartDate";
        } else if (data.EndTime == null) {
            errors.tradeEndTime = "wallet.errEndDate";
        }
        //check start time is greater then or quals to end time...
        if (data.StartTime != null && data.EndTime != null) {
            if (data.StartTime >= data.EndTime) {
                errors.tradeStartTime = "wallet.errLessThen";
            }
        }
    }
    return {
        errors,
        isValid: Object.keys(errors).length > 0 ? false : true
    };
};
