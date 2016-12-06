Ext.define('ADM.view.logs.Controller', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.logs',
    onFilter: function(button) {
        var model = this.getViewModel();
        var form = button.up('form').getForm();
        var values = form.getValues();
        var dateTo = new Date(values['date_to']).getTime();
        var dateFrom = new Date(values['date_from']).getTime();
        var store = model.getStore('logs');
        var filters = store.getFilters();
        filters.add({
            property: 'level',
            value: values['level'] == -10? '': values['level']
        },{
            property: 'date_to',
            value: dateTo
        },{
            property: 'date_from',
            value: dateFrom
        },{
            property: 'message',
            value: values['message']
        });
    }
});