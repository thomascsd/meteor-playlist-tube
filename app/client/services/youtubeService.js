const app = angular.module('tubeApp');


/** 連結Youtube的service */
app.factory('youtubeService', ['$http', '$cordovaOauth', '$q', 'appConfig', function($http, $cordovaOauth, $q, appConfig) {
    const appscopes = [
        encodeURIComponent('https://www.googleapis.com/auth/youtube'),
        encodeURIComponent('https://www.googleapis.com/auth/youtube.readonly'),
        encodeURIComponent('https://www.googleapis.com/auth/youtubepartner')
    ];

    function PlaylistDetail(token, playlistID) {
        this.items = [];
        this.pageToken = '';
        this.isBusy = false;
        this.token = token;
        this.playlistID = playlistID;
        this.totalResults = 0;
        this.position = 0;
    }

    PlaylistDetail.prototype.list = function() {
        var self = this;
        if (this.isBusy) {
            return;
        }
        this.isBusy = true;

        if (this.totalResults !== 0 &&
            this.position !== 0 &&
            this.position === (this.totalResults - 1)) {
            //目前item的index到達集合的長度時，不取得資料
            this.isBusy = false;
            return;
        }


        var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=' + this.playlistID + '&access_token=' + this.token;

        if (this.pageToken) {
            url += '&pageToken=' + this.pageToken;
        }

        $http.get(url).then(function(data) {
            var yitems = data.data.items;
            Array.prototype.push.apply(self.items, yitems);
            self.pageToken = data.data.nextPageToken;
            self.isBusy = false;
            self.totalResults = data.data.pageInfo.totalResults;

            var lastItem = yitems[yitems.length - 1];
            self.position = lastItem.snippet.position;
        });

    }

    const service = {
        login: function() {
            var requestToken;

            if (!appConfig.debug) {
                var defer = $q.defer();

                //return $cordovaOauth.google(clientID, appscopes);
                var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + appConfig.clientID + '&redirect_uri=http://localhost/callback&scope=' + appscopes.join(" ") + '&approval_prompt=force&response_type=token', '_blank', 'location=no');

                ref.addEventListener('loadstart', function(event) {
                    if ((event.url).startsWith("http://localhost/callback")) {
                        requestToken = (event.url).split("access_token=")[1];

                        //alert('request token:' + requestToken);
                        //alert('appConfig.clientID:' + appConfig.clientID);
                        //alert('appConfig.clientSecret:' + appConfig.clientSecret);

                        defer.resolve(requestToken);
                        /*$http({
                                method: "post",
                                url: "https://accounts.google.com/o/oauth2/token",
                                data: "client_id=" + appConfig.clientID + "&client_secret=" + appConfig.clientSecret + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken
                            })
            .success(function (data) {
                                defer.resolve(data.access_token);
                            })
            .error(function (data, status) {
                                defer.reject("ERROR: " + data);
                            });*/

                        ref.close();
                    }
                });

                return defer.promise;
            } else {
                const url = 'https://accounts.google.com/o/oauth2/auth?client_id=' + appConfig.clientID +
                    '&redirect_uri=' + appConfig.host + '/callback&scope=' + appscopes.join(" ") +
                    '&approval_prompt=force&response_type=token';

                window.location.href = url;

            }

        },
        getToken: function() {
            let callbackResponse = window.location.href.split("#")[1];
            let responseParameters;
            let accessToken = null;

            if (callbackResponse) {
                responseParameters = callbackResponse.split("&");
                var parameterMap = {};
                for (var i = 0; i < responseParameters.length; i++) {
                    parameterMap[responseParameters[i].split("=")[0].replace('/', '')] = responseParameters[i].split("=")[1];
                }

                accessToken = parameterMap.access_token;
            }

            return accessToken;
        },

        refreshToken: function() {
            var url = '';
        },

        /** Get user's playlist */
        getPlaylists: function(token) {
            const url = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&mine=true&access_token=' + token;

            return $http.get(url);
        },

        /** Get playlist item list */
        getPlaylistDetail: function(token, playlistID) {
            return new PlaylistDetail(token, playlistID);
        },

        search: function() {

        }
    };

    return service;
}]);
