const teacherStaffValidator = {
  validate: body => {
    const errors = [];

    if (!body.schoolCode) errors.push({message: 'schoolCode is required'});
    if (!body.name) errors.push({message: 'name is required'});
    if (!body.roleType) errors.push({message: 'roleType is required'});
    if (!body.phone) errors.push({message: 'phone is required'});

    if (body.appLoginEnabled) {
      if (!body.login?.loginId) {
        errors.push({message: 'login.loginId is required'});
      }

      if (!body.login?.password) {
        errors.push({message: 'login.password is required'});
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
  teacherStaffValidator,
};