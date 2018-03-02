(function() {
    'use strict';


    var myApp = angular.module('myApp', ['ngRoute', 'chart.js']);

    myApp.controller('mainController', mainController);

    mainController.$inject = ['$http', '$window', '$location'];

    // Main controller
    function mainController($http, $window, $location) {

        var vm = this;

        vm.auth = auth;
        vm.getFilesAndFolders = getFilesAndFolders;
        vm.convertBytesToGB = convertBytesToGB;

        init()

        /**
         * Init function that runs everytime this controller loads
         */
        function init() {
            getAccessTokenFromUrl();
        }

        /**
         * Retrieve the access_token from url string
         */
        function getAccessTokenFromUrl() {
            var url = $location.url();

            if (url.indexOf('=') !== -1) {
                vm.token = url.split('=')[1].split('&')[0]
                getAccount(vm.token);
                getFilesAndFolders(vm.token, '');
                getUsage(vm.token);
            }
        }

        /**
         * Function that receives a byte and converts it to a GB
         * @see: https://www.codexworld.com/how-to/convert-file-size-bytes-kb-mb-gb-javascript/
         */
        function convertBytesToGB(bytes, decimalPoint) {
            if (bytes == 0) return '0 Bytes';
            var k = 1000,
                dm = decimalPoint || 2,
                sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }

        /**
         * Return account information
         * TODO: Move this to a service
         */
        function getAccount(token) {
            $http.get('/api/dropbox/getAccount', {
                    params: {
                        token: token
                    }
                })
                .success(function(response) {
                    vm.account = response;
                });
        }

        /**
         * Return files and folders from dropbox based on file path
         * TODO: Move this to a service
         */
        function getFilesAndFolders(token, path) {
            $http.get('/api/dropbox/getFilesAndFolders', {
                    params: {
                        token: token,
                        path: path
                    }
                })
                .success(function(response) {
                    vm.filesAndFolders = response;
                });
        }

        /**
         * Get dropbox usage statistics
         * TODO: Move this to a service
         */
        function getUsage(token) {
            $http.get('/api/dropbox/getUsage', {
                    params: {
                        token: token
                    }
                })
                .success(function(response) {
                    vm.usage = response;
                });
        }

        /**
         * Auth function
         * TODO: Move this to an auth service
         */
        function auth() {
            $http.get('/api/dropbox/auth')
                .success(function(url) {
                    $window.location.href = url;
                });
        }

    }
}());
