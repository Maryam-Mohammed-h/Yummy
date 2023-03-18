export class FormValidation {
  constructor() {
    let userNameValidate = false;
    let userEmailValidate = false;
    let userPhoneValidate = false;
    let userAgeValidate = false;
    let userPasswordValidate = false;
    let userRepasswordValidate = false;
  }
  enableDisableSubmit(validateDone) {
    if (
      validateDone == false ||
      this.userEmailValidate == false ||
      this.userNameValidate == false ||
      this.userPhoneValidate == false ||
      this.userAgeValidate == false ||
      this.userPasswordValidate == false ||
      this.userRepasswordValidate == false
    ) {
      $("#contactSubmitBtn").attr("disabled", true);
    } else if (
      this.userEmailValidate == true &&
      this.userNameValidate == true &&
      this.userPhoneValidate == true &&
      this.userAgeValidate == true &&
      this.userPasswordValidate == true &&
      this.userRepasswordValidate == true
    ) {
      $("#contactSubmitBtn").removeAttr("disabled");
    }
  }
  validateName(name) {
    let pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]/;
    const regexp = new RegExp(pattern);
    let result = regexp.test(name);
    if (name == "") {
      result = true;
    }
    if (result == false) {
      this.userNameValidate = true;
      this.enableDisableSubmit(!result);
    } else {
      this.userNameValidate = false;
      this.enableDisableSubmit(result);
    }

    return result;
  }
  validateEmail(email) {
    let pattern = /^\S+@\S+\.\S+$/;
    const regexp = new RegExp(pattern);
    let result = regexp.test(email);
    if (email == "") {
      result = false;
    }
    if (result == true) {
      this.userEmailValidate = true;
      this.enableDisableSubmit(result);
    } else {
      this.userEmailValidate = false;
      this.enableDisableSubmit(result);
    }
    return result;
  }
  validatePhone(phone) {
    let pattern = /^01[0-2,5][0-9]{8}$/;
    const regexp = new RegExp(pattern);
    let result = regexp.test(phone);
    if (phone == "") {
      result = false;
    }
    if (result == true) {
      this.userPhoneValidate = true;
      this.enableDisableSubmit(result);
    } else {
      this.userPhoneValidate = false;
      this.enableDisableSubmit(result);
    }
    return result;
  }
  validateAge(age) {
    let pattern = /([1-9]|[1-9][0-9]|100)/;
    const regexp = new RegExp(pattern);
    let result = regexp.test(age);
    if (age == "") {
      result = false;
    }
    if (result == true) {
      this.userAgeValidate = true;
      this.enableDisableSubmit(result);
    } else {
      this.userAgeValidate = false;
      this.enableDisableSubmit(result);
    }
    return result;
  }
  validatePassword(password) {
    let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const regexp = new RegExp(pattern);
    let result = regexp.test(password);
    if (password == "") {
      result = false;
    }
    if (result == true) {
      this.userPasswordValidate = true;
      this.enableDisableSubmit(result);
    } else {
      this.userPasswordValidate = false;
      this.enableDisableSubmit(result);
    }
    return result;
  }

  validateRepassword(repassword) {
    let password = $("#userPassword").val();
    let result = false;
    if (repassword == "" || password != repassword) {
      result = false;
    } else {
      result = true;
    }
    if (result == true) {
      this.userRepasswordValidate = true;
      this.enableDisableSubmit(result);
    } else {
      this.userRepasswordValidate = false;
      this.enableDisableSubmit(result);
    }
    return result;
  }
  validateForm(targetInput, value) {
    if (targetInput == "userName") {
      this.validateName(value);
    } else if (targetInput == "userEmail") {
      this.validateEmail(value);
    } else if (targetInput == "userPhone") {
      this.validatePhone(value);
    } else if (targetInput == "userAge") {
      this.validateAge(value);
    } else if (targetInput == "userPassword") {
      this.validatePassword(value);
    } else if (targetInput == "userRepassword") {
      this.validateRepassword(value);
    }
    this.enableDisableSubmit();
  }
}
