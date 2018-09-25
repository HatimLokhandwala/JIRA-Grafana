import {MetricsPanelCtrl} from 'app/plugins/sdk';
import coreModule from 'app/core/core_module';
import config from 'app/core/config';
import {UnknownPanelCtrl} from 'app/plugins/panel/unknown/module';


export class JiraCtrl extends MetricsPanelCtrl {
   
    constructor($scope, $injector, $rootScope, annotationsSrv, datasourceSrv) {
      super($scope, $injector);
      this.$rootScope = $rootScope;
      this.datasourceSrv = datasourceSrv;
    //   this.tabIndex = 0;
      this.queryUrl = "ruleTicket";
    //   this.setQueryUrl();
      this.events.on('refresh', this.getTicketList.bind(this));
      this.ticketViewFlag = false;
      this.currentTicket = '';
      this.commentList = [];
      this.populateList();
    }

    populateList(){
      this.commentList.push({'date': '27-10-2018 1:30pm', 'user': 'hatim.lokhandwala', 'comment': 'When clients are blacklisted queue at their end gets filled up and backlogs are being generated. As soon as they are unblacklisted they release the backlog, causing them to be blacklisted again and again. This tasks involved understanding the rsyslog queue and doing changes in our config so as to drop the logs at the client side itself when they are blacklisted.'});
      this.commentList.push({'date': '24-10-2018 9:21pm', 'user': 'hatim.lokhandwala', 'comment':'Went through following references: http://www.rsyslog.com/doc/v8-stable/concepts/queues.html http://www.rsyslog.com/doc/v8-stable/configuration/modules/imfile.html http://www.rsyslog.com/doc/v8-stable/whitepapers/queues_analogy.html'});
      this.commentList.push({'date': '26-10-2018 5:50am', 'user': 'hatim.lokhandwala', 'comment':'Config parameters for the required behavior have been identified. Testing them on the test cluster. However, test cluster was broken (solr data being purged at zk) and so had to spend time in bringing things up before testing.'});
      this.commentList.push({'date': '26-10-2018 4:36pm', 'user': 'hatim.lokhandwala', 'comment':'1. Currently, when the client is blacklisted, imfile at the client freezes and keeps the FD open of the file it was reading from before the blacklist. 2. As soon as the client is unblacklisted, imfile pumps the data from that FD plus the new data generated from the application, eventually leading to blacklist again. 3. Have identified rsyslog config parameter *queue.timeoutenqueue* that ensures that data is dropped once imfile is not able to enqueue in the timeout period. 4. Have tested the config setting the value of *queue.timeoutenqueue* the parameter to be 0. This means when the client is blacklisted, if imfile is not able to enqueue within timeout period the message will be discarded, releasing the FD eventually.'});
      this.commentList.push({'date': '26-10-2018 3:59pm', 'user': 'hatim.lokhandwala', 'comment':'The configuration has been tested through load generation from perf and blacklisting/un-blacklisting the client machine.'});
    }

    getTicketList(){
        this.datasourceSrv.get(this.panel.datasource)
        .then(this.issueQuery.bind(this))
        .then(this.handleResult.bind(this))
        .catch(()=>{
          console.log('alert');
          this.showLoader=false;
        });
    }
    // generic function to query alertz datasource. queryUrl and queryUrlParams should be set appropriately
    issueQuery(datasource){
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
        console.log("issuing query",datasource, metricsQuery);
        return datasource.query(metricsQuery);
    }

    handleResult(res){
        console.log(res);
        this.showLoader = false;
        this.result = res.data;
    }

    statusDisplay(val){
      let status = _.lowerCase(val);
      if (_.eq(status, "breached"))return { "color": "#f17c7c"};
      else if(_.eq(status, "ok")) return { "color": "#54c7ae"};
    }

    updateView(ticketInfo){
      console.log("sdf");
      this.ticketViewFlag = !this.ticketViewFlag;
      console.log("Flag", this.ticketViewFlag);
      if(ticketInfo){
        this.currentTicket = ticketInfo;
        console.log('cuurent Ticket', this.currentTicket);
        backendSrv.get();
      }
      
    }

}

JiraCtrl.templateUrl = 'public/plugins/fk-jira/jira.html'
