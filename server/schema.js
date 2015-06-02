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
        },
        '/user/debateHistory': {
            type: "object",
            properties: {
                competitionID: {type: "string"},
                phase: {type: "number"},
                speakerPoints: {type: "array"},
                teamPoints: {type: "array"}
            },
            additionalProperties: true,
            required: ["competitionID", "phase", "speakerPoints", "teamPoints"]
        }
    }
};