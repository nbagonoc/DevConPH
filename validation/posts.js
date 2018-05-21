const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data){
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    if(!validator.isLength(data.text,{min: 10, max:300})){
        errors.text = 'Post must be 10 - 300 characters'
    }
    if(validator.isEmpty(data.text)){
        errors.text = 'Text is empty'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}