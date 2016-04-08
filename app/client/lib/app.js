'use strict';
'global angular';

let app = angular.module('tubeApp', ['angular-meteor', 'ngMaterial', 'ngStorage', 'infinite-scroll', 'heightAutoResizer']);

app.config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('purple')
        .accentPalette('brown');
}]);