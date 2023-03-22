function setHeaders(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Contol-Allow-Headers",
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization"
    );

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    next();
}

module.exports = { setHeaders };
