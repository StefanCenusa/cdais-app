module.exports = {
    POST: {
        '/competitions': {
            type: "object",
            properties: {
                name: {type: "string"},
                organiser: {type: "string"},
                location: {type: "string"},
                dataStart: {type: "number"},
                dataEnd: {type: "number"},
                registrationStart: {type: "number"},
                registrationEnd: {type: "number"}
            },
            additionalProperties: true,
            required: ["name", "location", "organiser", "dateStart", "dateEnd"]
        }
    }
};