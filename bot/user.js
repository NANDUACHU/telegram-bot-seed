module.exports = {

    user: null,

    set: function(response) {
        this.user = response.from;
        this.user.chatID = response.chat.id;

        if (response.chat.title)
            this.user.groupTitle = response.chat.title;
    },

    is: function() {
        return this.user !== null;
    },

    get: function() {
        return this.user;
    }
}
