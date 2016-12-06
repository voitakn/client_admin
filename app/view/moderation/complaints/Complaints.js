Ext.define('ADM.view.moderation.complaints.Complaints', {
    extend: 'Base.panel.ModuleContainer',
    alias: 'widget.view-complaints',
    title: 'Жалобы на контент',
    requires: [
        'ADM.view.moderation.complaints.ComplaintsController',
        'ADM.view.moderation.complaints.ComplaintsFilter',
        'ADM.view.moderation.complaints.ComplaintsModel',
        'ADM.view.moderation.complaints.ComplaintsGrid'
    ],
    controller: 'complaints',

    viewModel: {
        type: "moderation-complaints"
    },
    initComponent: function() {
        this.items = [{
            xtype: 'view-complaints-grid',
            //region: 'center'
        },{
            //xtype: 'view-complaints-form'
        }];
        this.callParent(arguments);
    }
});