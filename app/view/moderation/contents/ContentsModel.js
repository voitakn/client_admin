Ext.define('ADM.view.moderation.contents.ContentsModel', {
    extend: 'Base.app.ModuleModel',
    alias: 'viewmodel.modercontent',

    view: 'view-modercontent',

    requires: [
        'ADM.store.ModerContents',
        'ADM.store.Comments'
    ],

    data: {},

    stores: {

        moderContents: {
            type: 'moderContents',
            autoLoad: true,
            listeners: {
                load: 'onSelectFirstRecord'
            }
        },

        comments: {
            type: 'comments',
            autoLoad: true
        }

    }

});
