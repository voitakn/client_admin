Ext.define('ADM.view.moderation.users.Users', {
    extend: 'Base.panel.ModuleContainer',
    alias: 'widget.moderation-users',

    requires: [
        'ADM.view.moderation.users.UsersGrid',
        'ADM.view.moderation.users.UsersController',
        'ADM.view.moderation.users.UsersModel'
    ],
    controller: 'moderation-users',
    viewModel: {
        type: 'moderation-users'
    },

    title: 'Модерация пользователей',

    initComponent: function() {
        this.items = [{
            xtype: 'moderation-users-grid'
        },{
            xtype: 'tabpanel',
            region:'west',
            reference: 'moderUsersPanel',
            collapsible: true,
            title: 'Редактирование',
            split: true,
            collapsed: true,
            tabBarTitle: 'Редактирование',
            layout: 'anchor',
            width: 350,
            items: [{
                title: 'Параметры',
                activeTab: true,
                reference: 'moderUsersForm',
                xtype: 'moderation-users-form',
                anchor: '100% 100%'
            },{
                title: 'События',
                xtype: 'grid',
                bind: {
                    store: '{userEvents}'
                },
                features: [{
                    groupHeaderTpl: [
                    '<span data-qtip="Событие: {children:this.formatName}">Событие: {children:this.formatName}</span>',
                    {
                        formatName: function(children) {
                            var data = children[0].get('event_const');
                            switch (data) {
                                case 'ACT_PUBLIC_BOOK':
                                    return 'Опубликована книга';
                                    break;
                                case 'ACT_BOUGHT_BOOK':
                                    return 'Книга добавлена в библиотеку';
                                    break;
                                case 'ACT_CREATE_COLL':
                                    return 'Создана коллекция';
                                    break;
                                case 'ACT_ADD_NEWS':
                                    return 'Добавлена новость';
                                    break;
                                case  'ACT_ADD_COMMENT':
                                    return 'Добавлен комментарий';
                                    break;
                                case 'ACT_ADD_CRITICUE':
                                    return 'Добавлен отзыв';
                                    break;
                                case 'ACT_ADD_ARTICLE':
                                    return 'Добавлена статья';
                                    break;
                                default :
                                    return '';
                            }
                        }
                    }],
                    ftype:'grouping'
                }],

                columns: [{
                    text: 'Название',
                    menuDisabled: true,
                    renderer: function(value, metaData) {
                        metaData['tdAttr'] = 'data-qtip="' + value + '"';
                        return value;
                    },
                    dataIndex: 'name',
                    flex: 2
                },{
                    text: 'Дата события',
                    menuDisabled: true,
                    dataIndex: 'event_date',
                    width: 150
                }]

            }]
        }];
        this.callParent(arguments);
    }
});