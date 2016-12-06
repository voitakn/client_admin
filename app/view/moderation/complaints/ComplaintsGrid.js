Ext.define('ADM.view.moderation.complaints.ComplaintsGrid', {
    extend: 'Base.grid.ModuleList',
    alias: 'widget.view-complaints-grid',
    requires: [
        'Ext.grid.plugin.RowExpander'
    ],

    bind: {
        store: '{complaints}'
    },

    initComponent: function(){
        this.plugins = [{
            ptype: 'rowexpander',
            rowBodyTpl : Ext.create('ADM.view.moderation.complaints.ComplaintsTemplate',
                '<p><b>Комментарий к жалобе:</b><br> {complain}<br>',
                '<p><b>Дополнительная информация:</b><br> {complain_detail:this.getComplaintDetail}<br>'
            )
        }];
        this.columns = [{
            xtype: 'actioncolumn',
            menuDisabled: true,
            text: 'Действие',
            width: 110,
            align: 'center',
            items: [{
                tooltip: 'Принять жалобу',
                complaintAccept: true,
                icon: 'resources/icons/Post.png',
                isDisabled: function (view, rowIndex, colIndex, item, record) {
                    var status = record.get('complain_status');
                    return !(status == 1 || status == 4);
                },
                handler: 'onShowWindowReason'
            },{
                tooltip: 'Отклонить жалобу',
                icon: 'resources/icons/close-16.png',
                isDisabled: function (view, rowIndex, colIndex, item, record) {
                    var status = record.get('complain_status');
                    return !(status == 1 || status == 3);
                },
                handler: 'onShowWindowReason'
            }]
        },{
            menuDisabled: true,
            text: 'Дата',
            dataIndex: 'create_date',
            width: 150
        },{
            text: 'Уровень жалобы',
            menuDisabled: true,
            dataIndex: 'complain_level',
            renderer: 'renderComplainLevel',
            width: 140
        },{
            text: 'Статус жалобы',
            dataIndex: 'status',
            menuDisabled: true,
            renderer: 'renderComplainStatus',
            width: 140
        },{
            text: 'Контент',
            menuDisabled: true,
            dataIndex: 'obj_type',
            renderer: 'renderObjType',
            width: 140
        },{
            text: 'Автор контента',
            menuDisabled: true,
            dataIndex: 'obj_login',
            renderer: 'renderAuthorContent',
            width: 180
        },{
            text: 'Автор жалобы',
            menuDisabled: true,
            dataIndex: 'login',
            width: 180
        },{
            text: 'Комментарий к жалобе',
            menuDisabled: true,
            dataIndex: 'complain',
            sortable: false,
            renderer: 'rendererToolTip',
            width: 200
        },{
            text: 'ID',
            menuDisabled: true,
            dataIndex: 'complain_id',
            sortable: false,
            width: 80
        }];
        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: {
                store: '{complaints}'
            }
        }];
        this.callParent(arguments);
    }
});