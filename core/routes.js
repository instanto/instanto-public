'use strict';

angular.module('InstantoClient')
.config([    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

    $urlRouterProvider.otherwise('/welcome');

    $stateProvider
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'core/welcome/welcome-view.html',
            controller: 'WelcomeCtrl'
        })

        .state('projects', {
            url: '/projects/financed',
            templateUrl: 'core/projects/projects-view.html',
            controller: 'ProjectsCtrl'
        })

        .state('student-works', {
            url: '/projects/student_works',
            templateUrl: 'core/projects/student-works-view.html',
            controller: 'StudentWorksCtrl'
        })

        .state('members', {
            url: '/members',
            templateUrl: 'core/members/members-view.html',
            controller: 'MembersCtrl'
        })

        .state('member-detail', {
            url: '/members/team/{id:int}',
            templateUrl: 'core/members/member-detail-view.html',
            controller: 'MemberDetailCtrl'
        })

        .state('partner-detail', {
            url: '/members/partner/{id:int}',
            templateUrl: 'core/members/partner-detail-view.html',
            controller: 'PartnerDetailCtrl'
        })

        .state('research', {
            url: '/research',
            templateUrl: 'core/research/research-view.html',
            controller: 'ResearchCtrl'
        })

        .state('research-detail', {
            url: '/research/line/{id:int}',
            templateUrl: 'core/research/research-detail-view.html',
            controller: 'ResearchDetailCtrl'
        })

        .state('publications', {
            url: '/publications',
            templateUrl: 'core/publications/publications-view.html',
            controller: 'PublicationsCtrl'
        })

        .state('publication-detail', {
            url: '/publications/{title:string}',
            templateUrl: 'core/publications/publications-view.html',
            controller: 'PublicationsCtrl'
        })

        .state('press', {
            url: '/press',
            templateUrl: 'core/press/press-view.html',
            controller: 'PressCtrl'
        });

}])
.controller('MainNavbarCtrl', ['$scope', '$location', '$state',
                      function ($scope,   $location,   $state) {

    $scope.mainNavRoutes = [
        { state: 'projects' },
        { state: 'members' },
        { state: 'research' },
        { state: 'publications' },
        { state: 'press' }
    ];

    // $scope.routeTo = function (stateName) {
    //     $state.go(stateName);
    // };

    $scope.routeContains = function (stateName) {
        if ($state.is(stateName) === true || 
            $location.path().indexOf('/' + stateName + '/') !== -1) {
            return true;
        }
        return false;
    }

}]);
