import {JiraCtrl} from './jira.js'

import {loadPluginCss} from 'app/plugins/sdk';

loadPluginCss({
    dark: 'plugins/fk-jira/css/jira.dark.css',
    light: 'plugins/fk-jira/css/jira.light.css' 
});

export {
    JiraCtrl as PanelCtrl
};
