Ext.define('UD.view.themes.ThemesTreePanelFolders', {
    extend: 'UD.view.base.TreePanel',
    alias: 'widget.view-themes-tree-panel',
    layout: 'fit',
    lines: false,
    useArrows: true,
    requires: [
        'UD.view.base.Form',
        'UD.view.base.TreeColumnFolder'
    ],
    cls: 'template-view-directory',
    columns: [{
        xtype: 'base-tree-column-folder',
        header: 'Файлы',
        dataIndex: 'folder',
        flex: 1
    }],
    viewConfig: {
        plugins: { ptype: 'treeviewdragdrop' }
    },
    rootVisible: false,
    initComponent: function() {
        this.tbar = [{
            xtype: 'base-form',
            items: [{
                xtype: 'base-field-file',
                name: 'upload',
                buttonOnly: true,
                width: 385,
                listeners: {
                    change: {
                        fn: 'onUploadFileTheme'
                    }
                },
                buttonText: 'Добавить файл'
            }]
        }];
        this.callParent(arguments);
    }
});