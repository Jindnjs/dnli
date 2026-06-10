(function($){
    $.fn.validLanguage = function(){
    };
    $.validLanguage = {
        newLang: function(){
            $.validLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": cmMsg.valid.required_text,
                    "alertTextCheckboxMultiple": cmMsg.valid.required_radio,
                    "alertTextCheckboxe": cmMsg.valid.required_check,
                    "alertSelect": cmMsg.valid.required_select,
                    "alertUpload": cmMsg.valid.required_upload,
                    "alertTextDateRange": "* Both date range fields are required"
                },
                 "requiredFile": { // Add your regex rules here, you can take telephone as an example
                    "alertUpload": cmMsg.valid.required_upload,
                },
                "requiredInFunction": {
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Field must equal test"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "",
                    "alertText2": cmMsg.valid.dateRange
                },
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "* Invalid ",
                    "alertText2": "Date Time Range"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": cmMsg.valid.min,
                    "alertText2": cmMsg.valid.minSize
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": cmMsg.valid.max,
                    "alertText2": cmMsg.valid.maxSize
                },
				"maxByteSize": {
                    "regex": "none",
                    "alertText": cmMsg.valid.maxByteSize1,
                    "alertText2": cmMsg.valid.maxByteSize2,
					"alertText3": cmMsg.valid.maxByteSize3
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": cmMsg.valid.groupRequired_text,
                    "alertTextCheckboxe": "* This checkbox is required"
                },
				"caseRequired": {
                    "regex": "none",
                    "alertText": cmMsg.valid.required_text,
                    "alertTextCheckboxMultiple": cmMsg.valid.required_radio,
                    "alertTextCheckboxe": cmMsg.valid.required_check,
                    "alertSelect": cmMsg.valid.required_select,
                    "alertUpload": cmMsg.valid.required_upload,
                },
                "length": {
                    "regex": "none",
                    "alertText": "자리 입니다. ",
                },
                "min": {
                    "regex": "none",
                    "alertText": cmMsg.valid.minValue,
                    "alertText2" : cmMsg.valid.minValue2
                },
                "max": {
                    "regex": "none",
                    "alertText": cmMsg.valid.maxValue,
                    "alertText2" : cmMsg.valid.maxValue2
                },
                "past": {
                    "regex": "none",
                    "alertText": "* Date prior to "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* Date past "
                },
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": cmMsg.valid.maxCheckbox1,
                    "alertText2": cmMsg.valid.maxCheckbox2
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": cmMsg.valid.minCheckbox1,
                    "alertText2": cmMsg.valid.minCheckbox2
                },
                "equals": {
                    "regex": "none",
                    "alertText": cmMsg.valid.equals
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* Invalid credit card number"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": cmRegex.phone,
                    "alertText": cmMsg.valid.phone
                },
                "email": {
                    // HTML5 compatible email regex ( http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#    e-mail-state-%28type=email%29 )
                    "regex": cmRegex.email,
                    "alertText": cmMsg.valid.email
                },
                "integer": {
                    "regex": cmRegex.integer,
                    "alertText": cmMsg.valid.integer
                },
                "id": {
                    "regex": cmRegex.id,
                    "alertText": cmMsg.valid.id
                },
                "pwd": {
                    "regex": cmRegex.pwd,
                    "alertText": cmMsg.valid.pwd
                },
                "nick": {
                    "regex": cmRegex.nick,
                    "alertText": cmMsg.valid.nick
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": cmRegex.number,
                    "alertText": cmMsg.valid.number
                },
                "date": {
                    //	Check if date is valid by leap year
					"func": function (field) {
							var pattern = new RegExp(cmRegex.date);
							var match = pattern.exec(field.val());
							if (match == null)
							   return false;

							var year = match[3];
							var month = match[2]*1;
							var day = match[1]*1;
							var date = new Date(year, month - 1, day); // because months starts from 0.

							return (date.getFullYear() == year && date.getMonth() == (month - 1) && date.getDate() == day);
						},
					 "alertText": cmMsg.valid.date
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* Invalid IP address"
                },
                "langCheck": {
                    "regex": /^[a-z]{2}_[A-Z]{2}$/,
                    "alertText": cmMsg.valid.langCheck
                },
                "url": {
                    "regex": cmRegex.url,
                    "alertText": cmMsg.valid.url
                },
                "onlyNumberSp": {
                    "regex": cmRegex.onlyNumber,
                    "alertText": cmMsg.valid.onlyNumber
                },
                "onlyLetterSp": {
                    "regex": cmRegex.onlyLetter,
                    "alertText": cmMsg.valid.onlyLetter
                },
                "onlyLetterNumber": {
                    "regex": cmRegex.onlyLetterNumber,
                    "alertText": cmMsg.valid.onlyLetterNumber
                },
                "onlyLetterCommaNumber": {
                    "regex": cmRegex.onlyLetterCommaNumber,
                    "alertText": cmMsg.valid.onlyLetterCommaNumber
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
				"ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* This username is available",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* This name is already taken",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* This name is available",
                    // speaks by itself
                    "alertTextLoad": "* Validating, please wait"
                },
				 "ajaxNameCallPhp": {
	                    // remote json service location
	                    "url": "phpajax/ajaxValidateFieldName.php",
	                    // error
	                    "alertText": "* This name is already taken",
	                    // speaks by itself
	                    "alertTextLoad": "* Validating, please wait"
	                },
                "validate2fields": {
                    "alertText": "* Please input HELLO"
                },
	            //tls warning:homegrown not fielded
                "dateFormat":{
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "* Invalid Date"
                },
                //tls warning:homegrown not fielded
				"dateTimeFormat": {
	                "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "* Invalid Date or Date Format",
                    "alertText2": "Expected Format: ",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM or ",
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
	            },
	            "decimal" : {
	            	 "regex": "^\\d{0,10}(?:[.]\\d{0,2})?$",
	            	 "alertText": cmMsg.valid.decimal
	            },
	            "decimalRt" : {
	            	 "regex": "^\\d{0,3}(?:[.]\\d{0,2})?$",
	            	 "alertText": cmMsg.valid.decimalRt
	            }
            };

        }
    };

    $.validLanguage.newLang();

})(jQuery);

