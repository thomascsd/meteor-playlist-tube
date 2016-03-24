'use strict';
const app = angular.module('tubeApp');

app.controller('myYoutubeController', ['$scope','$mdToast', 'youtubeService', 'userDataService', myYoutubeController]);

/** Youtube controller */
function myYoutubeController($scope,$mdToast, youtubeService, userDataService) {
    $scope.items = [];
    var data = userDataService.tokenData();

    if (data && data.token) {
        //Has token
        getPlaylists(data.token);
    }

    $scope.login = function() {
        youtubeService.login().then(function(data) {
            //alert('myYoutubeController - token:' + token);
            userDataService.tokenData(data);
            getPlaylists(data.token);
        }).catch(function(data) {
            alert(JSON.stringify(data));
        });
    }

    //Add item to local playlist
    $scope.addItem = function(item) {
        var added = userDataService.list.add(item);
        if (!added) {
            $mdToast.showSimple(item.snippet.title + ' added');
        }
    };

    //go to playlistItems
    $scope.gotoDetail = function(item) {
        userDataService.currentPlaylistID = item.id;
        //Go to playlist items
        $scope.$emit('tube.detail');
        //$location.path('detail/' + item.id);
    };

    function getPlaylists(token) {
        //alert('exc getPlaylists');
        youtubeService.getPlaylists(token).then(function(data) {
            $scope.items = data.data.items;
        });
    }
}
