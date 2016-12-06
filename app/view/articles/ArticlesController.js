Ext.define('ADM.view.articles.ArticlesController', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.articles',

    onSelectRecord: function(selectionModel, records) {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('articleSingles');
        var panel = this.lookupReference('form');
        if (records.length == 0) {
            this.selectRecord(record, panel);
            return;
        }
        var record = records[0];
        panel.setLoading(true);
        store.load({
            scope: this,
            params: {
                id: record.get('id')
            },
            callback: function(records) {
                record.set('content', records[0].get('content'));
                record.commit();
                panel.setLoading(false);
                this.selectRecord(record, panel);
            }
        });
    }
    
});
