'use strict';
/*global angular*/

angular
    .module('tubeApp', ['angular-meteor', 'ngMaterial', 'ngStorage', 'infinite-scroll', 'heightAutoResizer'])
    .config(appConfig);

appConfig.$inject = ['$mdThemingProvider'];

function appConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('purple')
        .accentPalette('brown');
}