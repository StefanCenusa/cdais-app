var ErrorHandler = function () {

    this.errMsg = {
        1001: {
            code: 1001,
            message: "Invalid or insufficient parameters!"
        },
        1002: {
            code: 1002,
            message: "Database error!"
        },
        1003: {
            code: 1003,
            message: "Failed to perform requested method!"
        }
    };

    this.extract_error = function (tv4error) {
        return {
            code: 1001,
            message: tv4error.message,
            dataPath: tv4error.dataPath,
            schemaPath: tv4error.schemaPath
        }
    }
};

var INSTANCE = new ErrorHandler();
module.exports = INSTANCE;