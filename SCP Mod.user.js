// ==UserScript==
// @name     	SCP Mod
// @version  	1.3.0
// @author      Oni
// @description  Enhancement mods for SCP
// @updateURL	https://raw.githubusercontent.com/Onishim/SCP-Mod/master/
// @downloadURL	https://raw.githubusercontent.com/Onishim/SCP-Mod/master/
// @match 		https://scp.quintiq.com/WorkOrder.do?woMode=viewWO&woID=*
// @match 		https://scp.quintiq.com/AddResolution.do*
// @require		http://code.jquery.com/jquery-latest.js
// @require		https://raw.githubusercontent.com/Onishim/SCP-Mod/master/scp_mod.js
// ==/UserScript==

/**
 * Choose 'title' format for SCP tab
 * 0 = SCP ID (Default)
 * 1 = SCP ID + PRODUCT
 * 2 = SCP ID + Issue SUBJECT
 */
var user_tabtitle = 1;

/**
 * set to 'true' to enable feature, or 'false' to disable feature
 */
var user_highlight = true;
var user_label = true;


