'use strict';
const app = angular.module('tubeApp');
let player = null;
let enableRepeatOne = false;

/** Youtube plyaer*/
app.directive('tubeYoutube', function($window) {
    return {
        restrict: "E",
        scope: {
            videoid: '@',
            playlistid: '@',
            index: '@'
        },
        template: '<div id="player"></div>',
        replace: true,
        link: function(scope, element, attrs) {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            tag.id = 'iframeApi';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            function playerReadyHandler() {
                player.loadPlaylist({
                    list: scope.playlistid,
                    listType: 'playlist',
                    index: scope.index
                });
                //player.playVideo();
            }

            function playerStateChangeHandler(e) {
                if (e.data === YT.PlayerState.ENDED) {
                    var pos = player.getPlaylistIndex();
                    if (enableRepeatOne) {
                        player.playVideoAt(pos - 1);
                    }
                    else {
                        scope.index = pos;
                        playerReadyHandler();
                    }

                }

            }

            function init() {
                var $container = $(element).parents('.container');
                var width = $container.width();
                var height = 0;

                if (width >= 600) {
                    width = 600;
                }
                height = width * (3 / 4);

                player = new YT.Player('player', {
                    playerVars: {
                        autoplay: 1,
                        html5: 1,
                        modesbranding: 0,
                        showinfo: 0,
                        controls: 1
                    },
                    height: height,
                    width: width,
                    events: {
                        'onReady': playerReadyHandler,
                        'onStateChange': playerStateChangeHandler,
                    }
                    //videoId: scope.videoid
                });

                scope.$on('tube.prev', function() {
                    player.previousVideo();
                });

                scope.$on('tube.next', function() {
                    player.nextVideo();
                });

                scope.$on('tube.repeat', function() {
                    enableRepeatOne = false;
                    player.setLoop(true);
                });

                scope.$on('tube.repeatOne', function() {
                    enableRepeatOne = true;
                });

                scope.$on('tube.repeatNone', function() {
                    enableRepeatOne = false;
                    player.setLoop(false);
                });

                scope.$on('tube.shuffle', function(e, data) {
                    player.setShuffle(data);
                });


            }

            if (player) {
                console.log('plyaer is not null, videoid:' + scope.videoid);
                init();
            }
            else {
                $window.onYouTubeIframeAPIReady = function() {
                    init();
                };
            }

        }
    }
});