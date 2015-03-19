angular.module('UranusClient')
.factory('ProjectsSrv', ['$http', 'CONST', 
                function ($http,   CONST) {

    var baseUrl = CONST.apiUrl + 'financedprojects/',
        ProjectsSrv = {};

    ProjectsSrv.getAll = function () {
        return $http.get(baseUrl);
    };

    ProjectsSrv.getPrimaryFundingBody = function (bodyId) {
        return $http.get(CONST.apiUrl + 'fundingbodies/' + bodyId, { cache: true });
    };

    ProjectsSrv.getSecondaryFundingBodies = function (id) {
        return $http.get(baseUrl + id + '/secondaryfundingbodies', { cache: true });
    };

    ProjectsSrv.getSecondaryLeaders = function (id) {
        return $http.get(baseUrl + id + '/secondaryleaders', { cache: true });
    };
                    
    /*
    ProjectsSrv.financedProjectGetById = function (id) {
        return $http.get(baseUrl + id);
    };

    ProjectsSrv.financedProjectGetResearchLines = function (id) {
        return $http.get(baseUrl + id + '/researchlines');
    };

    ProjectsSrv.financedProjectGetMembers = function (id) {
        return $http.get(baseUrl + id + '/members');
    };
    
    */

    return ProjectsSrv;
}]);