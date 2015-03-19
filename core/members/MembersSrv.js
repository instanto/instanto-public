angular.module('InstantoClient')
.factory('MembersSrv', ['$http', 'CONST', 
               function ($http,   CONST) {

    var baseUrl = CONST.apiUrl + 'members/',
        MembersSrv = {};

    MembersSrv.getAll = function () {
        return $http.get(baseUrl);
    };

    MembersSrv.getById = function (id) {
        return $http.get(baseUrl + id, { cache: true });
    };

    // Putting this function in the Service in order to share it between controllers
    MembersSrv.reshape = function (memberList) {
        angular.forEach(memberList, function (member) {
            member.photo = member.photo ? CONST.apiUrl + 'media/' + member.photo : '';
            member.cv = member.cv ? CONST.apiUrl + 'media/' + member.cv : '';
            member.year_in = member.year_in ? member.year_in : '-';
            member.year_out = member.year_out ? member.year_out : '-';
            member.vFullname = member.last_name + ', ' + member.first_name;
        });

        return memberList;
    };

    MembersSrv.reshapePartners = function (memberList) {
        angular.forEach(memberList, function (member) {
            member.logo = member.logo ? CONST.apiUrl + 'media/' + member.logo : '';
            member.same_department = member.same_department ? 'Yes' : 'No';
        });

        return memberList;
    };

    // Partners
                   
    MembersSrv.getAllPartners = function (id) {
        return $http.get(CONST.apiUrl + 'partners', { cache: true });
    };

    MembersSrv.getPrimaryPublications = function (id) {
        return $http.get(baseUrl + id + '/primarypublications', { cache: true });
    };

    MembersSrv.getSecondaryPublications = function (id) {
        return $http.get(baseUrl + id + '/secondarypublications', { cache: true });
    };

    MembersSrv.getStudentWorks = function (id) {
        return $http.get(baseUrl + id + '/studentworks', { cache: true });
    };

    MembersSrv.getFinancedProjects = function (id) {
        return $http.get(baseUrl + id + '/financedprojects', { cache: true });
    };

    MembersSrv.getPrimaryLeaderedFinancedProjects = function (id) {
        return $http.get(baseUrl + id + '/primaryleaderedfinancedprojects', { cache: true });
    };

    MembersSrv.getResearchLines = function (id) {
        return $http.get(baseUrl + id + '/researchlines', { cache: true });
    };

    MembersSrv.getPartners = function (id) {
        return $http.get(baseUrl + id + '/partners', { cache: true });
    };


    // MembersSrv.getPhoto = function (photoName) {
    //     return $http.get(CONST.apiUrl + 'media/' + photoName);
    // };

    /*

    MembersSrv.getPrimaryLeaderedFinancedProjects = function (id) {
        return $http.get(baseUrl + '/' + id + '/primaryleaderedfinancedprojects', { cache: true });
    };

    MembersSrv.getSecondaryStatuses = function (id) {
        return $http.get(baseUrl + '/' + id + '/secondarystatuses', { cache: true });
    };

    MembersSrv.getFinancedProjects = function (id) {
        return $http.get(baseUrl + '/' + id + '/financedprojects', { cache: true });
    };

    MembersSrv.getSecondaryLeaderedFinancedProjects = function (id) {
        return $http.get(baseUrl + '/' + id + '/secondaryleaderedfinancedprojects', { cache: true });
    };

    */

    return MembersSrv;
}]);
