'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import {
  routeConfig
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket.service';

import './app.css';

angular.module('omnitureInterceptorApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap,
  navbar, footer, main, constants, util, socket
])
  .config(routeConfig)
  .directive('grow', /*@ngInject*/ $window => {
    function resize(elem, attrs) {
      var height = $window.innerHeight;
      var offset = attrs.offset || 0;
      elem.css('height', (height - offset) + 'px');
    }
    return {
      link: (scope, elem, attrs) => {
        resize(elem, attrs);
        angular.element($window).on('resize', () => {
          resize(elem, attrs);
        });
      }
    };
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['omnitureInterceptorApp'], {
      strictDi: true
    });
  });
