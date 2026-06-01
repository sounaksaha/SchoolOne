const studentValidator = {
  validate: body => {
    const errors = [];

    if (!body.schoolCode) errors.push({message: 'schoolCode is required'});
    if (!body.studentName) errors.push({message: 'studentName is required'});
    if (!body.className) errors.push({message: 'className is required'});
    if (!body.section) errors.push({message: 'section is required'});

    if (!body.parent?.name) {
      errors.push({message: 'parent.name is required'});
    }

    if (!body.parent?.phone) {
      errors.push({message: 'parent.phone is required'});
    }

    if (body.createParentLogin) {
      if (!body.parentLogin?.loginId) {
        errors.push({message: 'parentLogin.loginId is required'});
      }

      if (!body.parentLogin?.password) {
        errors.push({message: 'parentLogin.password is required'});
      }
    }

    if (body.createStudentLogin) {
      if (!body.studentLogin?.loginId) {
        errors.push({message: 'studentLogin.loginId is required'});
      }

      if (!body.studentLogin?.password) {
        errors.push({message: 'studentLogin.password is required'});
      }
    }

    return {
      error: errors.length
        ? {
            details: errors,
          }
        : null,
      value: body,
    };
  },
};

module.exports = {
  studentValidator,
};