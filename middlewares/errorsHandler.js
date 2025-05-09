function errorsHandler(err, req, res, next) {

    console.log('Middleware errorsHandler status:500')

    res.status(500).json({

        status: '500',
        error: err.name,
        message: err.message
    });
}

module.exports = errorsHandler;