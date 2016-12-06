Ext.define('Base.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.base-ajax',
    encodeFilters: function(filters) {
        var out = {};
        for (var i = 0; i < filters.length; i++) {
            var row = filters[i];
            var value = row.getValue();
            if (Ext.isArray(value)) {
                value = value.length == 0? null: value = value.length == 1? value[0]: value;
            }
            out[row.getProperty()] = value;
        }
        return this.applyEncoding(out);
    },
    listeners: {
        exception: function (proxy, response, operation) {
            var error = operation.getError();
            //console.log(error);
            if (typeof(error) == 'object') {
                error = response.responseText;
            }
            Ext.Msg.alert('Внутренняя ошибка', error);
        }
    }
});