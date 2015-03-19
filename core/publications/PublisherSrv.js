angular.module('UranusClient')
.factory('PublisherSrv', ['$http', 'CONST',
                function ($http,   CONST) {

    var urlBase = CONST.apiUrl + 'publishers/',
        PublisherSrv = {};
    
    PublisherSrv.getAll = function () {
        return $http.get(urlBase);        
    };

    PublisherSrv.getById = function (id) {
        return $http.get(urlBase + id, { cache: true });
    };

    /*

    PublisherSrv.publisherCreate = function (publisher) {
        return $http.post(urlBase, publisher);
    };

    PublisherSrv.publisherUpdate = function (publisher) {
        return $http.put(urlBase + '/' + publisher.id, publisher)
    };

    PublisherSrv.publisherDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    PublisherSrv.publisherGetPublications = function (id) {
        return $http.get(urlBase + '/' + id + '/publications');
    };
    
    */
    
    return PublisherSrv;
}]);