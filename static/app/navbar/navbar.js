
angular.module('translator.navbar', [])

  .controller('NavbarController', function ($scope, $location) {
    // $scope.translations = {};
    console.log('got herrrrrr')
    $scope.goTo = function(location) {
      console.log('got herrrr')
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