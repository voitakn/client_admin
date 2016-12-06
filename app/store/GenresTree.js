Ext.define('ADM.store.GenresTree', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.genres_tree',
    requires: [
        'ADM.model.GenreTree'
    ],
    model: 'ADM.model.GenreTree',
    parentIdProperty: 'parent_genre_id',
    defaultRootId: 'data',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            reader: '/node/admin/genres',
            create: '/node/admin/genres'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});