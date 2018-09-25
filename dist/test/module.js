'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PanelCtrl = undefined;

var _jira = require('./jira.js');

var _sdk = require('app/plugins/sdk');

(0, _sdk.loadPluginCss)({
    dark: 'plugins/fk-jira/css/jira.dark.css',
    light: 'plugins/fk-jira/css/jira.light.css'
});

exports.PanelCtrl = _jira.JiraCtrl;
//# sourceMappingURL=module.js.map
