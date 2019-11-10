  chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            css: ["[type='submit']:enabled"]
          })],
            actions: [
        new chrome.declarativeContent.RequestContentScript({
          js: ['main.js']
        })
      ]
      }]);
    });
  });
