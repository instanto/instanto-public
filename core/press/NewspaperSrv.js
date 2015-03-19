angular.module('InstantoClient')
.factory('NewspaperSrv', ['$http', 'CONST',
                function ($http,   CONST) {

    var urlBase = CONST.apiUrl + 'newspapers/',
        NewspaperSrv = {};
    
    NewspaperSrv.getAll = function () {
        return $http.get(urlBase);        
    };

    NewspaperSrv.getById = function (id) {
        return $http.get(urlBase + id, { cache: true });
    };
                    
    NewspaperSrv.getArticles = function (id) {
        return $http.get(urlBase + id + '/articles');
    };

    NewspaperSrv.getPrimaryMembers = function (id) {
        return $http.get(urlBase + id + '/primarymembers');
    };

    NewspaperSrv.getSecondaryMembers = function (id) {
        return $http.get(urlBase + id + '/secondarymembers');
    };

    return NewspaperSrv;
}]);
