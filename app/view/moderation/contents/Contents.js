Ext.define('ADM.view.moderation.contents.Contents', {
    extend: 'Base.panel.ModuleContainer',
    alias: 'widget.view-modercontent',
    id: 'view-modercontent-id',
    headerTitle: 'Дополнительный контента',
    requires: [
        'ADM.view.moderation.contents.ContentsModel',
        'ADM.view.moderation.contents.ContentsController',
        'ADM.view.moderation.contents.ContentsForm',
        'ADM.view.moderation.contents.ContentsGrid'
    ],
    controller: 'modercontent',
    header: false,
    region: 'center',
    layout: 'border',
    viewModel: {
        type: 'modercontent'
    },
    initComponent: function() {
        this.items = [{
            xtype: 'view-modercontent-grid',
            region: 'center'
        },{
            xtype: 'panel',
            region:'west',
            reference: 'typeModerPanel',
            collapsible: true,
            split: true,
            collapsed: true,
            title: 'Ветка сообщений',
            layout: 'anchor',
            width: 400
        }];
        this.callParent(arguments);
    }
});
