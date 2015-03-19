angular.module('UranusClient')
.factory('StatusesSrv', ['$http', 'CONST', 
                function ($http,   CONST) {

    var baseUrl = CONST.apiUrl + 'statuses/',
        StatusesSrv = {};

    StatusesSrv.getById = function (id) {
        return $http.get(baseUrl + id, { cache: true });
    };

    /*

    StatusesSrv.statusGetAll = function () {
        return $http.get(baseUrl);
    };

    StatusesSrv.statusGetPrimaryMembers = function (id) {
        return $http.get(baseUrl + '/' + id + '/primarymembers');
    };

    StatusesSrv.statusGetSecondaryMembers = function (id) {
        return $http.get(baseUrl + '/' + id + '/secondarymembers');
    };

    */

    return StatusesSrv;
}]);