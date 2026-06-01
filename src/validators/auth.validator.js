const loginValidator = {
  validate: body => {
    const errors = [];

    if (!body.schoolCode) errors.push({message: 'schoolCode is required'});
    if (!body.role) errors.push({message: 'role is required'});
    if (!body.loginId) errors.push({message: 'loginId is required'});
    if (!body.password) errors.push({message: 'password is required'});

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
  loginValidator,
};