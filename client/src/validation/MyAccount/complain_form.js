import validator from 'validator';
import { isScriptTag } from "Helpers/helpers";

module.exports = function validateComplainForm(data) {
    let errors = {};

    //Check Empty Complain Type...
    if (typeof (data.type) != 'undefined' && (validator.isEmpty(data.type) || !validator.isNumeric(data.type))) {
        errors.type = "my_account.err.fieldRequired";
    }

    //Check Empty Subject...
    if (typeof (data.subject) != 'undefined' && validator.isEmpty(data.subject)) {
        errors.subject = "my_account.err.fieldRequired";
    } else if (typeof(data.subject) != 'undefined' && isScriptTag(data.subject)) {
        errors.subject = "my_account.err.scriptTag";
    }

    //Check Empty Description...
    if (typeof (data.description) != 'undefined' && validator.isEmpty(data.description)) {
        errors.description = "my_account.err.fieldRequired";
    } else if (typeof(data.description) != 'undefined' && isScriptTag(data.description)) {
        errors.description = "my_account.err.scriptTag";
    }

    // //Check Empty Attachment...
    // if (typeof(data.attachment) != 'undefined' && validator.isEmpty(data.attachment))
    // {
    //     errors.attachment = "my_account.err.fieldRequired";
    // }

    return {
        errors,
        isValid: Object.keys(errors).length > 0 ? false : true
    };
};