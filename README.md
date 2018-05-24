# SCP-Mod
#### *Enhancement mods for SCP*

###### Added Features:
0.  Custom SCP Tab Title - show ID and/or Subject, Product
1. 	Expand conversation history on load of SCP issue page
2. 	Highlight (default) and/or add label to SUMMARY & Complexity Notes in SCP issue page 
3.	Scroll to Request Details, Conversations & Request Properties section
4.  Add new or find existing SUMMARY/Complexity note

###### Instructions for use:
1. Install Tampermonkey Add-on to your browser from below links.
    * [*Firefox Add-on*](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/?src=search)
    * [*Chrome Extension*](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)

2. Click this [**Installation Link**](https://github.com/Onishim/SCP-Mod/raw/master/SCP%20Mod.user.js) to install/update the userscript on your browser.
   
   Or, you can do it **manually**:
   
   Click the Add-on icon, which should appear in the upper right corner of the browser, then click:
    * **Create a new script...** - if you are adding this for the first time.
    * **Dashboard** - if you already have this and would like to edit it. In Dashboard select 'SCP Mod' to edit.

   Then copy the codes from *SCP Mod.user.js* file in this repository, and paste it to your file:

   >* *'user_'* variables are user preferences. You can choose your settings by changing the values as per inline documentation.
   >* _'@require ... /master/scp_mod.js'_ is referring to the master branch, which contains all the added features. You can change 'master' to a different branch name to explore or demo other features.
   
   Save the changes, and you're good to go :thumbsup:

###### Auto Updates:
Go to Dashboard and open 'SCP Mod' userscript. In the userscript's Settings tab, make sure 'Check for updates' is selected.
  > By default it is usually checked.

You can change the update frequency of userscripts under Dashboard Settings.
  > Note, the core 'scp_mod.js' script, referenced from GitHub, is considered "External".