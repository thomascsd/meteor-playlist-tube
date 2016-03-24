'use strict';

const app = angular.module('tubeApp');

app.controller('localController', ['$scope', 'youtubeService', 'userDataService', localController]);

/** Local controller */
function localController($scope, youtubeService, userDataService) {
    let data = userDataService.tokenData();
    const list = userDataService.list;
    $scope.items = list.getItems();

    if (data && data.token) {
        //if (appConfig.debug) {
        //取得token值，不一樣時做替換
        youtubeService.getToken().then((newData) => {
            if (data.token !== newData.token) {
                userDataService.tokenData(newData);
            }
        });


        //}

    }
    else if (youtubeService.isLogingIn()) {
        youtubeService.getToken().then((data) => {
            userDataService.tokenData(data);
        });
    }

    $scope.deleteItems = function() {
        list.deleteItems();
        $scope.items = list.getItems();
    };

    $scope.goDetail = function(item) {
        userDataService.currentPlaylistID = item.id;
        //Go to playlist items
        $scope.$emit('tube.detail');
        //$location.path('detail/' + item.id);
    };

    /** local playlist reload*/
    function reloadLocal() {
        $scope.items = list.getItems();
    }

    $scope.$on('tube.reloadLocal', reloadLocal);
    //$location.path('local');
}
