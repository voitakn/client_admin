Ext.define('ADM.store.Articles', {
    extend: 'Ext.data.Store',
    alias: 'store.articles',
    requires: [
        'ADM.model.Article'
    ],
    model: 'ADM.model.Article',
    sorters: [{
        property: 'title',
        direction: 'ASC'
    }]
});