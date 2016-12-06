Ext.define('ADM.view.notices.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.notices',
    requires: [
        'ADM.model.Notice'
    ],
    view: 'notices',
    data: {
        title: 'Уведомления',
        id: 0,
        record: {},
        send_data: {
            message: '',
            eventType: 3,
            mode: 'prod',
            title_send: '',
            token: []
        }
    },
    stores: {
        notices: {
            extend: 'Ext.data.Store',
            model: 'ADM.model.Notice',
            autoLoad: true
        },
        mail_list: {
            extend: 'Ext.data.Store',
            fields: [
                {
                    name: 'login',
                    type: 'string'
                }
            ],
            autoLoad: false
        }
    },
    formulas: {}
});