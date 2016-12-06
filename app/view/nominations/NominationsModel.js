Ext.define('ADM.view.nominations.NominationsModel', {
    extend: 'Base.app.ModuleModel',
    alias: 'viewmodel.nominations',

    view: 'nominations',

    requires: [
        'ADM.store.NominationDate',
        'ADM.store.NominationStatuses',
        'ADM.store.Nominations'
    ],

    data: {
        name: 'Номинация'
    },

    stores: {

        nominations: {
            type: 'nominations',
            autoLoad: true,
            listeners: {
                load: 'onSelectFirstRecord'
            }
        },

        nominationStatuses: {
            type: 'nominationStatuses',
            autoLoad: true
        },

        nominationDate: {
            type: 'nominationDate',
            autoLoad: true,
            listeners: {
                load: 'onLoadDateStatus'
            }
        }

    },

    formulas: {

        isCorrective: {
            bind: '{record.status}',
            get: function(value) {
                return value == 2;
            }
        },

        isNomination: {
            bind: '{record.status}',
            get: function(value) {
                return value == 4;
            }
        },

        isCancel: {
            bind: '{record.status}',
            get: function(value) {
                return value == 9;
            }
        },

        isNominationOpen: {
            bind: '{nominationDate.date}',
            get: function(value) {
                return value == 1;
            }
        },

        isNominationClose: {
            bind: '{nominationDate.date}',
            get: function(value) {
                return value == 0;
            }
        }

    }
});
