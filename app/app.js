(function () {
    'use strict';

    angular.module('app', []);

    angular.module('app')
        .controller('AppController', AppController);

    angular.module('app')
        .factory('csv', csv);

    ///////////

    function AppController(csv, $log, $window) {
        // google search: angularjs file download client side safari

        var vm = this;

        // functions
        vm.get = get;

        //////
        function get() {
            console.log(!!new Blob);

            csv.get()
                .then(function (data) {
                    $log.debug(data);

                    if (!Blob) {
                        $window.alert('Blob is missing');
                        return;
                    }

                    var bytes = new Uint8Array(data.length);
                    for (var i = 0; i < data.length; i++) {
                        bytes[i] = data.charCodeAt(i);
                    }

                    var blob = new Blob([bytes], {type: 'text/csv'});

                    saveAs(blob, 'report.csv');
                })
                .catch(function (err) {
                    $window.alert('Drat! Something went wrong: ' + err.message);
                    $log.error(err);
                });
        }
    }

    function csv($http) {
        this.get = get;

        return this;

        /////
        function get() {
            return new Promise(function (resolve, reject) {
                $http.get('http://localhost:7777/api/csv')
                    .then(function (data) {
                        resolve(data.data);
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        }
    }
})();
