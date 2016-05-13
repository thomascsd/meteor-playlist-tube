'use strict';

angular
    .module('tubeApp')
    .controller('searchController', searchController);

searchController.$inject = ['$mdDialog', 'youtubeService', 'userDataService'];

function searchController($mdDialog, youtubeService, userDataService) {
    const vm = this;

    vm.items = [];
    vm.searchYoutube = searchYoutube;
    vm.closeDialog = closeDialog;
    vm.addItem = addItem;

    function searchYoutube(e) {
        e.preventDefault();

        youtubeService.search(vm.queryText).then(function(data) {
            vm.items = data;
        });

    }

    function addItem(type, item) {
        const added = userDataService.addItem(type, item);

        if (!added) {
            $mdToast.showSimple(item.snippet.title + ' added');
        }
    }

    function closeDialog() {
        $mdDialog.cancel();
    }

}