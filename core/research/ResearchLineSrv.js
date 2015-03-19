angular.module('UranusClient')
.factory('ResearchLineSrv', ['$http', 'CONST',
                    function ($http,   CONST) {

    var urlBase = CONST.apiUrl + 'researchlines/',
        ResearchLineSrv = {};
    
    ResearchLineSrv.getAll = function () {
        return $http.get(urlBase);
    };

    ResearchLineSrv.getById = function (id) {
        return $http.get(urlBase + id, { cache: true });
    };

    ResearchLineSrv.getFinancedProjects = function (id) {
        return $http.get(urlBase + id + '/financedprojects', { cache: true });
    };

    ResearchLineSrv.getArticles = function (id) {
        return $http.get(urlBase + id + '/articles', { cache: true });
    };

    ResearchLineSrv.getPartners = function (id) {
        return $http.get(urlBase + id + '/partners', { cache: true });
    };

    ResearchLineSrv.getMembers = function (id) {
        return $http.get(urlBase + id + '/members', { cache: true });
    };

    ResearchLineSrv.getPublications = function (id) {
        return $http.get(urlBase + id + '/publications', { cache: true });
    };

    ResearchLineSrv.getStudentWorks = function (id) {
        return $http.get(urlBase + id + '/studentworks', { cache: true });
    };

    ResearchLineSrv.getSecondaryResearchAreas = function (id) {
        return $http.get(urlBase + id + '/secondaryresearchareas', { cache: true });
    };

    return ResearchLineSrv;
}]);