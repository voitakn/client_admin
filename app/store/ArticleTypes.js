Ext.define('ADM.store.ArticleTypes', {
    extend: 'Ext.data.Store',
    alias: 'store.articleTypes',
    requires: [
        'ADM.model.ArticleType'
    ],
    data: [{
        id: 1,
        title: 'Новость'
    },{
        id: 2,
        title: 'Статья'
    },{
        id: 3,
        title: 'Рецензия'
    },{
        id: 4,
        title: 'Глобальная новость'
    }],
    model: 'ADM.model.ArticleType',
    sorters: [{
        property: 'title',
        direction: 'ASC'
    }]
});