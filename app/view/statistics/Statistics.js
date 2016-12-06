Ext.define("ADM.view.statistics.Statistics",{
    extend: "Base.panel.ModuleContainer",
    alias: 'widget.statistics',
    requires: [
        'Base.grid.ModuleList',
        'Base.panel.ModuleForm',
        'ADM.view.statistics.StatisticsController',
        'ADM.view.statistics.StatisticsModel',
        'Ext.chart.CartesianChart'
    ],
    controller: "statistics",
    viewModel: {
        type: "statistics"
    },

    title: 'Статистика',

    items: [{
        xtype: 'basemoduleform',
        title: 'Фильтр',
        items: [{
            xtype: 'datefield',
            format: 'Y-m-d',
            fieldLabel: 'С',
            name: 'date_start',
            allowBlank: true,
            bind: {
                value: '{filter.dateStart}'
            }
        },{
            xtype: 'datefield',
            format: 'Y-m-d',
            fieldLabel: 'По',
            name: 'date_end',
            allowBlank: true,
            bind: {
                value: '{filter.dateEnd}'
            }
        }],
        buttons: [{
            xtype: 'button',
            text: 'Искать',
            handler: 'onSearch'
        },{
            xtype: 'button',
            text: 'Сбросить',
            handler: 'onResetForm'
        }]
    },{
        xtype: 'cartesian',
        region: 'center',
        legend: {
            position: 'bottom'
        },
        bind: {
            store: '{statistics}'
        },
        insetPadding: 40,
        axes: [{
            type: 'numeric',
            fields: ['books', 'files', 'users'],
            position: 'left',
            grid: true
        },{
            type: 'category',
            fields: 'create_date',
            position: 'bottom',
            renderer: function(value) {
                return Ext.Date.format(value, 'Y-m-d');
            },
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'line',
            axis: 'left',
            title: 'Книги',
            xField: 'create_date',
            yField: 'books',
            style: {
                lineWidth: 4
            },
            marker: {
                radius: 4
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            },
            tooltip: {
                trackMouse: true,
                style: 'background: #fff',
                renderer: function(record, item) {
                    var date = Ext.Date.format(record.get('create_date'), 'Y-m-d');
                    this.setHtml(Ext.String.format('Количество загруженных книг {0}: {1}', date, record.get(item.field)));
                }
            }
        }, {
            type: 'line',
            axis: 'left',
            title: 'Файлы',
            xField: 'create_date',
            yField: 'files',
            style: {
                lineWidth: 4
            },
            marker: {
                radius: 4
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            },
            tooltip: {
                trackMouse: true,
                style: 'background: #fff',
                renderer: function(record, item) {
                    var date = Ext.Date.format(record.get('create_date'), 'Y-m-d');
                    this.setHtml(Ext.String.format('Количество загруженных файлов {0}: {1}', date, record.get(item.field)));
                }
            }
        }, {
            type: 'line',
            axis: 'left',
            title: 'Пользователи',
            xField: 'create_date',
            yField: 'users',
            style: {
                lineWidth: 4
            },
            marker: {
                radius: 4
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            },
            tooltip: {
                trackMouse: true,
                style: 'background: #fff',
                renderer: function(record, item) {
                    var date = Ext.Date.format(record.get('create_date'), 'Y-m-d');
                    this.setHtml(Ext.String.format('Количество зарегистрированных пользователей {0}: {1}', date, record.get(item.field)));
                }
            }
        }]
    }]
});
