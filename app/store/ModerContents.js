Ext.define('ADM.store.ModerContents', {
    extend: 'Ext.data.Store',
    alias: 'store.moderContents',
    requires: [
        'ADM.model.ModerContent'
    ],
    model: 'ADM.model.ModerContent',
    sorters: [{
        property: 'comment_status',
        direction: 'ASC'
    },{
        property: 'create_time',
        direction: 'ASC'
    }]
});