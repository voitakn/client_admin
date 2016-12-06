Ext.define('ADM.store.ThemeFolders', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.theme-folders',
    fields: [
        {name: 'folder'}
    ],
    /*requires: [
        "Erp.model.PageTree"
    ],
    model: "Erp.model.PageTree",
    parentIdProperty: 'parent_id',
    defaultRootId: 'data',
    defaultRootProperty: 'data',*/
    //defaultRootProperty: 'data',
    autoLoad: false,
    root: {
        expanded: true,
        folder: 'Содержимое'
    },
    proxy: {
        type: 'ajax',
        api: {
            read: ''
        },
        reader: {
            type: 'json',
            rootProperty: function(data) {
                return data.data;
            }
        }
    }
});