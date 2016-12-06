Ext.define('ADM.view.moderation.books.BooksModel', {
    extend: 'Base.app.ModuleModel',
    alias: 'viewmodel.moderbook',

    requires: [
        'ADM.store.ModerBooks',
        'ADM.store.Users'
    ],


    data: {
        record: {}
    },

    stores: {

        moderBooks: {
            type: 'moderBooks',
            autoLoad: true
        },

        users: {
            type: 'users',
            autoLoad: true
        }

    },

    formulas: {
        buttonHidden: {
            get: function (get) {
                var publicAccess = get('record.public_access');
                var epub = get('record.last_public_epub_id');
                return !(publicAccess != 3 && epub);
            }
        }
    }
});
