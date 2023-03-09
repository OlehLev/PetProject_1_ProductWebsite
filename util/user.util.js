module.exports = {
    userNormalizator: (userToNormolize) => {
        const filedsToRemove = ["password"];

        filedsToRemove.forEach(filed => {
            delete userToNormolize[filed];
        });

        return userToNormolize;
    }
};
