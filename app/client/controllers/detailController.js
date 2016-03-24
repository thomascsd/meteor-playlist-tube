'use strict';

const app = angular.module('tubeApp');

app.controller('detailController', ['$scope', 'youtubeService', 'userDataService', detailController]);


/** Playlist detail controller */
function detailController($scope, youtubeService, userDataService) {
    var data = userDataService.tokenData();
    var playlistID = userDataService.currentPlaylistID;

    $scope.detail = youtubeService.getPlaylistDetail(data.token, playlistID);

    $scope.goBack = function() {
        $scope.$emit('tube.goBack');
    }

    $scope.playVideo = function(item) {
        userDataService.currentVideo = {
            id: item.snippet.resourceId.videoId,
            index: item.snippet.position
        };
        //Go to play video page
        $scope.$emit('tube.video');
        //$location.path('video/' + item.snippet.resourceId.videoId);
    }

}