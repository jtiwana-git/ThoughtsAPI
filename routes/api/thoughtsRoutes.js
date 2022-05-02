const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    getUpdateThought,
    getDeleteThought,
    getCreateThought,
    getAddReaction,
    getDeleteReaction
} = require('../../controllers/thoughtControllers')

// /api/thoughts
router.route('/').get(getThought).post(getCreateThought)

router.route('/:id').get(getSingleThought).put(getUpdateThought).delete(getDeleteThought)

// /api/thoughts/:id/reaction -POST
router.route('/:id/reaction').post(getAddReaction)

// /api/thoughts/:id/reaction/:reactionId - DELETE
router.route('/:id/reaction/:reactionId').delete(getDeleteReaction);

module.exports = router