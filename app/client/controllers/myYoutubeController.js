'use strict';
angular
    .module('tubeApp')
    .controller('myYoutubeController', myYoutubeController);

myYoutubeController.$inject = ['$scope', '$mdToast', 'youtubeService', 'userDataService'];

/** Youtube controller */
function myYoutubeController($scope, $mdToast, youtubeService, userDataService) {
    const vm = this;
    var data = userDataService.tokenData();

    vm.items = [];

    if (data && data.token) {
        //Has token
        getPlaylists(data.token);
    }

    vm.login = login;

    //Add item to local playlist
    vm.addItem = addItem;

    //go to playlistItems
    vm.gotoDetail = gotoDetail;

    function login() {
        youtubeService.login().then(function (data) {
            //alert('myYoutubeController - token:' + token);
            userDataService.tokenData(data);
            getPlaylists(data.token);
        }).catch(function (data) {
            alert(JSON.stringify(data));
        });
    }

    function addItem(item) {
        var added = userDataService.list.add('P', item);
        if (!added) {
            $mdToast.showSimple(item.snippet.title + ' added');
        }
    }

    function gotoDetail(item) {
        userDataService.currentPlaylist = item;
        //Go to playlist items
        $scope.$emit('tube.detail');
        //$location.path('detail/' + item.id);
    }

    function getPlaylists(token) {
        //alert('exc getPlaylists');
        youtubeService.getPlaylists(token).then(function (data) {
            vm.items = data.data.items;
        });
    }
}
