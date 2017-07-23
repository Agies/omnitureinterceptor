import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  messages = [];

  /*@ngInject*/
  constructor($http, $scope) {
    this.$http = $http;
    $scope.$on('config', (event, data) => {
      this.messages.push(data);
    });
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
