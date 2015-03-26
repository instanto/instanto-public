angular.module('InstantoClient')
.factory('PublicationsSrv', ['$http', 'CONST',
                    function ($http,   CONST) {

    var urlBase = CONST.apiUrl + 'publications/',
        PublicationsSrv = {};
    
    PublicationsSrv.getAll = function () {
        return $http.get(urlBase);        
    };
                        
    PublicationsSrv.getSecondaryAuthors = function (id) {
        return $http.get(urlBase + id + '/secondaryauthors');
    };

    
    var typeUrlBase = CONST.apiUrl + 'publicationtypes/';

    PublicationsSrv.geTypeById = function (id) {
        return $http.get(typeUrlBase + id, { cache: true });
    };
                        
    PublicationsSrv.getAllTypes = function () {
        return $http.get(typeUrlBase);
    };

    /*

    PublicationsSrv.getById = function (id) {
        return $http.get(urlBase + id);
    };

    PublicationsSrv.getResearchLines = function (id) {
        return $http.get(urlBase + id + '/researchlines');
    };

    publicationTypeFactory.publicationTypeGetPublications = function (id) {
        return $http.get(urlBase + id + '/publications');
    };
    
    */
    
    return PublicationsSrv;
}]);
