angular.module('translator', [
    'translator.services',
    // 'translator.new_translation',
    'translator.translations_list',
    'ngRoute'
])
    .config(function($routeProvider) {
        $routeProvider
            .when('/translations_list', {
                templateUrl: '/static/app/translations_list/translations_list.html',
                controller: 'TranslationsListController'
            })
            .otherwise({
                redirectTo: '/translations_list'
            });
    })