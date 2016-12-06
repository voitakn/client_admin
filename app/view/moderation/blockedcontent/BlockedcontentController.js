Ext.define('ADM.view.moderation.blockedcontent.BlockedcontentController', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.moderation-blockedcontent',

    onUnlockContent: function(grid, rowIndex, cellIndex, actionColumn, event) {
        var store = grid.getStore();
        var record = store.getAt(rowIndex);
        Ext.MessageBox.show({
            title: 'Причина',
            msg: 'Укажите причину:',
            width: 300,
            buttons: Ext.MessageBox.OKCANCEL,
            multiline: true,
            scope: this,
            fn: function(btn, reason) {
                if (btn != 'ok') {
                    return;
                }
                record.set('reason', reason);
                this.removeRecord(record, 'Вы успешно разблокировали контент');
            },
            animateTarget: event.getTarget()
        });
    },

    rendererTypeObject: function(value, metaData, record) {
        var configs = this.getViewModel().get('configs');
        var config = configs.findRecord('name', 'reader_url');
        var sessionHash = Ext.util.Cookies.get('session_hash');
        if (metaData) {
            metaData['tdAttr'] = 'data-qtip="Просмотреть контент"';
        }
        if (record.get('obj_type') == 1) {
            return Ext.String.format('<a href="{0}/?epub_id={1}&book_uid={2}&session_hash={3}" target="_blank">{4}</a>',
                config.get('value'), record.get('obj_id'), record.get('book_uid'), sessionHash, value);
        }
        else {
            return Ext.String.format('<a class="blocked-content-view" href="#view_object/{1}" onclick="return false">{0}</a>', value, record.get('obj_id'));
        }
    },

    onViewContent: function(grid, node, rowIndex, cellIndex, event) {
        var store = grid.getStore();
        var viewModel = this.getViewModel();
        viewModel.set('record', store.getAt(rowIndex));
        var target = event.getTarget('a.blocked-content-view');
        if (!target) {
            return;
        }
        this.lookupReference('window').show(target);
    }
    
});
