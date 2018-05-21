/**
 * SCP Mod v1.4.2
 *
 * Features :
 *  0.  Custom SCP Tab Title - show ID and/or Subject, Product
 *  1.  Expand conversation history on load of SCP issue page
 *  2.  Highlight (default) and/or add label to SUMMARY & Complexity Notes in SCP issue page
 *  3.  Scroll to Request Details, Conversations & Request Properties section
 *  4.  Add new or find existing SUMMARY/Complexity note
 */


/**--------------------------------------------------
 * Default variables
 */
var highlight = true;
var label = false;
var color_summary = "honeydew";
var color_complexity = "lavender";

var trigram = "";
var scp_id = "";
var scp_subject = "";
var scp_product = "";
var tab_title = "";

var summary_id = "";
var complexity_id = "";

/**--------------------------------------------------
 * Custom buttons & click events
 */
// Add custom menu buttons to the header menu bar #RvAcnHdr
$('#RvAcnHdr>table>tbody>tr').append(
    '<td id="cust_menu">' +
    '<pre>Quick Nav</pre>' +
     // Add Scroll buttons - Summary Note
    '<a class="acnbtn fl mr10" id="scroll_summary">' +
    '<img src="images/spacer.gif" class="scpnoteicon" vspace="4" border="0" title="Summary Note">' +
    '<img src="images/spacer.gif" class="scpicon159" vspace="3" border="0" title="Summary Note" style="top: -27px;position: relative;left: 3px;display:none">' +
    '</a>'+
     // Add Scroll buttons - Complexity Note
    '<a class="acnbtn fl mr10" id="scroll_complexity">' +
    '<img src="images/spacer.gif" class="scpnoteicon" vspace="4" border="0" title="Complexity Note">' +
    '<img src="images/spacer.gif" class="scpicon159" vspace="3" border="0" title="Complexity Note" style="top: -27px;position: relative;left: 3px;display:none">' +
    '</a>'+
    // Add Scroll buttons - Request Details
    '<a class="acnbtn fl mr10" id="scroll_reqdetail"><img src="images/spacer.gif" class="scpicon97" vspace="3" border="0" title="Request Details"></a>' +
    // Add Scroll buttons - Conversations
    '<a class="acnbtn fl mr10" id="scroll_conversation"><img src="images/spacer.gif" class="scpicon164" vspace="3" border="0" title="Conversations"></a>' +
    // Add Scroll buttons - Request Properties
    '<a class="acnbtn fl mr10" id="scroll_properties"><img src="images/spacer.gif" class="scpicon214" vspace="3" border="0" title="Request Properties"></a>' +

    '</td>'
);

// Scroll to Request Description
$('#RvAcnHdr table tbody tr').on('click', '#scroll_reqdetail', function() {
    scrollTo($("#reqSummaryHdr"));
});

// Scroll to Conversations
$('#RvAcnHdr table tbody tr').on('click', '#scroll_conversation', function() {
    scrollTo($("#Conversation"));
});

// Scroll to Request Properties
$('#RvAcnHdr table tbody tr').on('click', '#scroll_properties', function() {
    scrollTo($("#ProDetails"));
});

// Add or Find Summary note
$('#RvAcnHdr table tbody tr').on('click', '#scroll_summary', function() {
    findOrAddNote('summary', summary_id);
});

// Add or Find Complexity note
$('#RvAcnHdr table tbody tr').on('click', '#scroll_complexity', function() {
    findOrAddNote('complexity', complexity_id);
});
// End Custom buttons & click events


/**--------------------------------------------------
 * On load executions
 */
$(document).ready(function() {
	// Get Trigram
    var trigram_span = $($('#MainHeader>table>tbody>tr>td>table>tbody>tr>td')[2]).find('table>tbody>tr:first>td:last>span');
    if(trigram_span.length){
    	trigram = trigram_span.text().trim().toUpperCase();
    }
    console.log('SCP Mod >>', "Welcome to SCP Mod", '[', trigram, ']');

    // Start Custom SCP Tab Title
    // Inspired from:
    // Simon's script - http://qnl-intranet/wiki/doku.php?id=user:simonc:userscript_scp_view_issue&s[]=scp&s[]=browser
    // & Yee Huey's script //$(document).attr("title", "SCP#"+window.location.href.match(/\d+/)[0]);

    var scp = $('#issueHdr .issueTitle').text().split(/^ID : |\n - /);
    scp_id = scp[1];
    scp_subject = scp[2];
    scp_product = $('#PRODUCTID_CUR').text().replace(/ \(unknown\)$/, '');
    tab_title = scp_id;

    if (typeof user_tabtitle !== 'undefined') {
        switch (user_tabtitle){
            case 1:
                tab_title = tab_title + " | " + scp_product;
                break;
            case 2:
                tab_title = tab_title + " - " + scp_subject;
                break;
            default:
                tab_title = scp_id;
        }
    }
    $(document).attr("title", tab_title);
    // End Custom SCP Tab Title

    // override user's highlight preference
    if (typeof user_highlight !== 'undefined') {
      highlight = user_highlight;
    }

    if (typeof user_label !== 'undefined') {
      label = user_label;
    }

    // Call function to highlight Notes on load of page
    highlightNotes();

    // _DIALOG_LAYER div can be already loaded, or dynamically added to body
    // Add listener if already loaded
    if($('#_DIALOG_LAYER').length){
        $(document).on('DOMSubtreeModified', $('#_DIALOG_LAYER'), _DIALOG_LAYER_callback);
    }
});


/**--------------------------------------------------
 * Expand conversation history
 */
$("#l-convs").ready(function() {
    //Expand conversation history on load of SCP issue page if available
    if($("#l-convs").length)
       $("#l-convs")[0].click();
});
// End Expand conversation history


/**--------------------------------------------------
 * Highlight feature
 */

$("#LoadCoversations").on("DOMNodeInserted", ".rvcon-tb", function(event){  //DOMNodeInserted,DOMSubtreeModified
    //console.log($(this).text());

    // Call function to highlight Notes when a history expanded or when new note is added
    highlightNotes();
});

// Highlight SUMMARY & Complexity Notes in SCP issue page
function highlightNotes(){
    var notes = $("#LoadCoversations").find("[id$='_notes'] .clearboth");

    $.each(notes, function( index, value ) {
        var customize = false;

        var note = value.children[1];
        var outerdiv = note.parentNode.parentNode;
        var innerdiv = outerdiv.children[0];

        var b_color, label_name, label_color = "";

        if( note.innerText.match("##SUMMARY") ){
            customize = true;
            b_color = color_summary;
            label_name = "Summary";
            label_color = "#5cf441";
            summary_id = outerdiv.id;
        }
        else if(note.innerText.match("##Complexity")){
            customize = true;
            b_color = color_complexity;
            label_name = "Complexity";
            label_color = "#4295f4";
            //label_color = "darkorchid";
            complexity_id = outerdiv.id;
        }

        if (customize){
            // add label to note (by Loi)
            if(label){
              outerdiv.querySelector("span .conLasi").outerHTML = "<span class='conLasi'>" + label_name + " <span class='conLa' style='background-color:" + label_color + "'></span></span>";;
            }
            // highlight note
            if(highlight){
                outerdiv.style = "background-color : " + b_color;
                innerdiv.style = "background-color : " + b_color;
            }

        }
    });

    // Show edit icon on scroll_summary button if no summary found
    if (summary_id == "") {
        $('#scroll_summary .scpicon159').css('display', 'block');
    }else{
        $('#scroll_summary .scpicon159').css('display', 'none');
    }

    // Show edit icon on scroll_complexity button if no summary found
    if (complexity_id == "") {
        $('#scroll_complexity .scpicon159').css('display', 'block');
    }else{
        $('#scroll_complexity .scpicon159').css('display', 'none');
    }
}
// End Highlight feature


/**--------------------------------------------------
 * Scroll feature
 */

// offset from the header bar #RvAcnHdr
var scroll_offset = 0;
if($('#RvAcnHdr').length){
    scroll_offset = $('#RvAcnHdr').height();
}

function scrollTo(element)
{
    if($("#requestDetails").hasClass('show') | element.selector=="#reqSummaryHdr"){
        var offset = scroll_offset;
        if(! $('#RvAcnHdr.FixedAcnBar').length){
            offset = scroll_offset * 2;
        }
        //alert(offset);
        $('html,body').animate({
            scrollTop: element.offset().top - offset
        });
    }
}

/*
// add fixed menu bar at bottom right
$('body').append(
    '<div class="my_panel" style="position:fixed; height:auto; width:auto; background-color:aliceblue; opacity:0.8; right:0px; bottom:5px"><button id="scroll_up" style=""><img src="images/spacer.gif" class="scpicon164" vspace="4" border="0" title="Back to Request List"></button></div>'
);

$('#scroll_up').click(function(){
    //alert("scrolling"+ $(':focus').id );
    scrollTo($("#Conversation"));
});
*/

// End Scroll feature


/**--------------------------------------------------
 * SUMMARY/Complexity note - Add, Find
 */
// Add template note text when adding new note
var add_template_complexity = false;
var template_complexity = "##Complexity:\n";

var add_template_summary = false;
var template_summary = '=========================================\n' +
'##SUMMARY\n' +
'\n' +
'ISSUE:\n' +
'- <Detailed summary/paraphrase of issue>\n' +
'\n' +
'INVENTORY:\n' +
'- <available files for investigation & the location>\n' +
'- <skype group>\n' +
'- <active contact details>\n' +
'- <VMs in use>\n' +
'\n' +
'HISTORY:\n' +
'- <progression of issue>\n' +
'\n' +
'PLAN (✘ / ✔):\n' +
'- <next steps for issue>\n' +
'\n' +
'STATUS:\n' +
'- <i.e. waiting for model & db backup, analyzing log files, waiting for response from SS>\n' +
'- <typically something we also add in remarks>\n' +
'=========================================\n';

function findOrAddNote(note_type, note_id){
    if($("#requestDetails").hasClass('show')){
		var note = $("#"+note_id);
        
        if(note.length){
            // Find (i.e. scroll to) note
            console.log(note_id, 'note exists')
            scrollTo(note);
            if(!note.hasClass('ReqMDetails')){
                note.find('.g-conv.fl')[0].click();
            }
        }else if(scp_id != ""){
            // Add note
            switch (note_type){
	    		case 'summary':
	    			add_template_summary = true;
	    			break;
				case 'complexity':
					add_template_complexity = true;
					break;
	    	}
            showURLInDialog('AddNotes.do?workorderID=' + scp_id + '&toAdd=yes','title=Add Note, top=50, left=400');
        }else{
        	console.log('scp_id = null ?');
        }
    }
}

function addCustomNote(target){
    //e.preventDefault();
    //console.log(add_template_summary, target);
    if(add_template_summary){
        add_template_summary = false;
        target.text(template_summary);
        target.css('height', '315px');
    }else if(add_template_complexity){
        add_template_complexity = false;
        target.text(template_complexity+" - "+trigram+";");
        //target.css('height', '315px');
    }
}

$(document).on("DOMNodeInserted", this.body, function(e){
    var element = e.target;
    //console.log(element);
    //console.log($(e.target)[0]);
    if(element.id == '_DIALOG_LAYER'){
    	// _DIALOG_LAYER div can be already loaded, or dynamically added to body
    	// Add listener if dynamically added
        $(document).on('DOMSubtreeModified', element, _DIALOG_LAYER_callback);
    }
});

var _DIALOG_LAYER_callback = function(e){
    if(e.target.id == '_DIALOG_LAYER' && (add_template_summary | add_template_complexity) ){
        var target = $(e.target).find('#viewPageNotesText');
        if(target.length)
            addCustomNote(target);
    }
}
// End SUMMARY/Complexity note - Add, Find