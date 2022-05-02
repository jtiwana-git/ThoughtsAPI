const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema (
    {
        thoughtText: { type: String, required: true, min_length: 1, max_length: 250 },
        createAt: {
            type: Date,
            default: Date.now,
            get: (createdAtDate) => moment(createdAtDate).format('DD MMM, YYYY [at] hh:mm a'),
        },
        username: { type: String, required: true },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    })

    thoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
    });
    

const Thought = model('Thought', thoughtSchema);

module.exports = Thought; 
