Ext.define('ADM.view.books.BooksModel', {
    extend: 'Base.app.ModuleModel',
    alias: 'viewmodel.books-books',

    data: {
        name: 'Книги'
    },

    requires: [
        'ADM.store.BookTags',
        'ADM.store.BookStatuses',
        'ADM.store.Themes',
        'ADM.store.Books',
        'ADM.store.Users',
        'ADM.store.Tags'
    ],

    stores: {

        books: {
            type: 'books',
            autoLoad: true,
            listeners: {
                load: 'onSelectFirstRecord'
            }
        },

        users: {
            type: 'users',
            autoLoad: true
        },

        bookStatuses: {
            type: 'bookStatuses',
            autoLoad: true
        },

        themes:  {
            type: 'themes',
            autoLoad: true
        },

        tags: {
            type: 'tags',
            autoLoad: true
        },

        bookTags: {
            type: 'bookTags'
        }

    }

});
