angular.module('translator.services', [])
    .factory('Translations', function($http) {
        var getAll = function() {
            return $http({
                method: 'GET',
                url: '/api/translations'
            }).then(function(resp) {
                return resp.data;
            });
        };

        var addTranslation = function(text) {
            return $http({
                method: 'POST',
                url: '/api/translations',
                data: {original_lang_text: text}
            });
        };

        return {
            getAll: getAll,
            addTranslation: addTranslation
        };
    })