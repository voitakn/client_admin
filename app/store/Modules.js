Ext.define('ADM.store.Modules', {
    extend: 'Ext.data.TreeStore',
    storeId: 'module',
    requires: [
        'ADM.model.Module'
    ],
    model: 'ADM.model.Module',

    parentIdProperty: 'parent_id',
    root: {
        children: [{
            "id": 1,
            "parent_id": 0,
            "name": "Домашняя страница",
            "module_href": "home",
            "leaf": true
        },{
            "id": 2,
            "parent_id": 0,
            "name": "Пользователи",
            "module_href": "users",
            "leaf": true
        },{
            "id": 3,
            "parent_id": 0,
            "name": "Роли",
            "module_href": "roles",
            "leaf": true
        },{
            "id": 4,
            "parent_id": 0,
            "name": "Жанры",
            "module_href": "genres",
            "leaf": true
        },{
            "id": 5,
            "parent_id": 0,
            "name": "Логи",
            "module_href": "logs",
            "leaf": true
        },{
            "id": 6,
            "parent_id": 0,
            "name": "Книги",
            "module_href": "books",
            "leaf": true
        },{
            "id": 7,
            "parent_id": 0,
            "name": "Типы элементов",
            "module_href": "typeitems",
            "leaf": true
        },{
            "id": 8,
            "parent_id": 0,
            "name": "Уведомление",
            "module_href": "notices",
            "leaf": true
        },{
            "id": 9,
            "parent_id": 0,
            "name": "Шаблоны",
            "module_href": "themes",
            "leaf": true
        },{
            "id": 10,
            "parent_id": 0,
            "name": "Moдерация",
            "module_href": "moderation",
            "leaf": false,
            children: [{
                "id": 11,
                "parent_id": 10,
                "name": "Книги",
                "module_href": "books",
                "leaf": true
            },{
                "id": 12,
                "parent_id": 10,
                "name": "Пользователи",
                "module_href": "users",
                "leaf": true
            },{
                "id": 13,
                "parent_id": 10,
                "name": "Жалобы на контент",
                "module_href": "complaints",
                "leaf": true
            },{
                "id": 14,
                "parent_id": 10,
                "name": "Дополнительный контента",
                "module_href": "contents",
                "leaf": true
            },{
                "id": 15,
                "parent_id": 10,
                "name": "Заблокированный контент",
                "module_href": "blockedcontent",
                "leaf": true
            }]
        },{
            "id": 16,
            "parent_id": 0,
            "name": "Виньетки",
            "module_href": "vignettes",
            "leaf": true
        },{
            "id": 17,
            "parent_id": 0,
            "name": "Буквицы",
            "module_href": "dropcaps",
            "leaf": true
        },{
            "id": 18,
            "parent_id": 0,
            "name": "Статистика",
            "module_href": "statistics",
            "leaf": true
        },{
            "id": 19,
            "parent_id": 0,
            "name": "Билинг",
            "module_href": "",
            "leaf": false,
            children: [{
                "id": 20,
                "parent_id": 19,
                "name": "Пользователи",
                "module_href": "salesusers",
                "leaf": true
            },{
                "id": 21,
                "parent_id": 19,
                "name": "Авторы",
                "module_href": "salesauthors",
                "leaf": true
            },{
                "id": 22,
                "parent_id": 19,
                "name": "Заявки",
                "module_href": "requests",
                "leaf": true
            },{
                "id": 23,
                "parent_id": 19,
                "name": "Заказы",
                "module_href": "orders",
                "leaf": true
            }]
        },{
            "id": 24,
            "parent_id": 0,
            "name": "Статьи",
            "module_href": "articles",
            "leaf": true
        },{
            "id": 25,
            "parent_id": 0,
            "name": "Номинация",
            "module_href": "nominations",
            "leaf": true
        },{
            "id": 26,
            "parent_id": 0,
            "name": "Печать",
            "module_href": "prints",
            "leaf": true
        },{
            "id": 27,
            "parent_id": 0,
            "name": "Статический контент",
            "module_href": "staticcontent",
            "leaf": true
        }]
    }

});