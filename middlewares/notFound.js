function notFound(req, res, next) {

    console.log('Middleware notFound status:404');

    res.status(404).json({

        status: '404',
        error: 'Not Found',
        mesage: 'Page not found'
    });
}

module.exports = notFound;