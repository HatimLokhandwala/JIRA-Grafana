'use strict';

System.register(['./jira.js', 'app/plugins/sdk'], function (_export, _context) {
    "use strict";

    var JiraCtrl, loadPluginCss;
    return {
        setters: [function (_jiraJs) {
            JiraCtrl = _jiraJs.JiraCtrl;
        }, function (_appPluginsSdk) {
            loadPluginCss = _appPluginsSdk.loadPluginCss;
        }],
        execute: function () {

            loadPluginCss({
                dark: 'plugins/fk-jira/css/jira.dark.css',
                light: 'plugins/fk-jira/css/jira.light.css'
            });

            _export('PanelCtrl', JiraCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map
