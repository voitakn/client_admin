Ext.define('ADM.view.themes.Themes', {
    extend: "Base.panel.ModuleContainer",
    alias: 'widget.roles',
    requires: [
        'Base.grid.ModuleList',
        'Base.panel.ModuleForm',
        'ADM.view.themes.Controller',
        'ADM.view.themes.Model'
    ],
    viewModel: {
        type: "themes"
    },
    controller: 'themes',
    title: 'Шаблоны',
    //tools: [],

    items: [{
        xtype: 'basemodulelist',
        bind: {
            store: '{themes}'
        },
        columns: [
            {
                text: 'ID',
                dataIndex: 'theme_uid',
                flex: 1
            },{
                text: 'Название',
                dataIndex: 'theme_name',
                flex: 3
            },{
                text: 'Название',
                dataIndex: 'theme_type',
                flex: 3
            },{
                text: 'Пользователь',
                dataIndex: 'login',
                flex: 3
            },{
                xtype: 'booleancolumn',
                text: 'Общая',
                trueText: 'Да',
                falseText: 'Нет',
                dataIndex: 'is_public',
                flex: 3
            },{
                xtype:'actioncolumn',
                text: 'Действие',
                width: 80,
                flex: 2,
                align: 'center',
                items: [{
                    tooltip: 'Редактирование шаблона',
                    icon: '/icons/edit_9793.png',
                    handler: 'showWindowEditContentTheme'
                }]
            }
        ],
        listeners: {
            selectionchange: 'onSelectTheme'
        }
    }, {
        xtype: 'basemoduleform',
        tools: [
            {
                type: 'plus',
                tooltip: 'Добавить тему',
                handler: 'onResetForm'
            }
        ],
        width: 500,
        items: [
            {
                xtype: 'textfield',
                fieldLabel: 'Название',
                allowBlank: false,
                name: 'theme_name',
                bind: {value: '{record.theme_name}'}
            },{
                xtype: 'textfield',
                fieldLabel: 'Тип темы',
                allowBlank: false,
                name: 'theme_type',
                bind: {value: '{record.theme_type}'}
            },{
                xtype: 'checkbox',
                fieldLabel: 'Общая',
                name: 'public',
                labelAlign: 'left',
                bind: '{record.public}'
            },{
                xtype: 'treepanel',
                title: 'Содержимое',
                height: 300,
                reference: 'tree_folders',
                rootVisible: false,
                bind: {
                    store: '{folders}'
                },
                columns: [{
                    xtype: 'treecolumn',
                    header: 'Файлы',
                    dataIndex: 'folder',
                    flex: 1
                }]
            }
        ],
        buttons: [
            {
                xtype: 'button',
                text: 'Сохранить',
                handler: 'onSyncStore'
            },{
                xtype: 'button',
                text: 'Очистить',
                handler: 'onResetForm'
            }
        ]
    }]

});