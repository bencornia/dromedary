const { isValidObjectId } = require("mongoose");

function validateObjectId(req, res, next) {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        // Bad request: Invalid id
        return res
            .status(400)
            .json({ message: `ID: ${id} is not valid object-id.` });
    }

    next();
}

module.exports = { validateObjectId };
