'use strict';

const app = angular.module('tubeApp');

app.controller('localController', ['$scope', 'youtubeService', 'userDataService', 'appConfig', localController]);

/** Local controller */
function localController($scope, youtubeService, userDataService, appConfig) {
    var token = userDataService.token();
    var newToken;
    $scope.debug = appConfig.debug;
    $scope.items = userDataService.list.getItems();

    if (token) {
        if (appConfig.debug) {
            //取得token值，不一樣時做替換
            newToken = youtubeService.getToken();
            if (newToken !== token) {
                token = newToken;
                userDataService.token(token);
            }

        }

    }

    $scope.deleteItems = function() {
        userDataService.list.deleteItems();
        $scope.items = userDataService.list.getItems();
    };

    $scope.goDetail = function(item) {
        userDataService.currentPlaylistID = item.id;
        //Go to playlist items
        $scope.$emit('tube.detail');
        //$location.path('detail/' + item.id);
    };

    /** local playlist reload*/
    function reloadLocal() {
        $scope.items = userDataService.list.getItems();
    }

    $scope.$on('tube.reloadLocal', reloadLocal);
    //$location.path('local');
}