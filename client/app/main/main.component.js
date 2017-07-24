import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  messages = [{
    "ip": ["107.128.250.158"],
    "client": "alliancenativenewyorkandcompany-dev",
    "code": "s27986539",
    "body": {
      "ndh": "1",
      "ts": "1500864028",
      "ce": "UTF-8",
      "c.": "",
      "a.": "",
      "DeviceName": "x86_64",
      "OSVersion": "iOS 10.1",
      "RunMode": "Application",
      "Resolution": "1242x2208",
      "CarrierName": "(null)",
      "action": "nac.newRepeat",
      "AppID": "cerebro_shell 3.3.0 (20)",
      "TimeSinceLaunch": "594",
      ".a": "",
      "nac.": ["", ""],
      "deviceName": "CAD4MRITSPDISC61",
      "newRepeat": "NAC:Repeat",
      ".nac": ["", ""],
      "timeStamp": "2017-07-24T02:40:28Z",
      ".c": "",
      "pe": "lnk_o",
      "pev2": "AMACTION:nac.newRepeat",
      "pageName": "cerebro_shell/20",
      "t": "00/00/0000 00:00:00 0 240",
      "aid": "91BDEEDA544E426D-89BE9FEAB326760E"
    }
  }];

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.socket = socket;
    this.$http = $http;
    this.messages = this.messages.map(m => this.formatData(m));
    $scope.$on('', (event, data) => {
      var result = this.formatData(data);
      this.messages.push(result);
    });
  }
  formatData(data) {
    var result = {
      client: data.client,
      deviceName: data.body.deviceName,
      event: data.body.action || data.body.pageName,
      timeStamp: data.body.timeStamp,
      details: {
        osVersion: data.body.OSVersion,
        appId: data.body.AppID,
        timeSinceLaunch: data.body.TimeSinceLaunch
      },
      context: []
    };
    return result;
  }
  $onInit() {

  }
}

export default angular.module('omnitureInterceptorApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
