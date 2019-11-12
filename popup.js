Online JavaScript Beautifier (v1.10.2)
Beautify, unpack or deobfuscate JavaScript and HTML, make JSON/JSONP readable, etc.

All of the source code is completely free and open, available on GitHub under MIT licence, 
and we have a command-line version, python library and a node package as well.



 
 
 

HTML <style>, <script> formatting:


Additional Settings (JSON):


{}
  End script and style with newline? 
 Support e4x/jsx syntax 
 Use comma-first list style? 
 Detect packers and obfuscators? 
 Preserve inline braces/code blocks? 
 Keep array indentation? 
 Break lines on chained methods? 
 Space before conditional: "if(x)" / "if (x)" 
 Unescape printable chars encoded as \xNN or \uNNNN? 
 Use JSLint-happy formatting tweaks? 
 Indent <head> and <body> sections? 
 Keep indentation on empty lines? 
Use a simple textarea for code input?
Beautify Code (ctrl-enter)

chrome.storage.sync.get('delay', function(data) {
    chrome.storage.sync.get('active', function(active) {
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
                    element.innerHTML = active.active ? data.delay : 0;
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
        }
    });
});
1
let delaySeconds = document.getElementById('delaySeconds');
2
let setDelay = document.getElementById('setDelay');
3
let script = ['var submitButtons = document.querySelectorAll("[type=submit]:enabled"); var onClicks = []; var submitTimers = []; var displays = []; var buttonTexts = []; var thisWindow = window; var oldButtons = document.querySelectorAll(".OldThirstButton"); for (var i = 0; i < oldButtons.length; i++) { oldButtons[i].nextSibling.style.display = oldButtons[i].style.display; oldButtons[i].parentNode.removeChild(oldButtons[i]); } for (var i = 0; i < submitButtons.length; i++) { var tag = submitButtons[i].tagName; var newButton = document.createElement(tag); newButton.innerHTML = submitButtons[i].innerHTML; var buttonClass = submitButtons[i].getAttribute("class"); buttonClass && newButton.setAttribute("class", buttonClass); submitButtons[i].style.display = "none"; submitButtons[i].parentElement.insertBefore(newButton, submitButtons[i]); newButton.setAttribute("timerNumber", i); newButton.setAttribute("type", "button"); newButton.className += " OldThirstButton"; newButton.onclick = undefined; newButton.addEventListener("click", function(event) { var element = event.target; var thisTimer = element.getAttribute("timerNumber"); if (element.getAttribute("countingDown")) { clearInterval(submitTimers[thisTimer]); element.innerHTML = element.nextSibling.innerHTML; newButton.setAttribute("type", "button"); element.removeAttribute("countingDown"); } else { element.setAttribute("countingDown", true); element.innerHTML = ', '; if (element.innerHTML < 1) { clearInterval(submitTimers[thisTimer]); element.nextSibling.click(); element.innerHTML = element.nextSibling.innerHTML; newButton.setAttribute("type", "button"); element.removeAttribute("countingDown"); } submitTimers[thisTimer] = setInterval(function() { element.innerHTML--; if (element.innerHTML < 1) { clearInterval(submitTimers[thisTimer]); element.nextSibling.click(); element.innerHTML = element.nextSibling.innerHTML; newButton.setAttribute("type", "button"); element.removeAttribute("countingDown"); } }, 1000); } return false; }); }'];
4
let tab = undefined;
5
let active = false;
6
let first = true;
7
​
8
chrome.storage.sync.get('delay', function(data) {
9
    delaySeconds.setAttribute('value', data.delay || 60);
10
    chrome.storage.sync.get('active', function(data) {
11
        active = data.active;
12
        console.log(active);
13
        $('#active').bootstrapToggle(active ? 'on' : 'off');
14
        chrome.tabs.query({
15
            active: true,
16
            currentWindow: true
17
        }, function(tabs) {
18
            tab = tabs[0].id;
19
        });
20
    });
21
});
22
​
23
setDelay.onclick = function() {
24
    let delay = {
25
        "delay": delaySeconds.value
26
    };
27
    chrome.storage.sync.set(delay, function() {
28
        chrome.tabs.executeScript(
29
            tab, {
30
                code: script.join(active ? delaySeconds.value : 0)
31
            });
32
        window.close();
33
    });
34
};
35
​
36
delaySeconds.addEventListener("keyup", function(event) {
37
    if (event.keyCode === 13) {
38
        event.preventDefault();
39
        setDelay.click();
40
    }
41
});
42
​
43
$('#active').change(function() {
44
    active = $(this).prop('checked');
45
    let datas = {
46
        "active": active
47
    };
48
    chrome.storage.sync.set(datas, function() {
49
        chrome.tabs.executeScript(
50
            tab, {
51
                code: script.join(active ? delaySeconds.value : 0)
52
            });
53
    });
54
});
Beautify Code (ctrl-enter)
Your Selected Options (JSON):


{
  "indent_size": "4",
  "indent_char": " ",
  "max_preserve_newlines": "5",
  "preserve_newlines": true,
  "keep_array_indentation": false,
  "break_chained_methods": false,
  "indent_scripts": "normal",
  "brace_style": "collapse",
  "space_before_conditional": true,
  "unescape_strings": false,
  "jslint_happy": false,
  "end_with_newline": false,
  "wrap_line_length": "0",
  "indent_inner_html": false,
  "comma_first": false,
  "e4x": false,
  "indent_empty_lines": false
}
Not pretty enough for you?  Report a problem with this input

Browser extensions and other uses
A bookmarklet (drag it to your bookmarks) by Ichiro Hiroshi to see all scripts used on the page,
Chrome, in case the built-in CSS and javascript formatting isn't enough for you:
— Quick source viewer by Tomi Mickelsson (github, blog),
— Javascript and CSS Code beautifier by c7sky,
— jsbeautify-for-chrome by Tom Rix (github),
— Pretty Beautiful JavaScript by Will McSweeney
— Stackoverflow Code Beautify by Making Odd Edit Studios (github).
Firefox: Javascript deminifier by Ben Murphy, to be used together with the firebug (github),
Safari: Safari extension by Sandro Padin,
Opera: Readable JavaScript (github) by Dither,
Opera: Source extension by Deathamns,
Sublime Text 2/3: CodeFormatter, a python plugin by Avtandil Kikabidze, supports HTML, CSS, JS and a bunch of other languages,
Sublime Text 2/3: HTMLPrettify, a javascript plugin by Victor Porof,
Sublime Text 2: JsFormat, a javascript formatting plugin for this nice editor by Davis Clark,
vim: sourcebeautify.vim, a plugin by michalliu (requires node.js, V8, SpiderMonkey or cscript js engine),
vim: vim-jsbeautify, a plugin by Maksim Ryzhikov (node.js or V8 required),
Emacs: Web-beautify formatting package by Yasuyuki Oka,
Komodo IDE: Beautify-js addon by Bob de Haas (github),
C#: ghost6991 ported the javascript formatter to C#,
Go: ditashi has ported the javascript formatter to golang,
Beautify plugin (github) by HookyQR for the Visual Studio Code IDE,
Fiddler proxy: JavaScript Formatter addon,
gEdit tips by Fabio Nagao,
Akelpad extension by Infocatcher,
Beautifier in Emacs write-up by Seth Mason,
Cloud9, a lovely IDE running in a browser, working in the node/cloud, uses jsbeautifier (github),
Devenir Hacker App, a non-free JavaScript packer for Mac,
REST Console, a request debugging tool for Chrome, beautifies JSON responses (github),
mitmproxy, a nifty SSL-capable HTTP proxy, provides pretty javascript responses (github).
wakanda, a neat IDE for web and mobile applications has a Beautifier extension (github).
Burp Suite now has a beautfier extension, thanks to Soroush Dalili,
Netbeans jsbeautify plugin by Drew Hamlett (github).
brackets-beautify-extension for Adobe Brackets by Drew Hamlett (github),
codecaddy.net, a collection of webdev-related tools, assembled by Darik Hall,
editey.com, an interesting and free Google-Drive oriented editor uses this beautifier,
a beautifier plugin for Grunt by Vishal Kadam,
SynWrite editor has a JsFormat plugin (rar, readme),
LIVEditor, a live-editing HTML/CSS/JS IDE (commercial, Windows-only) uses the library,
Doing anything interesting? Write us to team@beautifier.io so we can add your project to the list.

Written by Einar Lielmanis, maintained and evolved by Liam Newman.

We use the wonderful CodeMirror syntax highlighting editor, written by Marijn Haverbeke.

Made with a great help of Jason Diamond, Patrick Hof, Nochum Sossonko, Andreas Schneider, 
Dave Vasilevsky, Vital Batmanov, Ron Baldwin, Gabriel Harrison, Chris J. Shull, Mathias Bynens, 
Vittorio Gambaletta, Stefano Sanfilippo and Daniel Stockman.

Run the tests
