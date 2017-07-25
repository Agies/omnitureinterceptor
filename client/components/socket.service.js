'use strict';
const angular = require('angular');

/*@ngInject*/
export function socketService($rootScope, $timeout, $q) {
  var socket = io.connect('https://omnitureinterceptor.herokuapp.com/');
  socket.on('connect', () => {
    console.log('socket connected');
  });
  socket.on('client:connected', data => {
    console.log(`clients connected: ${data.count}`);
  });
  socket.on('client:disconnected', data => {
    console.log(`clients connected: ${data.count}`);
  });
  socket.on('disconnect', () => {
    console.log('socket disconnected');
  });
  function listen(event) {
    var deferred = $q.defer();
    socket.on(event, data => {
      $timeout(() => {
        deferred.notify(data);
      }, 1);
    });
    console.log('Subscribed to: ', event);
    return deferred.promise;
  }
  function unlisten(event) {
    socket.off(event);
    console.log('Unsubscribed from: ', event);
  }
  var service = {
    listen,
    unlisten,
    socket
  };
  return service;
}

export default angular.module('omnitureInterceptorApp.socket', [])
  .service('socket', socketService)
  .name;
