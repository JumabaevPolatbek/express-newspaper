module.exports=(error)=>{
    if (error.name === 'SequelizeValidationError') {
      // Handle validation errors
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      console.log('Validation errors:', validationErrors);
      return {
        message: 'Validation errors',
        errors: validationErrors,
        statusCode: 400,
      };
    } else {
      // Handle other errors
      console.error('Error:', error);
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  }