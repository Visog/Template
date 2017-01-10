$(document).ready(function() {
    $('#defaultForm').formValidation({
        message: 'This value is not valid',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            Resumeheadline: {
                validators: {
                    notEmpty: {},
                }
            },
			Currentlocation: {
                validators: {
                    notEmpty: {},
                }
            },
			Preferredlocation: {
                validators: {
                    notEmpty: {},
                }
            },
			Domain: {
                validators: {
                    notEmpty: {},
                }
            },
            Company: {
                validators: {
                    notEmpty: {},
                }
            },
			Companyinotlisted: {
                validators: {
                    notEmpty: {},
                }
            },
			Addressline: {
                validators: {
                    notEmpty: {},
                }
            },
			Checkbox: {
                validators: {
                    notEmpty: {},
                }
            },
			Uploadresume: {
                validators: {
                    notEmpty: {},
                }
            },
        }
    });
});