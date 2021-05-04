/*
 Copyright (c) 2012 TeamF1, Inc.
 All rights reserved.
 */
/**
 * Message Variables
 */
var INVALID_IP = "Invalid IP";
var ENTER_VALUE_BETWEEN = " Please enter a value between ";
var INVALID_NUMBER = "Invalid Number";
var VALUE_NOT_LESSTHAN = "Please enter a value not less than";
var INVALID_MAC_ADDRESS = "invalid MAC address";
var VALID_CHARACTERS = "Please enter valid characters for ";
var CHARACTERNOT_SUPPORTED = "\nFollowing character is not supported for this field: ";
var SPACE_CHAR = "space char";
var MUST_NOT_LESSTHAT = "End port must not be less than the start port";
var NOT_ALLOWED_FQDN = "'@' not allowed in FQDN string";
var DOUBLE_QUOTE_NOT_ALLOWED = "'@' and double quote(\") not allowed in FQDN string";
var DOUBLE_QUOTE_NOT_ALLOWED2 = "double quote(\") not allowed in FQDN string";
var CHARACTERS_ALLOWED = "characters are allowed.";
var ONLY_THIS_CHARACTERS = "Only a-z, A-Z, 0-9 and";
var ONLY_ANDTHIS_CHARACTERS = "Only a-z, A-Z, 0-9";
var VALID_HOSTNAME = "Enter a valid host name.";
var VALID_DOMAINNAME = "Enter a valid Domain Name.";
var ONLY_CHARACTERS_ALLOWED = "Only a-z, 0-9, .(dot) and -(hyphen) characters are allowed";
var ONLY_CHARACTERS_ALLOWED_DOMAIN = "Only a-z, A-Z, 0-9, .(dot) and -(hyphen) characters are allowed";
var HOST_NAME_LENGHT = "Host Name length should not exceed 255 characters";
var HOST_NAME_NOT_START = "Host Name should not start with .(dot) / -(hyphen)";
var HOST_NAME_NOT_END = "Host Name should not END with .(dot) / -(hyphen)";
var DOMAIN_NAME_LENGHT = "Domain Name length should not exceed 253 characters";
var DOMAIN_NAME_NOT_START = "Domain Name should not start with .(dot) / -(hyphen)";
var DOMAIN_NAME_NOT_END = "Domain Name should not END with .(dot) / -(hyphen)";
var EMPTY_LABLE = "Empty lables(i.e. xxxx..xxxx) are not allowed";
var LABLE_LENGTH = "Each Label length should not exceed 63 characters";
var VALID_HOSTNAME = "Enter a valid host name.";
var ENTER_VALID_DOMAIN = "Please enter a valid Domain/Internet name";
var DOMAIN_CONTAIN = "Domain/Internet must contain only alphanumeric leters, '.' and '-'";
var DOMAIN_START = "Domain/Internet name must start with only alphanumerical character";
var DOMAIN_END = "Domain/Internet must end with only alphanumerical character";
var ONLY_NUMBERS_AND = "Only 0-9 and ";
var ONLY_NUMBERS = "Only 0-9 ";
var VALID_INTEAGER = "Please enter a valid integer value.";
var ERROR_ON_THIS_PAGE = "There is error on this page.";
var NOT_SUPPORTED = '\', " and space characters are not supported for this field';
var COLON_NOT_SUPPORTED = "':' is not supported for this field.";
var PIPE_SEMICOLON_NOT_SUPPORTED = "Pipe (|) and Semi-Colon (;)  are not supported for this field";
var SINGLEQUOTE_NOT_SUPPORTED = "Single Quote(') are not supported for this field";

/**
 * Checks if the field is empty or not
 * @method isFieldEmpty
 * @param fieldId - field Id that is checked for emptyness
 * @param alertFlag - if it is true then show message otherwise not.
 * @param errMsg - message to be shown
 */
function isFieldEmpty(fieldId, alertFlag, errMsg){
    var obj = document.getElementById(fieldId);
    if (!obj || obj.disabled) 
        return false;
    if (!obj.value.length) {
        if (alertFlag) 
            alert(errMsg);
        obj.focus();
        return true;
    }
    return false;
}

/**
 * Wrapper for 'isFieldEmpty'
 * @method txtFieldArrayCheck
 * @param txtFieldIdArr array of fields which needs to be checked for emptyness
 */
function txtFieldArrayCheck(txtFieldIdArr){
    for (var i = 0; i < txtFieldIdArr.length; ++i) {
        var result = false;
        var strArr = txtFieldIdArr[i].split(",");
        result = isFieldEmpty(strArr[0]);
        if (result) {
            if (strArr.length > 1) 
                alert(strArr[1]);
            return false;
        }
    }
    return true;
}

/**
 * Alerts if some character is not supported in the field
 * @method isProblemCharArrayCheck
 * @param txtFieldIdArr - ',' separated list of fieldIds and messages
 * @param notSupportedChar -
 */
function isProblemCharArrayCheck(txtFieldIdArr, notSupportedChar, msg){


    for (var i = 0; i < txtFieldIdArr.length; ++i) {
        var result = false;
        var strArr = txtFieldIdArr[i].split(",");
        var obj = document.getElementById(strArr[0]);
        if (!obj || obj.disabled) 
            continue;
        else {
            if (strArr.length > 1) {
                for (var unsup = 0; unsup < notSupportedChar.length; unsup++) {
                    if (obj.value.indexOf(notSupportedChar.charAt(unsup)) != -1) {
                        alert(msg);
                        obj.focus();
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

/**
 * Alerts if some character is not supported in the field
 * @method isProblemCharArrayCheck
 * @param txtFieldIdArr - ',' separated list of fieldIds and messages
 * @param notSupportedChar -
 */
function isProblemCharArrayCheck1(txtFieldIdArr){
    for (var i = 0; i < txtFieldIdArr.length; ++i) {
        var result = false;
        var strArr = txtFieldIdArr[i].split(",");
        var obj = document.getElementById(strArr[0]);
        if (!obj || obj.disabled) 
            continue;
        else {
            if (strArr.length > 1) {
                if (obj.value.indexOf("'") != -1 || obj.value.indexOf("\"") != -1 || obj.value.indexOf(" ") != -1) {
                    if (document.getElementById(strArr[0] + "Err")) 
                        document.getElementById(strArr[0] + "Err").innerHTML = "Empty space, ' and \" characters are not supported for this field"
                    else 
                        alert("Empty space, ' and \" characters are not supported for this field");
                    obj.focus();
                    return false;
                }
            }
        }
    }
    return true;
}

/**
 * Checks for minimum and maximum length of the field
 * @method fieldLengthCheck
 * @param fieldId - id of of field
 * @param minLen - minimum length
 * @param maxLen - minimum length
 * @param errMsg - error message
 */
function fieldLengthCheck(fieldId, minLen, maxLen, errMsg){
    var fldObj = document.getElementById(fieldId);
    if (!fldObj || fldObj.disabled) 
        return true;
    var strVal = fldObj.value;
    if (minLen && (strVal.length < minLen)) {
        if (errMsg) {
            alert(errMsg);
        }
        fldObj.focus();
        return false;
    }
    if (maxLen && (strVal.length > maxLen)) {
        if (errMsg) {
            alert(errMsg);
        }
        fldObj.focus();
        return false;
    }
    return true;
}

/**
 * Allows only numeric characters to be entered
 * @method numericValueCheck
 * @param eventObj - event obj
 * @param exceptionCharStr - exception characters which are allowed other than numeric characters
 */
function numericValueCheck(eventObj, exceptionCharStr){



    var charUniCode = eventObj.charCode ? eventObj.charCode : eventObj.keyCode;
    /* check for any exceptional characters */
    if (exceptionCharStr) {
        for (i = 0; i < exceptionCharStr.length; ++i) 
            if (exceptionCharStr.charCodeAt(i) == charUniCode) 
                return true;
    }
    switch (charUniCode) {
        case 8: /* back space */
        case 9: /* tab */
        case 16: /* shift */
            /* case 37: */
            /* left arrow */
            /* case 39: */
            /* right arrow */
            /* case 46: */
            /* delete - not supporting as in netscape it's char code is same as '.'*/
            return true;
        default:
            break;
    }
    /* allow back space */
    if (charUniCode < 48 || charUniCode > 57) 
        return false;
    return true;
}

/**
 * Finds the range of numeric value
 * @method numericValueRangeCheck
 * @param srcObj - source object
 * @param minLen - minimum length
 * @param minLenErrStr - Error string
 * @param minVal - Minimum value
 * @param maxVal - Maximum value
 * @param errFlag - If error flag is true shows message
 * @param prefixErrStr - prefix error string
 * @param suffixErrStr - suffix error string
 */
function numericValueRangeCheck(srcObj, minLen, minLenErrStr, minVal, maxVal, errFlag, prefixErrStr, suffixErrStr){
    if (!srcObj || srcObj.disabled) 
        return true;
    /*var value = parseInt(srcObj.value, 10);*/
	var value = srcObj.value;
    /* check for minimum length if specified */
    if (minLen && (value.length < minLen)) {
        if (minLenErrStr) {
            alert(minLenErrStr);
        }
        srcObj.focus();
        return false;
    }
    
    if (isNaN(value)) {
        var errStr = '';
        errStr += INVALID_NUMBER;
        alert(errStr);
        srcObj.focus();
        return false;
    }
    
    value = parseInt(srcObj.value, 10);
    /* added value < 0 condition to check for negative values */ 
    if ((minVal && (value < minVal)) || (maxVal && (value > maxVal)) || value < 0) {
        if (errFlag) {
            var errStr = '';
            if (prefixErrStr) 
                errStr += prefixErrStr;
            errStr += ENTER_VALUE_BETWEEN + minVal + " - " + maxVal + " ";
            if (suffixErrStr) 
                errStr += suffixErrStr;
            alert(errStr);
        }
        srcObj.focus();
        return false;
    }
    return true;
}

/**
 * Checks if problematic character exists or not
 * @method isProblemChar
 * @param eventObj - event obj
 * @param problemCharStr - problematic characters
 * @param errMsg - error message
 */
function isProblemChar(eventObj, problemCharStr, errMsg){
    var charUniCode = eventObj.charCode ? eventObj.charCode : eventObj.keyCode;
    /* check for any problematic characters */
    if (problemCharStr) {
        for (i = 0; i < problemCharStr.length; ++i) 
            if (problemCharStr.charCodeAt(i) == charUniCode) {
                if (errMsg) {
                    var errStr1 = VALID_CHARACTERS + errMsg;
                    if (problemCharStr.length == 1) {
                        var errStr2 = CHARACTERNOT_SUPPORTED;
                        if (charUniCode == 32) /* Space */ 
                            alert(errStr1 + errStr2 + SPACE_CHAR);
                        else 
                            alert(errStr1 + errStr2 + String.fromCharCode(charUniCode));
                    }
                    else {
                        var errStr3 = errStr1 + VALID_CHARACTERS;
                        for (i = 0; i < problemCharStr.length; ++i) 
                            if (problemCharStr.charCodeAt(i) == 32) /* Space */ 
                                errStr3 += SPACE_CHAR;
                            else 
                                errStr3 += problemCharStr.charAt(i)
                        alert(errStr3);
                    }
                }
                return true;
            }
    }
    return false;
}

/**
 * Checks for port range
 * @method checkPortRange
 * @param strPortId - start port Id
 * @param endPortId - end port Id
 */
function checkPortRange(strPortId, endPortId){
    var strPortObj = document.getElementById(strPortId);
    var endPortObj = document.getElementById(endPortId);
    if (!strPortObj || !endPortObj) 
        return;
    if (strPortObj.disabled || endPortObj.disabled) 
        return true;
    if (isNaN(strPortObj.value)) 
        return true;
    if (isNaN(endPortObj.value)) 
        return true;
    if (parseInt(strPortObj.value, 10) > parseInt(endPortObj.value, 10)) {
        var errStr = MUST_NOT_LESSTHAT;
        alert(errStr);
        return false;
    }
    return true;
}

/**
 * Validates fqdn
 * @method validateFQDN
 * @param fieldId - field Id of field
 */
function validateFQDN(fieldId){
    var fqdnObj = document.getElementById(fieldId);
    if (!fqdnObj || fqdnObj.disabled) 
        return true;
    if (fqdnObj.value.indexOf('@') != -1 || fqdnObj.value.indexOf('\"') != -1) {
        var errorStr = NOT_ALLOWED_FQDN;
        if (fqdnObj.value.indexOf('@') != -1 && fqdnObj.value.indexOf('\"') != -1) 
            errorStr = DOUBLE_QUOTE_NOT_ALLOWED;
        else 
            if (fqdnObj.value.indexOf('\"') != -1) 
                errorStr = DOUBLE_QUOTE_NOT_ALLOWED2;
        
        alert(errorStr);
        return false;
    }
    return true;
}

/**
 * Allows alpha numeric values
 * @method alphaNumericCheck
 * @param eventObj - event object
 * @param exceptionCharStr - exception characters allowed
 */
function alphaNumericCheck(eventObj, exceptionCharStr){
    var charUniCode = eventObj.charCode ? eventObj.charCode : eventObj.keyCode;
    /* check for any exceptional characters */
    if (exceptionCharStr) {
        for (i = 0; i < exceptionCharStr.length; ++i) 
            if (exceptionCharStr.charCodeAt(i) == charUniCode) 
                return true;
    }
    switch (charUniCode) {
        case 8: /* back space */
        case 9: /* tab */
        case 16: /* shift */
            /* case 37: */
            /* left arrow */
            /* case 39: */
            /* right arrow */
            /* case 46: */
            /* delete - not supporting as in netscape it's char code is same as '.'*/
            return true;
        default:
            break;
    }
    /* allow A - F */
    if (charUniCode >= 97 && charUniCode <= 122) 
        return true;
    /* allow A - F */
    if (charUniCode >= 65 && charUniCode <= 90) 
        return true;
    /* allow back space */
    if (charUniCode < 48 || charUniCode > 57) 
        return false;
    return true;
}

/**
 * Allows alpha numeric values, used when submitting the form
 * @method alphaNumericCheck
 * @param eventObj - event object
 * @param exceptionCharStr - exception characters allowed
 * @param prefixErrMsg - prefix error message
 */
function alphaNumericValueCheck(fieldId, exceptionCharStr, prefixErrMsg){
    var txtFieldObj = document.getElementById(fieldId);
    if (!txtFieldObj || txtFieldObj.disabled) 
        return true;
    for (var idx = 0; idx < txtFieldObj.value.length; idx++) {
        var charUniCode = txtFieldObj.value.charCodeAt(idx);
        /* check for any exceptional characters */
        if (exceptionCharStr) {
            var matchFound = false;
            for (i = 0; i < exceptionCharStr.length; ++i) 
                if (exceptionCharStr.charCodeAt(i) == charUniCode) {
                    matchFound = true;
                    break;
                }
            if (matchFound) 
                continue;
        }
        switch (charUniCode) {
            case 8: /* back space */
            case 9: /* tab */
            case 16: /* shift */
                /* case 37: */
                /* left arrow */
                /* case 39: */
                /* right arrow */
                /* case 46: */
                /* delete - not supporting as in netscape it's char code is same as '.'*/
                return true;
            default:
                break;
        }
        /* allow A - F */
        if (charUniCode >= 97 && charUniCode <= 122) 
            continue;
        /* allow A - F */
        if (charUniCode >= 65 && charUniCode <= 90) 
            continue;
        /* allow 0 to 9 */
        if (charUniCode >= 48 && charUniCode <= 57) 
            continue;
        var errorMsg = "";
        if (prefixErrMsg && prefixErrMsg != "") 
            errorMsg += prefixErrMsg;
        if (exceptionCharStr != '') 
            errorMsg += ONLY_THIS_CHARACTERS + exceptionCharStr + CHARACTERS_ALLOWED;
        else 
            errorMsg += ONLY_ANDTHIS_CHARACTERS + CHARACTERS_ALLOWED;
        
        alert(errorMsg);
        txtFieldObj.focus();
        return false;
    }
    return true;
}

/**
 * validates host name
 * @method validateHostName
 * @param hostNameObj - host name onject
 * @param errorPrefix - error prefix
 */
function validateHostName(hostNameObj, errorPrefix){
    if (!hostNameObj || hostNameObj.disabled) 
        return true;
    var hostName = hostNameObj.value;
    var errorFlag = false;
    var errorMsg = ""
    if (errorPrefix) 
        ;
    errorMsg = errorPrefix + " ";
    if (hostName == "") {
        errorMsg += VALID_HOSTNAME;
        errorFlag = true;
    }
    /* Check to allow a - z, 0-9, .(dot) and -(hyphen) only */
    if (!errorFlag) {
        for (i = 0; i < hostName.length; i++) {
            if ((hostName.charCodeAt(i) >= 97 && hostName.charCodeAt(i) <= 122) || (hostName.charCodeAt(i) >= 48 && hostName.charCodeAt(i) <= 57) || hostName.charAt(i) == "." || hostName.charAt(i) == "-") 
                errorFlag = false;
            else {
                errorMsg += ONLY_CHARACTERS_ALLOWED;
                errorFlag = true;
                break;
            }
        }
    }
    
    /* Other Check */
    if (!errorFlag) {
        if (hostName.length > 255) {
            errorMsg += HOST_NAME_LENGHT;
            errorFlag = true;
        }
        else 
            if (hostName.charAt(0) == "-" || hostName.charAt(0) == ".") {
                errorMsg += HOST_NAME_NOT_START;
                errorFlag = true;
            }
            else 
                if (hostName.charAt(hostName.length - 1) == "-" || hostName.charAt(hostName.length - 1) == ".") {
                    errorMsg += HOST_NAME_NOT_END;
                    errorFlag = true;
                }
                else 
                    if (hostName.indexOf(".") != -1) {
                        var lblsArray = hostName.split(".");
                        for (i = 0; i < lblsArray.length; i++) 
                            if (lblsArray[i].length == 0) {
                                errorMsg += EMPTY_LABLE;
                                errorFlag = true;
                                break;
                            }
                            else 
                                if (lblsArray[i].length > 63) {
                                    errorMsg += LABLE_LENGTH;
                                    errorFlag = true;
                                    break;
                                }
                    }
    }
    
    if (errorFlag) {
        alert(errorMsg);
        hostNameObj.focus();
        return false;
    }
    return true;
}

/**
 * validates keyword
 * @method validateKeyWord
 * @param hostNameObj - host name onject
 * @param errorPrefix - error prefix
 */
function validateKeyWord(hostNameObj, errorPrefix){
    if (!hostNameObj || hostNameObj.disabled) 
        return true;
    var hostName = hostNameObj.value;
    var errorFlag = false;
    var errorMsg = ""
    if (errorPrefix) 
        errorMsg = errorPrefix + " "
    if (hostName == "") {
        errorMsg += VALID_HOSTNAME;
        errorFlag = true;
    }
    /* Check to allow a - z, 0-9, .(dot) and -(hyphen) only */
    if (!errorFlag) {
        for (i = 0; i < hostName.length; i++) {
            if ((hostName.charCodeAt(i) >= 97 && hostName.charCodeAt(i) <= 122) || (hostName.charCodeAt(i) >= 48 && hostName.charCodeAt(i) <= 57) || hostName.charAt(i) == "." || hostName.charAt(i) == "-") 
                errorFlag = false;
            else {
                errorMsg += ONLY_CHARACTERS_ALLOWED;
                errorFlag = true;
                break;
            }
        }
    }
    
    /* Other Check */
    if (!errorFlag) {
        if (hostName.length > 255) {
            errorMsg += HOST_NAME_LENGHT;
            errorFlag = true;
        }
        else 
            if (hostName.indexOf(".") != -1) {
                var lblsArray = hostName.split(".");
                var len = (lblsArray.length) - 1
                for (i = 0; i < lblsArray.length; i++) 
                    if (lblsArray[i].length == 0 && i != 0 && i != len) {
                        errorMsg += EMPTY_LABLE;
                        errorFlag = true;
                        break;
                    }
                    else 
                        if (lblsArray[i].length > 63) {
                            errorMsg += LABLE_LENGTH;
                            errorFlag = true;
                            break;
                        }
            }
    }
    if (errorFlag) {
        alert(errorMsg);
        hostNameObj.focus();
        return false;
    }
    return true;
}

/**
 * validates keyword
 * @method enableCheck
 */
function enableCheck(){
    var disObj = document.getElementById('isDisable');
    if (disObj.value == "1") 
        fieldStateChangeWr('', 'disablePage', '', '');
}

/**
 * validates keyword
 * @method validateKeyWord
 * @param hostNameObj - host name onject
 * @param errorPrefix - error prefix
 */
function checkHostName(fieldId, errorFlag, customMsg, emptyFlag){
    var fieldObj = document.getElementById(fieldId);
    if (!fieldObj || fieldObj.disabled) 
        return true;
    var hostName = fieldObj.value;
    /* Check if host name Empty */
    if (hostName == "" && emptyFlag) {
        return true;
    }
    else 
        if (hostName == "") {
            var errMsg = ENTER_VALID_DOMAIN;
            if (customMsg != "") {
                errMsg = customMsg + errMsg;
                alert(errMsg);
                fieldObj.focus();
                return false;
            }
        }
    /* Check host name rules */
    var isInvalid = false
    for (var idx = 0; idx < hostName.length; idx++) {
        var exceptionChars = "-.";
        var charCode = hostName.charCodeAt(idx);
        if (!((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || (charCode >= 48 && charCode <= 57) || charCode == exceptionChars.charCodeAt(0) || charCode == exceptionChars.charCodeAt(1))) {
            isInvalid = true;
            break;
        }
    }
    if (isInvalid) {
        var errMsg = DOMAIN_CONTAIN;
        if (customMsg != "") {
            errMsg = customMsg + errMsg;
            alert(errMsg);
            fieldObj.focus();
            return false;
        }
    }
    var firstChar = hostName.charCodeAt(0)
    if (!((firstChar >= 97 && firstChar <= 122) || (firstChar >= 65 && firstChar <= 90) || (firstChar >= 48 && firstChar <= 57))) {
        var errMsg = DOMAIN_START;
        if (customMsg != "") {
            errMsg = customMsg + errMsg;
            alert(errMsg);
            fieldObj.focus();
            return false;
        }
    }
    var lastChar = hostName.charCodeAt(hostName.length - 1)
    if (!((lastChar >= 97 && lastChar <= 122) || (lastChar >= 65 && lastChar <= 90) || (lastChar >= 48 && lastChar <= 57))) {
        var errMsg = DOMAIN_END;
        if (customMsg != "") {
            errMsg = customMsg + errMsg;
            alert(errMsg);
            fieldObj.focus();
            return false;
        }
    }
    return true;
}

/**
 * checks for valid integer value
 * @method isNumericValue
 * @param 'fieldId' id for the field
 */
function isNumericValue(fieldId){
    try {
        var fieldIdObj = document.getElementById(fieldId);
        if (fieldIdObj && !fieldIdObj.disabled) {
            if (isNaN(parseInt(fieldIdObj.value, 10))) {
                alert(VALID_INTEAGER);
                fieldIdObj.focus();
                return false;
            }
            else {
                return true;
            }
        }
    } 
    catch (err) {
        alert(ERROR_ON_THIS_PAGE);
        return false;
    }
}

/**
 * Allows alpha numeric values
 * @method alphaNumericCheckSpace
 * @param eventObj - event object
 * @param exceptionCharStr - exception characters allowed
 */
function alphaNumericCheckSpace(eventObj, exceptionCharStr){
    var charUniCode = eventObj.charCode ? eventObj.charCode : eventObj.keyCode;
    /* check for any exceptional characters */
    if (exceptionCharStr) {
        for (i = 0; i < exceptionCharStr.length; ++i) 
            if (exceptionCharStr.charCodeAt(i) == charUniCode) 
                return true;
    }
    switch (charUniCode) {
        case 8: /* back space */
        case 9: /* tab */
        case 16: /* shift */
            /* case 37: */
            /* left arrow */
            /* case 39: */
            /* right arrow */
            /* case 46: */
            /* delete - not supporting as in netscape it's char code is same as '.'*/
            return true;
        default:
            break;
    }
    /* allow A - F */
    if (charUniCode >= 97 && charUniCode <= 122) 
        return true;
    /* allow A - F */
    if (charUniCode >= 65 && charUniCode <= 90) 
        return true;
    /* allow space */
    if (charUniCode == 32){
        return true;
    }
    /* allow back space */
    if (charUniCode < 48 || charUniCode > 57) 
        return false;
    
    return true;
}

/**
 * validates Domain name
 * @method validateDomainName
 * @param domainNameObj - domain name onject
 * @param errorPrefix - error prefix
 */
function validateDomainName(domainNameObj, errorPrefix){
    if (!domainNameObj || domainNameObj.disabled) 
        return true;
    var DomainName = domainNameObj.value;
    var errorFlag = false;
    var errorMsg = ""
    if (errorPrefix) 
        ;
    errorMsg = errorPrefix + " ";
    if (DomainName == "") {
        errorMsg += VALID_DOMAINNAME;
        errorFlag = true;
    }
    /* Check to allow a - z, A-Z, 0-9, .(dot) and -(hyphen) only */
    if (!errorFlag) {
        for (i = 0; i < DomainName.length; i++) {
            if ((DomainName.charCodeAt(i) >= 97 && DomainName.charCodeAt(i) <= 122)  ||(DomainName.charCodeAt(i) >= 65 && DomainName.charCodeAt(i) <= 90)|| (DomainName.charCodeAt(i) >= 48 && DomainName.charCodeAt(i) <= 57) || DomainName.charAt(i) == "." || DomainName.charAt(i) == "-") 
                errorFlag = false;
            else {
                errorMsg += ONLY_CHARACTERS_ALLOWED_DOMAIN;
                errorFlag = true;
                break;
            }
        }
    }
    
    /* Other Check */
    if (!errorFlag) {
        if (DomainName.length > 253) {
            errorMsg += DOMAIN_NAME_LENGHT;
            errorFlag = true;
        }
        else 
            if (DomainName.charAt(0) == "-" || DomainName.charAt(0) == ".") {
                errorMsg += DOMAIN_NAME_NOT_START;
                errorFlag = true;
            }
            else 
                if (DomainName.charAt(DomainName.length - 1) == "-" || DomainName.charAt(DomainName.length - 1) == ".") {
                    errorMsg += DOMAIN_NAME_NOT_END;
                    errorFlag = true;
                }
                else 
                    if (DomainName.indexOf(".") != -1) {
                        var lblsArray = DomainName.split(".");
                        for (i = 0; i < lblsArray.length; i++) 
                            if (lblsArray[i].length == 0) {
                                errorMsg += EMPTY_LABLE;
                                errorFlag = true;
                                break;
                            }
                            else 
                                if (lblsArray[i].length > 63) {
                                    errorMsg += LABLE_LENGTH;
                                    errorFlag = true;
                                    break;
                                }
                    }
    }
    
    if (errorFlag) {
        alert(errorMsg);
        domainNameObj.focus();
        return false;
    }
    return true;
}
var domainNameExt = new Array('.com', '.net', '.aero', '.asia', '.cat', '.jobs', '.org', '.biz', '.coop', '.info', '.museum', '.name', '.pro', '.tel', '.travel', '.edu', '.gov', '.int', '.mil', '.mobi', '.ac', '.ad', '.ae', '.af', '.ag', '.ai', '.al', '.am', '.an', '.ao', '.aq', '.ar', '.as', '.at', '.au', '.aw', '.ax', '.az', '.ba', '.bb', '.bd', '.be', '.bf', '.bg', '.bh', '.bi', '.bj', '.bm', '.bn', '.bo', '.br', '.bs', '.bt', '.bv', '.bw', '.by', '.bz', '.ca', '.cc', '.cd', '.cf', '.cg', '.ch', '.ci', '.ck', '.cl', '.cm', '.cn', '.co', '.cr', '.cu', '.cv', '.cx', '.cy', '.cz', '.de', '.dj', '.dk', '.dm', '.do', '.dz', '.ec', '.ee', '.eg', '.er', '.es', '.et', '.eu', '.fi', '.fj', '.fk', '.fm', '.fo', '.fr', '.ga', '.gb', '.gd', '.ge', '.gf', '.gg', '.gh', '.gi', '.gl', '.gm', '.gn', '.gp', '.gq', '.gr', '.gs', '.gt', '.gu', '.gw', '.gy', '.hk', '.hm', '.hn', '.hr', '.ht', '.hu', '.id', '.ie', '.il', '.im', '.in', '.io', '.iq', '.ir', '.is', '.it', '.je', '.jm', '.jo', '.jp', '.ke', '.kg', '.kh', '.ki', '.km', '.kn', '.kp', '.kr', '.kw', '.ky', '.kz', '.la', '.lb', '.lc', '.li', '.lk', '.lr', '.ls', '.lt', '.lu', '.lv', '.ly', '.ma', '.mc', '.md', '.me', '.mg', '.mh', '.mk', '.ml', '.mm', '.mn', '.mo', '.mp', '.mq', '.mr', '.ms', '.mt', '.mu', '.mv', '.mw', '.mx', '.my', '.mz', '.na', '.nc', '.ne', '.nf', '.ng', '.ni', '.nl', '.no', '.np', '.nr', '.nu', '.nz', '.om', '.pa', '.pe', '.pf', '.pg', '.ph', '.pk', '.pl', '.pm', '.pn', '.pr', '.ps', '.pt', '.pw', '.py', '.qa', '.re', '.ro', '.rw', '.ru', '.sa', '.sb', '.sc', '.sd', '.se', '.sg', '.sh', '.si', '.sj', '.sk', '.sl', '.sm', '.sn', '.so', '.sr', '.st', '.sv', '.sy', '.sz', '.tc', '.td', '.tf', '.tg', '.th', '.tj', '.tk', '.tm', '.tn', '.to', '.tp', '.tr', '.tt', '.tv', '.tw', '.tz', '.ua', '.ug', '.uk', '.um', '.us', '.uy', '.uz', '.va', '.vc', '.ve', '.vg', '.vi', '.vn', '.vu', '.ws', '.wf', '.ye', '.yt', '.yu', '.za', '.zm', '.zw');
/**
 * IP address or Domain name Validation
 * @method ipaddrDomainValidate
 * @param ipMode [v4 orv6]
 */
function ipaddrDomainValidate(ipAddr,ipMode){
    var lastOctateVal = 0;
    var ipAddrObj = document.getElementById(ipAddr);
    if (!ipAddrObj || ipAddrObj.disabled) 
        return true;
  ipAddrObjArr = (ipAddrObj.value).split(".");
    if(ipMode == "1"){
      if (ipAddrObjArr.length == 1) {
            alert("Invalid IP Address/Domain name. Please enter a valid IP Address/Domain name.");
            ipAddrObj.focus();
            return false;
        }
    }
    else if(ipMode == "2"){
       //if(ipAddrObj.value == "" || ipAddrObj.value == ''){
      if(ipAddrObj.value == "" || ipAddrObj.value == '' ||  (ipAddrObjArr.length == 1 && ipAddrObj.value.search(":") == -1)){
          alert("Invalid IP Address/Domain name. Please enter a valid IP Address/Domain name.");
          ipAddrObj.focus();
          return false;
        }
    }
    if (ipAddrObjArr.length) {
        lastOctateVal = ipAddrObjArr[ipAddrObjArr.length - 1];
    } 
  if(ipMode == "1"){
    if (!isNaN(lastOctateVal)) {
        if (ipv4AddrValidate(ipAddrObj, 'IP', false, true, 'Invalid IP address.', 'for octet ', true) == false) {
            ipAddrObj.focus();
            return false;
        }
      }
    else{
      if (domainNameVaidation(lastOctateVal,ipAddrObjArr,ipAddrObj,ipAddr) == false) 
          return false;
    }
  }  
  else if(ipMode == "2"){
      if (ipAddrObj.value.search(":") != -1)
      {
        if (ipv6AddrValidate(ipAddrObj, false, true, '') == false) {
            ipAddrObj.focus();
            return false;
        }
      }
      else {
        if (domainNameVaidation(lastOctateVal,ipAddrObjArr,ipAddrObj,ipAddr) == false) 
            return false;
    }
  }
}
/**
 * @method domainNameVaidation
 * @param lastOctateVal 
 * @param ipAddrObjArr 
 * @param ipAddrObj 
 * @param ipAddr 
 */
function domainNameVaidation(lastOctateVal,ipAddrObjArr,ipAddrObj,ipAddr){
  if (checkDomainExtension(lastOctateVal) == false) {
      alert("Please enter a valid domain name extension.");
      return false;
  }
  if (ipAddrObj.value.length > 253 || ipAddrObj.value.length < 1) {
      alert("The domain cannot be bigger than 253 or less than 1 characters");
      return false;
  }
  if (checkEachNodeLength(ipAddrObjArr) == false) 
      return false;
  if (checkHostName(ipAddr, true, 'Invalid IP Address/Domain name: ', false) == false) 
      return false;
  return true;
}
/*
 function: checkEachNodeLength
 parameters: Array of nodes in a domain name.
 purpose : Checks is number of characters in a node of a domain exceeds 63 characters.
 return : true or false;
 */
function checkEachNodeLength(nodeArray){
    for (var i = 0; i <= nodeArray.length - 1; i++) {
        var node = nodeArray[i];
        if (node.length > 63) {
            alert("Each node in the domain can only be 63 characters long.")
            return false;
        }
    }
    return true;
}

/*
 function: checkDomainExtension
 parameters: last octate value of domain name.
 purpose : checks if the extension falls in the specified domains.
 return : true or false;
 */
function checkDomainExtension(lastOctateVal){
    var ext = "." + lastOctateVal;
    for (var i = 0; i <= domainNameExt.length - 1; i++) {
        if (ext == domainNameExt[i]) 
            return true;
    }
    return false;
}
