'use strict';

System.register(['app/plugins/sdk', 'app/core/core_module', 'app/core/config', 'app/plugins/panel/unknown/module'], function (_export, _context) {
  "use strict";

  var MetricsPanelCtrl, coreModule, config, UnknownPanelCtrl, _createClass, JiraCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_appCoreCore_module) {
      coreModule = _appCoreCore_module.default;
    }, function (_appCoreConfig) {
      config = _appCoreConfig.default;
    }, function (_appPluginsPanelUnknownModule) {
      UnknownPanelCtrl = _appPluginsPanelUnknownModule.UnknownPanelCtrl;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('JiraCtrl', JiraCtrl = function (_MetricsPanelCtrl) {
        _inherits(JiraCtrl, _MetricsPanelCtrl);

        function JiraCtrl($scope, $injector, $rootScope, annotationsSrv, datasourceSrv) {
          _classCallCheck(this, JiraCtrl);

          var _this = _possibleConstructorReturn(this, (JiraCtrl.__proto__ || Object.getPrototypeOf(JiraCtrl)).call(this, $scope, $injector));

          _this.$rootScope = $rootScope;
          _this.datasourceSrv = datasourceSrv;
          //   this.tabIndex = 0;
          _this.queryUrl = "ruleTicket";
          //   this.setQueryUrl();
          _this.events.on('refresh', _this.getTicketList.bind(_this));
          _this.ticketViewFlag = false;
          _this.currentTicket = '';
          _this.commentList = [];
          _this.populateList();
          return _this;
        }

        _createClass(JiraCtrl, [{
          key: 'populateList',
          value: function populateList() {
            this.commentList.push({ 'date': '27-10-2018 1:30pm', 'user': 'hatim.lokhandwala', 'comment': 'When clients are blacklisted queue at their end gets filled up and backlogs are being generated. As soon as they are unblacklisted they release the backlog, causing them to be blacklisted again and again. This tasks involved understanding the rsyslog queue and doing changes in our config so as to drop the logs at the client side itself when they are blacklisted.' });
            this.commentList.push({ 'date': '24-10-2018 9:21pm', 'user': 'hatim.lokhandwala', 'comment': 'Went through following references: http://www.rsyslog.com/doc/v8-stable/concepts/queues.html http://www.rsyslog.com/doc/v8-stable/configuration/modules/imfile.html http://www.rsyslog.com/doc/v8-stable/whitepapers/queues_analogy.html' });
            this.commentList.push({ 'date': '26-10-2018 5:50am', 'user': 'hatim.lokhandwala', 'comment': 'Config parameters for the required behavior have been identified. Testing them on the test cluster. However, test cluster was broken (solr data being purged at zk) and so had to spend time in bringing things up before testing.' });
            this.commentList.push({ 'date': '26-10-2018 4:36pm', 'user': 'hatim.lokhandwala', 'comment': '1. Currently, when the client is blacklisted, imfile at the client freezes and keeps the FD open of the file it was reading from before the blacklist. 2. As soon as the client is unblacklisted, imfile pumps the data from that FD plus the new data generated from the application, eventually leading to blacklist again. 3. Have identified rsyslog config parameter *queue.timeoutenqueue* that ensures that data is dropped once imfile is not able to enqueue in the timeout period. 4. Have tested the config setting the value of *queue.timeoutenqueue* the parameter to be 0. This means when the client is blacklisted, if imfile is not able to enqueue within timeout period the message will be discarded, releasing the FD eventually.' });
            this.commentList.push({ 'date': '26-10-2018 3:59pm', 'user': 'hatim.lokhandwala', 'comment': 'The configuration has been tested through load generation from perf and blacklisting/un-blacklisting the client machine.' });
          }
        }, {
          key: 'getTicketList',
          value: function getTicketList() {
            var _this2 = this;

            this.datasourceSrv.get(this.panel.datasource).then(this.issueQuery.bind(this)).then(this.handleResult.bind(this)).catch(function () {
              console.log('alert');
              _this2.showLoader = false;
            });
          }
        }, {
          key: 'issueQuery',
          value: function issueQuery(datasource) {
            var metricsQuery = {
              panelId: this.panel.id,
              range: this.range,
              rangeRaw: this.rangeRaw,
              interval: this.interval,
              intervalMs: this.intervalMs,
              targets: this.panel.targets,
              format: this.panel.renderer === 'png' ? 'png' : 'json',
              maxDataPoints: this.resolution,
              cacheTimeout: this.panel.cacheTimeout,
              queryEntity: "Team",
              queryUrl: this.queryUrl,
              queryUrlParams: this.queryUrlParams
            };
            console.log("issuing query", datasource, metricsQuery);
            return datasource.query(metricsQuery);
          }
        }, {
          key: 'handleResult',
          value: function handleResult(res) {
            console.log(res);
            this.showLoader = false;
            this.result = res.data;
          }
        }, {
          key: 'statusDisplay',
          value: function statusDisplay(val) {
            var status = _.lowerCase(val);
            if (_.eq(status, "breached")) return { "color": "#f17c7c" };else if (_.eq(status, "ok")) return { "color": "#54c7ae" };
          }
        }, {
          key: 'updateView',
          value: function updateView(ticketInfo) {
            console.log("sdf");
            this.ticketViewFlag = !this.ticketViewFlag;
            console.log("Flag", this.ticketViewFlag);
            if (ticketInfo) {
              this.currentTicket = ticketInfo;
              console.log('cuurent Ticket', this.currentTicket);
              backendSrv.get();
            }
          }
        }]);

        return JiraCtrl;
      }(MetricsPanelCtrl));

      _export('JiraCtrl', JiraCtrl);

      JiraCtrl.templateUrl = 'public/plugins/fk-jira/jira.html';
    }
  };
});
//# sourceMappingURL=jira.js.map
