const { User, Thought } = require ('../models');

const thoughtControllers = {
    getThought(req, res) {
    // GET ALL THOUGHTS
        Thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
      },
    //   GET SINGLE THOUGHTS
      getSingleThought(req, res) {
        Thought.findOne({ _id: req.params._id })
        .select()
              .then((thought) =>
               !thought
        ? res.status(404).json({ message: 'No thoughts with that ID' })
        : res.json(thought)
              )
              .catch((err) => res.status(500).json(err));
     },
    //  CREATE THOUGHT
       getCreateThought({ params, body }, res) {
          Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { userId: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
     },

    //   UPDATE THOUGHT
      getUpdateThought(req, res) {
        Thought.findOneAndUpdate ({_id: req.params._id})
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
      },
    //   DELETE THOUGHT
      getDeleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    



// End of module.exports
}

module.exports = thoughtControllers;