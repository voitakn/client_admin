Ext.define('ADM.view.moderation.complaints.ComplaintsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.view-complaints-window',
    title: 'Введите комментарий',
    layout: 'anchor',
    autoShow: true,
    width: 600,
    height: 450,
    modal: true,
    controller: 'complaints',
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            anchor: '100% 100%',
            viewModel: {
                type: 'moderation-complaints'
            },
            formBind: true,
            items: [{
                xtype: 'textarea',
                labelAlign: 'top',
                margin: '5',
                allowBlank: false,
                anchor: '100% 100%',
                fieldLabel: 'Причина',
                name: 'comment',
                bind: '{record.comment}'
            }],
            buttons: [{
                xtype: 'button',
                viewType: 'success',
                formBind: true,
                disabled: true,
                text: this.textButton,
                handler: this.handlerButton
            },{
                xtype: 'button',
                text: 'Отмена',
                handler: 'onCloseWindow'
            }]
        }];
        this.callParent(arguments);
    }
});
