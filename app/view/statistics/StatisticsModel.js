Ext.define('ADM.view.statistics.StatisticsModel', {
    extend: 'Base.app.ModuleModel',
    alias: 'viewmodel.statistics',

    requires: [
        'ADM.store.Statistics'
    ],

    view: 'statistics',

    data: {
        filter: {
            dateStart: Ext.Date.add(new Date(), Ext.Date.MONTH, -1),
            dateEnd: new Date()
        }
    },

    stores: {

        statistics: {
            type: 'statistics',
            autoLoad: true
        }

    }

});
