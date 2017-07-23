'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('omnitureInterceptorApp.util', [])
  .factory('Util', UtilService)
  .name;
