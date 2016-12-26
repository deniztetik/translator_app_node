
angular.module('translator.new_translation', [])

  .controller('NewTranslationController', function ($scope, Translations) {
    $scope.phrase = '';
    $scope.translation = '';
    $scope.detectedSourceLang = '';
    $scope.addTranslation = function () {
      Translations.addTranslation($scope.phrase)
        .then(function(translation) {
          $scope.translation = translation.data[0].fields.eng_translation;
          $scope.detectedSourceLang = translation.data[0].fields.original_lang;
        })
        .catch(function(error) {
          console.error(error);
        });
    };
  });