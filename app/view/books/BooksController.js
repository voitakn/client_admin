Ext.define('ADM.view.books.BooksController', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.books-books',

    onSelectRecord: function(selectionModel, records) {
        var record = records[0];
        if (!record) {
            return;
        }
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('bookTags');
        store.load({
            params: {
                book_uid: record.get('book_uid')
            },
            callback: function() {
                var collection = store.getData();
                viewModel.set('record.tags_list', collection.getValues('id').join(','));
            }
        });
        this.callParent(arguments);

    }
});
