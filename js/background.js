
// Cardy object for managing background operations
// TODO re-work dummy saving
var CardyBackground = {

    showNotification: function(card) {
        var opt = {
            type: 'basic',
            title: 'Saved',
            message: '"' + card.text.slice(0, 100) + '" - saved',
            iconUrl: 'img/saved.png'
        };
        chrome.notifications.create('', opt, function() {

        });
    },

    requestSelection: function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTabId = tabs[0].id;
            chrome.tabs.sendMessage(currentTabId, {'selection': true}, function(card) {
                CardyBackground.saveCardy(card);
            });
        });
    },

    // Save card into localstorage
    saveCardy: function(card) {
        if(card.text && card.text !== '') {
            chrome.storage.sync.get('cards', function(response) {
                var cards = response.cards || [];
                cards.push(card);
                chrome.storage.sync.set({'cards': cards});
                CardyBackground.showNotification(card);
            });
        }
    }
};

// Listen for keyboard command to save cardy
chrome.commands.onCommand.addListener(function(command) {
    CardyBackground.requestSelection();
});