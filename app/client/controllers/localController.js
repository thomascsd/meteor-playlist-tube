'use strict';

const app = angular.module('tubeApp');

app.controller('localController', ['$scope', 'youtubeService', 'userDataService', localController]);

/** Local controller */
function localController($scope, youtubeService, userDataService) {
    const token = userDataService.token();
    var newToken;
    const list = userDataService.list;
    $scope.items = list.getItems();

    if (token) {
        /*if (appConfig.debug) {
            //取得token值，不一樣時做替換
            newToken = youtubeService.getToken();
            if (newToken !== token) {
                token = newToken;
                userDataService.token(token);
            }

        }*/

    } else if (youtubeService.isLogingIn()) {
        youtubeService.getToken().then(function(data) {
            userDataService.token(data);
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
