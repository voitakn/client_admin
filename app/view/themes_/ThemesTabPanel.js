Ext.define('UD.view.themes.ThemesTabPanel', {
    extend: 'UD.view.base.TabPanel',
    alias: 'widget.view-themes-tab-panel',
    initComponent: function(){
        this.myMask = new Ext.LoadMask({
            msg    : 'Please wait...',
            target : this
        });
        this.callParent(arguments);
    }
});