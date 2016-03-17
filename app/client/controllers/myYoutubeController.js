'use strict';
const app = angular.module('tubeApp');

app.controller('myYoutubeController', ['$scope', 'youtubeService', 'userDataService', myYoutubeController]);

/** Youtube controller */
function myYoutubeController($scope, youtubeService, userDataService) {
    $scope.items = [];
    var token = userDataService.token();
    var newToken;

    if (token) {
        //alert('token:' + token);

        /*if (appConfig.debug) {
            //取得token值，不一樣時做替換
            newToken = youtubeService.getToken();
            if (newToken !== token) {
                token = newToken;
                userDataService.token(token);
            }

        }*/

        //有token
        getPlaylists(token);
        //$location.path('playlist');

    }
    else {
        //無token
        /*if (appConfig.debug) {
            token = youtubeService.getToken();
            userDataService.token(token);
        }*/
        //$location.path('playlist');
    }

    $scope.login = function() {
        youtubeService.login().then(function(token) {
            //alert('myYoutubeController - token:' + token);
            userDataService.token(token);
            getPlaylists(token);
        }).catch(function(data) {
            alert(data);
        });
    }

    //Add item to local playlist
    $scope.addItem = function(item) {
        var added = userDataService.list.add(item);
        if (!added) {
            //toast(item.snippet.title + ' added', 3000);


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
