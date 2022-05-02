const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    getSingleUserAndPopulated,
    getCreateUser,
    getUpdateUser,
    getDeleteUser,
    getAddFriend,
    getRemoveFriend
} = require('../../controllers/userControllers')

// /api/users
router.route('/').get(getUsers, getSingleUser).post(getCreateUser)

// /api/:usersId
router.route('/:userId').put(getUpdateUser).delete(getDeleteUser)

router.route('/:userId').put(getSingleUserAndPopulated)

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').put(getAddFriend).delete(getRemoveFriend)



module.exports = router;



module.exports = router;