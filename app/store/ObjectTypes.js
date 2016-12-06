Ext.define('ADM.store.ObjectTypes', {
    extend: 'Ext.data.Store',
    alias: 'store.objectTypes',
    requires: [
        'ADM.model.ObjectType'
    ],
    data: [{
        id: 1,
        title: 'Книга'
    },{
        id: 2,
        title: 'Новости'
    },{
        id: 3,
        title: 'Отзыв'
    },{
        id: 4,
        title: 'Комментарий'
    },{
        id: 5,
        title: 'Коллекция'
    },{
        id: 6,
        title: 'Статья'
    },{
        id: 7,
        title: 'Пользователь'
    },{
        id: 8,
        title: 'Параграф'
    }],
    model: 'ADM.model.ObjectType',
    sorters: [{
        property: 'title',
        direction: 'ASC'
    }]
});