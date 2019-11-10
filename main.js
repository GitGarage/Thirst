  chrome.storage.sync.get('delay', function(data) {
var submitButtons = document.querySelectorAll("[type=submit]:enabled");
var onClicks = [];
var submitTimers = [];
var displays = [];
var buttonTexts = [];
var thisWindow = window;
var oldButtons = document.querySelectorAll(".OldThirstButton");
for (var i = 0; i < oldButtons.length; i++) {
    oldButtons[i].nextSibling.style.display = oldButtons[i].style.display;
    oldButtons[i].parentNode.removeChild(oldButtons[i]);
}

for (var i = 0; i < submitButtons.length; i++) {
    var tag = submitButtons[i].tagName;
    var newButton = document.createElement(tag);
    newButton.innerHTML = submitButtons[i].innerHTML;
    var buttonClass = submitButtons[i].getAttribute("class");
    buttonClass && newButton.setAttribute("class", buttonClass);
    submitButtons[i].style.display = "none";
    submitButtons[i].parentElement.insertBefore(newButton, submitButtons[i]);
    newButton.setAttribute("timerNumber", i);
    newButton.setAttribute("type", "button");
	newButton.className += " OldThirstButton";
    newButton.onclick = undefined;
    newButton.addEventListener("click", function(event) {
        var element = event.target;
        var thisTimer = element.getAttribute("timerNumber");
        if (element.getAttribute("countingDown")) {
            clearInterval(submitTimers[thisTimer]);
            element.innerHTML = element.nextSibling.innerHTML;
            newButton.setAttribute("type", "button");
            element.removeAttribute("countingDown");
        } else {
            element.setAttribute("countingDown", true);
            element.innerHTML = data.delay;
                if (element.innerHTML < 1) {
                    clearInterval(submitTimers[thisTimer]);
                    element.nextSibling.click();
                    element.innerHTML = element.nextSibling.innerHTML;
                    newButton.setAttribute("type", "button");
                    element.removeAttribute("countingDown");
                }
            submitTimers[thisTimer] = setInterval(function() {
                element.innerHTML--;
                if (element.innerHTML < 1) {
                    clearInterval(submitTimers[thisTimer]);
                    element.nextSibling.click();
                    element.innerHTML = element.nextSibling.innerHTML;
                    newButton.setAttribute("type", "button");
                    element.removeAttribute("countingDown");
                }
            }, 1000);
        }
        return false;
    });
}  });