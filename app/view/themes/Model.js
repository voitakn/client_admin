Ext.define('ADM.view.themes.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.themes',

    view: 'themes',
    data: {
        title: 'Темы',
        role_id: 0,
        record: {}
    },
    requires: [
        'ADM.model.Theme',
        'ADM.store.ThemeFolders'
    ],
    stores: {
        themes: {
            extend: 'Ext.data.Store',
            model: 'ADM.model.Theme',
            autoLoad: true
        },
        folders: {
            type: 'theme-folders',
            autoLoad: false
        }
    },
    formulas: {}
});
