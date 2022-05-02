const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema (
    {
        reactionId: { type: Schema.Types.ObjectId },
        reactionBody: { type: String, required: true, maxlength: 280 },
        username: { type: String, required: true },
        createAt: {
            type: Date,
            default: Date.now,
            get: (createdAtDate) => moment(createdAtDate).format('DD MMM, YYYY [at] hh:mm a'),
        }
    },
        {
        toJSON: {
            getters: true,
        },
    
    id: false,
});
    
module.exports = reactionSchema;