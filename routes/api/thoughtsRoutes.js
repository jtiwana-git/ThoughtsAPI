const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    getUpdateThought,
    getDeleteThought,
    getCreateThought
} = require('../../controllers/thoughtControllers')

// /api/thoughts
router.route('/').get(getThought).post(getCreateThought)

router.route('/:id').get(getSingleThought).put(getUpdateThought).delete(getDeleteThought)

// /api/thoughts/:id/reaction -POST

// /api/thoughts/:id/reaction/:reactionId - DELETE


module.exports = router