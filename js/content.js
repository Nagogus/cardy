
// Object for managing cardy operations in content
var CardyContent = {
    getSelection: function() {
        if (window.getSelection) {
            var range = window.getSelection();
            return range;
        }
    }
};

// Listening for short cut event fired, to get selection
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.selection && request.selection === true) {
        var description = prompt("Please enter short description", "");

        if(description !== null) {
            var selection = CardyContent.getSelection().toString();
            console.log(new Date());
            sendResponse({'text': selection, 'description': description, 'date': new Date().getTime()});
        }
    }
});