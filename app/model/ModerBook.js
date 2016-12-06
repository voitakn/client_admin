Ext.define('ADM.model.ModerBook', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'check_epub',
        type: 'boolean'
    },{
        name: 'book_uid',
        type: 'int'
    },{
        name: 'last_epub_access',
        type: 'int'
    },{
        name: 'name',
        type: 'string'
    },{
        name: 'author',
        type: 'string'
    },{
        name: 'lang',
        type: 'string'
    },{
        name: 'approved',
        type: 'int'
    },{
        name: 'publication_date',
        type: 'date',
        convert: function(value) {
            if (!value) {
                return '';
            }
            var date = new Date(value);
            return Ext.Date.format(date, 'Y-m-d h:i');
        }
    },{
        name: 'recommended',
        type: 'boolean'
    },{
        name: 'best',
        type: 'boolean'
    },{
        name: 'tags',
        type: 'string'
    },{
        name: 'preview',
        type: 'string'
    },{
        name: 'time',
        type: 'int'
    },{
        name: 'price',
        type: 'string'
    },{
        name: 'book_year',
        type: 'date'
    },{
        name: 'active_theme_uid',
        type: 'string'
    },{
        name: 'genres',
        type: 'string'
    },{
        name: 'epub_id',
        type: 'int'
    },{
        name: 'last_epub_id',
        type: 'int'
    },{
        name: 'last_epub_reason',
        type: 'string'
    },{
        name: 'last_public_epub_reason',
        type: 'string'
    },{
        name: 'login',
        type: 'string'
    },{
        name: 'public_access',
        type: 'string'
    },{
        name: 'rating',
        type: 'string'
    }],
    proxy: {
        type: 'ajax',
        extraParams: {
            except_new: 1
        },
        actionMethods: {
            read: 'GET'
        },
        api: {
            read: '/node/admin/books/new'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.books',
            totalProperty: 'data.total',
            messageProperty: 'error',
            successProperty: 'success'
        },
        writer: {
            writer: 'json',
            nameProperty: 'name',
            writeAllFields: true
        }
    }
});
