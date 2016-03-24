'use strict';

const app = angular.module('tubeApp');

app.controller('localController', ['$scope', 'youtubeService', 'userDataService', localController]);

/** Local controller */
function localController($scope, youtubeService, userDataService) {
    const list = userDataService.list;
    $scope.items = list.getItems();

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
