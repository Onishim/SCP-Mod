// ==UserScript==
// @name     	SCP Mod
// @version  	1.4.0
// @author      Oni
// @description  Enhancement mods for SCP
// @updateURL	https://github.com/Onishim/SCP-Mod/blob/summary-note/SCP%20Mod.user.js
// @downloadURL	https://github.com/Onishim/SCP-Mod/blob/summary-note/SCP%20Mod.user.js
// @match 		https://scp.quintiq.com/WorkOrder.do?woMode=viewWO&woID=*
// @match 		https://scp.quintiq.com/AddResolution.do*
// @resource    scpModCss https://raw.githubusercontent.com/Onishim/SCP-Mod/summary-note/css/scp_mod.css
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @require		http://code.jquery.com/jquery-latest.js
// @require		https://raw.githubusercontent.com/Onishim/SCP-Mod/summary-note/scp_mod.js
// ==/UserScript==

GM_addStyle (GM_getResourceText ("scpModCss"));

/**
 * Choose 'title' format for SCP tab
 * 0 = SCP ID (Default)
 * 1 = SCP ID + PRODUCT
 * 2 = SCP ID + Issue SUBJECT
 */
var user_tabtitle = 0;

/**
 * set to 'true' to enable feature, or 'false' to disable feature
 */
var user_highlight = true;
var user_label = true;