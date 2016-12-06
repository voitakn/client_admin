Ext.define('ADM.view.moderation.books.BooksTemplate', {
    extend: 'Ext.XTemplate',
    renderMoney: function(value) {
        return Ext.util.Format.currency(value, " ");
    },
    renderPreview: function(value) {
        if (!value) {
            return '<span style="color: #808080">Запись отсутствует</span>';
        }
        return value;
    },
    renderThemeCover: function(value) {
        var store = Ext.data.StoreManager.lookup('storeThemes');
        if (!value) {
            return '';
        }
        var record = store.query('theme_uid', value).getAt(0);
        return '<img style="float: left; width: 125px; margin-right: 7px;" ' +
            'src="/node/admin/themes/' + record.get('theme_name') + '/cover">'
    }
});