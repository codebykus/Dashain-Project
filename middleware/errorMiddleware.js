const sendDevError = (err, res) => {
    console.error("ERROR 💥", err);
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendProdError = (err, res) => {
    // Operational errors (known errors with proper messages)
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    // Programming or unknown errors
    console.error("ERROR 💥", err); // Log the error for developers
    return res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
    });
};

const errorHandler = (err, req, res, next) => {
    console.log("From global error handler middleware");

    // Setting default values for missing error properties
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === "development") {
        sendDevError(err, res);
    } else if (process.env.NODE_ENV === "production") {
        sendProdError(err, res);
    }
};

module.exports = errorHandler;
