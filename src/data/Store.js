Ext.define('Base.data.Store', {
    extend: 'Ext.data.Store',
    listeners: {
        beforeload: function(store, operation, eOpts){
            if (store.getSorters().length > 0 && store['modelSort'] != undefined) {
                var sort = store.getSorters().getAt(0);
                var description = 1;
                store.getProxy().setExtraParam('sort', store['modelSort'][sort.getProperty()]);
                if (sort.getDirection() == 'ASC') {
                    description = 0;
                }
                store.getProxy().setExtraParam('sorder', description);
            }
        }
    }
});