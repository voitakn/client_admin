Ext.define('ADM.view.nominations.NominationsController', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.nominations',

    onChangeStatusNomination: function(cmp) {
        var status = cmp.status;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('nominationStatuses');
        var record = viewModel.get('record');
        var recordStatus = store.findRecord('id', status);
        record.set('status', status);
        record.set('status_title', recordStatus.get('title'));
        this.recordSave(record, null);
    },

    onChangeDateStaus: function(cmp) {
        var viewModel = this.getViewModel();
        var record = viewModel.get('nominationDate');
        var textSuccess = cmp.status == 1? 'Литературная премия активирована': 'Литературная премия деактивирована';
        record.set('date', cmp.status);
        this.recordSave(record, textSuccess);
    },

    onLoadDateStatus: function(store, records) {
        var viewModel = this.getViewModel();
        viewModel.set('nominationDate', records[0])
    },

    renderBook: function(value, metaData, record) {
        var configs = this.getViewModel().get('configs');
        var config = configs.findRecord('name', 'reader_url');
        var sessionHash = Ext.util.Cookies.get('session_hash');
        if (metaData) {
            metaData['tdAttr'] = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
        }
        return Ext.String.format('<a href="{0}/?epub_id={1}&book_uid={2}&session_hash={3}" target="_blank">{4}</a>',
            config.get('value'), record.get('last_public_epub_id'), record.get('book_id'), sessionHash, value);
    }
});
