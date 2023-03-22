function handleServerError(res, error) {
    let message = error;
    if (error instanceof Error) {
        message = {
            type: error.name,
            message: error.message,
        };
    }
    return res.status(500).json({ error: message });
}

module.exports = { handleServerError };
