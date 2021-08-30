module.exports = {
    userNormalizator: (userToNormalize) => {
        const fileldsToRemove = [
            'password',
            '__v'
        ];

        userToNormalize = userToNormalize.toJSON;
        fileldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    }
};
