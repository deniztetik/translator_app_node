
angular.module('translator.navbar', [])

  .controller('NavbarController', function ($scope, $location) {
    // $scope.translations = {};
    $scope.goTo = function(location) {
      $location.path('/' + location);
    }
    //   Translations.getAll()
    //     .then(function(translations) {
    //       $scope.translations = translations;
    //     })
    //     .catch(function(error) {
    //       console.error(error);
    //     });
    // };
    // $scope.getTranslations();
  });