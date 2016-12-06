Ext.define("ADM.view.moderation.blockedcontent.Blockedcontent",{
    extend: "Base.panel.ModuleContainer",
    alias: 'widget.moderation-blockedcontent',

    requires: [
        'ADM.view.moderation.blockedcontent.BlockedcontentController',
        'ADM.view.moderation.blockedcontent.BlockedcontentModel'
    ],

    controller: "moderation-blockedcontent",


    viewModel: {
        type: "moderation-blockedcontent"
    },

    bind: {
        title: '{name}'
    },

    items: [{
        xtype: 'basemodulelist',
        bind: {
            store: '{blockedContents}'
        },
        columns: [{
            xtype: 'datecolumn',
            text: 'Время',
            minWidth: 180,
            format:'Y-m-d H:i',
            dataIndex: 'change_date'
        },{
            text: 'Статус',
            minWidth: 140,
            dataIndex: 'status_title'
        },{
            text: 'Тип контента',
            width: 180,
            renderer: 'rendererTypeObject',
            dataIndex: 'obj_type_title',
            listeners: {
                click: 'onViewContent'
            }
        },{
            text: 'Причина',
            dataIndex: 'reason',
            renderer: 'rendererToolTip',
            minWidth: 200
        },{
            xtype:'actioncolumn',
            text: 'Разблокировать',
            width:120,
            align: 'center',
            items: [{
                icon: 'resources/icons/Unlock-Filled-icon.png',
                tooltip: 'Разблокировать',
                handler: 'onUnlockContent'
            }]
        }]
    },{
        xtype: 'basemodulewindow',
        title: 'Просмотр контента',
        items: [{
            xtype: 'textarea',
            readOnly: true,
            flex: 1,
            bind: {
                value: '{record.content}'
            }
        }]
    }]
});
