angular.module('translator', [
    'translator.services',
    'translator.new_translation',
    'translator.translations_list',
    'ngRoute'
])
    .config(function($routeProvider) {
        $routeProvider
            .when('/new_translation', {
                templateUrl: 'app/new_translation/new_translation.html',
                controller: 'NewTranslation'
            })
            .when('/translations_list', {
                templateUrl: 'app/translations_list/translations_list.html',
                controller: 'TranslationsList'
            })
            .otherwise({
                redirectTo: '/translations_list'
            });
    })