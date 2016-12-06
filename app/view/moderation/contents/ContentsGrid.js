Ext.define('ADM.view.moderation.contents.ContentsGrid', {
    extend: 'Base.grid.ModuleList',
    alias: 'widget.view-modercontent-grid',
    reference: 'typeModercontentGrid',
    requires: [
        'Ext.grid.plugin.RowExpander'
        //'Ext.ux.PreviewPlugin'
    ],

    bind: {
        store: '{moderContents}'
    },

    initComponent: function() {
        this.listeners = {
            select: 'onSelectedRec'
        };
        this.columns = [{
            text: 'ID',
            dataIndex: 'comment_id',
            menuDisabled: true,
            hidden: true,
            width: 80
        },{
            text: 'Дата',
            dataIndex: 'create_time',
            menuDisabled: true,
            width: 170
        },{
            text: 'Тип',
            dataIndex: 'content_type',
            menuDisabled: true,
            renderer: 'rendererObjType',
            width: 120
        },{
            text: 'Логин',
            menuDisabled: true,
            dataIndex: 'login',
            renderer: 'rendererLogin',
            width: 170,
            listeners: {
                click: 'onClickedEditUser'
            }
        },{
            text: 'Статус модерации',
            renderer: 'rendererCommentStatus',
            menuDisabled: true,
            dataIndex: 'comment_status',
            width: 170
        },{
            text: 'Текст контента',
            menuDisabled: true,
            minWidth: 200,
            dataIndex: 'content',
            renderer: 'rendererToolTip',
            flex: 3
        },{
            xtype: 'actioncolumn',
            menuDisabled: true,
            text: 'Действие',
            width: 110,
            align: 'center',
            dataIndex: 'action',
            items: [{
                tooltip: 'Заблокировать контент',
                icon: 'resources/icons/close-16.png',
                handlerWindowBtn: 'onBlockedContent',
                textWindowBtn: 'Заблокировать контент',
                handler: 'onWindowShow'
            },{
                tooltip: 'Опубликовать контент',
                icon: 'resources/icons/Post.png',
                handlerWindowBtn: 'onUnlockContent',
                textWindowBtn: 'Опубликовать контент',
                handler: 'onWindowShow'
            }
            ]
        }];
        this.callParent(arguments);
    }
});