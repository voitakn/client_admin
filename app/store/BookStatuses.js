Ext.define('ADM.store.BookStatuses', {
    extend: 'Ext.data.Store',
    alias: 'store.bookStatuses',
    requires: [
        'ADM.model.BookStatus'
    ],
    data: [{
        id: 0,
        title: 'Новая'
    },{
        id: 1,
        title: 'Опубликованная'
    },{
        id: 2,
        title: 'Модерация'
    },{
        id: 3,
        title: 'Повторная проверка'
    },{
        id: 4,
        title: 'Удалена'
    }],
    model: 'ADM.model.BookStatus',
    sorters: [{
        property: 'title',
        direction: 'ASC'
    }]
});