exports.successResponse = (res, data, message = 'Success', pagination ) => {
    const response = {
        success: true,
        message, 
        data,
    };
    if (pagination) {
        response.pagination = pagination;
    }

    return res.status(200).json(response);
}

exports.errorResponse = (res, error, statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
         message: error.message || 'Internal Server Error',
    })
}