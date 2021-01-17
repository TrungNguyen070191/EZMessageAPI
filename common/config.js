var config = {
    server: {
        hostName: '127.0.0.1',
        port: '3000'
    },
    jwtToken: {
        key: 'JWT',
        secret: 'RESTFULAPIs',
        expires: 20
    }
};

module.exports = config;