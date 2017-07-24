import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

const blackList = ['.nac', '.c', 'pe', 'pev2', 't', 'aid', 'nac.', 'ndh', 'ts', 'ce', 'c.', 'a.', '.a', 'AppID', 'action', 'DeviceName', 'OSVersion', 'RunMode', 'Resolution', 'CarrierName', 'TimeSinceLaunch'];
export class MainController {

  messages = [];
  selectedMessage = null;

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.socket = socket;
    this.$http = $http;
    this.selectRow(this.messages[0]);
    $scope.$on('', (event, data) => {
      var result = this.formatData(data);
      this.messages.push(result);
    });
  }
  selectRow(message) {
    this.messages.forEach(m => {
      m.active = false;
    });
    message.active = true;
    this.selectedMessage = message;
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
    for(var key in data.body) {
      var value = data.body[key];
      if(blackList.indexOf(key) >= 0) {
        continue;
      }
      result.context.push({
        key,
        value
      });
    }
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
