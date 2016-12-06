Ext.define('ADM.store.ArticleSingles', {
    extend: 'Ext.data.Store',
    alias: 'store.articleSingles',
    requires: [
        'ADM.model.ArticleSingle'
    ],
    model: 'ADM.model.ArticleSingle',
    sorters: [{
        property: 'title',
        direction: 'ASC'
    }]
});