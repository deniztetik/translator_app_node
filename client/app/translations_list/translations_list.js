
angular.module('translator.translations_list', [])

    .controller('TranslationsListController', function ($scope, Translations) {
        $scope.data = {};
        $scope.getTranslations = function () {
            Translations.getAll()
                .then(function(translations) {
                    $scope.data.translations = translations;
                })
                .catch(function(error) {
                    console.error(error);
                });
        };
        $scope.getTranslations();
    });