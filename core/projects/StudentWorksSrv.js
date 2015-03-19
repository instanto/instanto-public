angular.module('InstantoClient')

.factory('StudentWorksSrv', ['$http', 'CONST', 
                    function ($http,   CONST) {

    var baseUrl = CONST.apiUrl + 'studentworks/',
        StudentWorksSrv = {};
                    
    StudentWorksSrv.getAll = function () {
        return $http.get(baseUrl);
    };

    StudentWorksSrv.getResearchLines = function (id) {
        return $http.get(baseUrl + id + '/researchlines');
    };   

    /*
    StudentWorksSrv.getById = function (id) {
        return $http.get(baseUrl + id);
    };
    */
                        
    return StudentWorksSrv;
}])

.factory('StudentWorksTypesSrv', ['$http', 'CONST', 
                         function ($http,   CONST) {

    var baseUrl = CONST.apiUrl + 'studentworktypes/',
        StudentWorksTypesSrv = {};

    StudentWorksTypesSrv.getById = function (id) {
        return $http.get(baseUrl + id);
    };

    /*                
    StudentWorksTypesSrv.getAll = function () {
        return $http.get(baseUrl);
    };

    StudentWorksTypesSrv.getStudentWorks = function (id) {
        return $http.get(baseUrl + id + '/studentworks');
    };
    */

    return StudentWorksTypesSrv;
}]);
