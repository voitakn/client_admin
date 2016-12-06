Ext.define('ADM.model.Nomination', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'annotation',
        type: 'string'
    },{
        name: 'author',
        type: 'string'
    },{
        name: 'award_book_type',
        type: 'int'
    },{
        name: 'book_id',
        type: 'int'
    },{
        name: 'book_name',
        type: 'string'
    },{
        name: 'created',
        type: 'date'
    },{
        name: 'email',
        type: 'string'
    },{
        name: 'genre',
        type: 'int'
    },{
        name: 'isbn',
        type: 'string'
    },{
        name: 'last_public_epub_id',
        type: 'int'
    },{
        name: 'lastname',
        type: 'string'
    },{
        name: 'member_literary_association',
        type: 'string'
    },{
        name: 'member_writers_union',
        type: 'string'
    },{
        name: 'name',
        type: 'string'
    },{
        name: 'name_nominator',
        type: 'string'
    },{
        name: 'name_publisher',
        type: 'string'
    },{
        name: 'nomination',
        type: 'int'
    },{
        name: 'number_bbk',
        type: 'string'
    },{
        name: 'number_udk',
        type: 'string'
    },{
        name: 'phone',
        type: 'string'
    },{
        name: 'preview',
        type: 'string'
    },{
        name: 'reject_msg',
        type: 'string'
    },{
        name: 'smi',
        type: 'string'
    },{
        name: 'status',
        type: 'int'
    },{
        name: 'synopsis',
        type: 'string'
    },{
        name: 'year',
        type: 'int'
    }],
    proxy: {
        type: 'ajax',
        api: {

            read: '/node/api-gm/nominations/books',
            update: '/node/api-gm/nominations/update_status'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.awards',
            totalProperty: 'data.total',
            messageProperty: 'error',
            successProperty: 'success'
        },
        writer: {
            writer: 'json',
            writeAllFields: true
        },
        actionMethods: {
            read: 'GET',
            update: 'POST'
        }
    }
});