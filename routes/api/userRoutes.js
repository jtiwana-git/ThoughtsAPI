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
router.route('/').get(getUsers).post(getCreateUser)

// /api/users/:usersId
router.route('/:userId').put(getUpdateUser).delete(getDeleteUser).get(getSingleUser)

router.route('/:userId').put(getSingleUserAndPopulated)

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').put(getAddFriend).delete(getRemoveFriend)



module.exports = router;



module.exports = router;