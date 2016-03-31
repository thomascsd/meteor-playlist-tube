'use strict';

const app = angular.module('tubeApp');

app.controller('localController', ['$scope', 'youtubeService', 'userDataService', localController]);

/** Local controller */
function localController($scope, youtubeService, userDataService) {
    const list = userDataService.list;
    $scope.items = list.getItems();

    $scope.clear = function() {
        userDataService.clear();
        $scope.items = list.getItems();
    };

    $scope.goDetail = function(item) {
        userDataService.currentPlaylistID = item.id;
        //Go to playlist items
        $scope.$emit('tube.detail');
        //$location.path('detail/' + item.id);
    };

    $scope.delete = function(item) {
        list.deleteItem(item);
        reloadLocal();
    }

    /** local playlist reload*/
    function reloadLocal() {
        $scope.items = list.getItems();
    }

    $scope.$on('tube.reloadLocal', reloadLocal);
    //$location.path('local');
}
