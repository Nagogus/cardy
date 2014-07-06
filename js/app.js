
angular.module('app', []);

angular.module('app').run(function() {
});

angular.module('app').config( [
    '$compileProvider',
    function( $compileProvider )
    {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);

angular.module('app').controller('MainCtrl', function($scope, Storage) {

    $scope.newCard = {};
    $scope.search = {};


    $scope.init = function() {
        Storage.getCards().then(function(cards) {
            $scope.cards = cards;
        })
    };

    $scope.addCard = function(card) {
        card.date = new Date().getTime();
        Storage.addCard(card).then(function(cards) {
            $scope.cards = cards;
            $scope.newCard = {};
        });
    };

    $scope.removeCard = function(index) {
        Storage.removeCard(index).then(function(cards) {
            $scope.cards = cards;
        });
    };
});

angular.module('app').factory('Storage', function($q) {
    return {

        getCards: function() {
            var defer = $q.defer();
            chrome.storage.sync.get('cards', function(cards) {
                defer.resolve(cards.cards);
            });
            return defer.promise;
        },

        addCard: function(card) {
            var defer = $q.defer();
            chrome.storage.sync.get('cards', function(cards) {
                cards.cards.push(card);
                chrome.storage.sync.set({'cards': cards.cards});
                defer.resolve(cards.cards);
            });
            return defer.promise;
        },

        removeCard: function(index) {
            var defer = $q.defer();
            chrome.storage.sync.get('cards', function(cards) {
                cards.cards.splice(index, 1);
                chrome.storage.sync.set({'cards': cards.cards});
                defer.resolve(cards.cards);
            });
            return defer.promise;
        }
    }
});