# SCP-Mod
Enhancement mods for SCP

###### Added Features:
1. 	Expand conversation history on load of SCP issue page
2. 	Highlight (default) and/or add label to SUMMARY & Complexity Notes in SCP issue page 
3.	Scroll to Request Details, Conversations & Request Properties section

###### Instructions for use:
1. Install Tampermonkey Add-on to your browser from below links.
* *For Firefox* : https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/?src=search
* *For Chrome* : https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en

2. Click the Add-on icon, which should appear in the upper right corner of the browser, then click 'Create a new script', and add the following code:
```javascript
// ==UserScript==
// @name     	SCP Mod
// @version  	1.1.0
// @description  Expands conversation history on load of SCP issue page, Highlighs SUMMARY & Complexity Notes in SCP issue page
// @author      Oni
// @match 		https://scp.quintiq.com/WorkOrder.do?woMode=viewWO&woID=*
// @match 		https://scp.quintiq.com/AddResolution.do*
// @require		http://code.jquery.com/jquery-latest.js
// @require		https://raw.githubusercontent.com/Onishim/SCP-Mod/master/scp_mod.js
// ==/UserScript==

/**
 * set to 'true' to enable feature, or 'false' to disable feature
 */
var user_highlight = true;
var user_label = true;
```
3. Save the changes. You're good to go.
