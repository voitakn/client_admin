Ext.define('ADM.view.genres.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.genres',
    view: 'genres',
    requires: [
        'ADM.store.GenresTree'
    ],
    data: {
        title: 'Жанры',
        record: {}
    },
    stores: {
        genres_tree: {
            type: 'genres_tree',
            autoLoad: true
        }
    }
});