'use strict';

angular
    .module('tubeApp')
    .controller('searchController', searchController);

searchController.$inject = ['youtubeService'];

function searchController(youtubeService) {
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

    function addItem(item) {

    }

    function closeDialog() {

    }

}