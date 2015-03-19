angular.module('UranusClient')
.factory('PartnersSrv', ['$http', 'CONST', 
               function ($http,   CONST) {

    var baseUrl = CONST.apiUrl + 'partners/',
        PartnersSrv = {};

    PartnersSrv.getById = function (id) {
        return $http.get(baseUrl + id, { cache: true });
    };
                   
    PartnersSrv.getMembers = function (id) {
        return $http.get(baseUrl + id + '/members', { cache: true });
    };

    PartnersSrv.getResearchLines = function (id) {
        return $http.get(baseUrl + id + '/researchlines', { cache: true });
    };
 
    /*

    PartnersSrv.partnerGetAll = function () {
        return $http.get(baseUrl);
    };

    */

    return PartnersSrv;
}]);