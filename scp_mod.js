/**
 * SCP Mod v1.3.0
 *
 * Features :
 *  0.  Custom SCP Tab Title - show ID and/or Subject, Product
 *  1.  Expand conversation history on load of SCP issue page
 *  2.  Highlight (default) and/or add label to SUMMARY & Complexity Notes in SCP issue page 
 *  3.  Scroll to Request Details, Conversations & Request Properties section
 */

// default variables
var highlight = true;
var label = false;
var color_summary = "honeydew";
var color_complexity = "lavender";

$(document).ready(function() {
    //alert("Welcome to SCP");

    // Start Custom SCP Tab Title
    // Inspired from:
    // Simon's script - http://qnl-intranet/wiki/doku.php?id=user:simonc:userscript_scp_view_issue&s[]=scp&s[]=browser
    // & Yee Huey's script //$(document).attr("title", "SCP#"+window.location.href.match(/\d+/)[0]);
    
    var scp = $('#issueHdr .issueTitle').text().split(/^ID : |\n - /);
    var scp_id = scp[1];
    var scp_subject = scp[2];
    var scp_product = $('#PRODUCTID_CUR').text().replace(/ \(unknown\)$/, '');
    var tab_title = scp_id;

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
});

$("#l-convs").ready(function() {
    //Expand conversation history on load of SCP issue page if available
    $("#l-convs")[0].click();
});

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
        }
        else if(note.innerText.match("##Complexity")){
            customize = true;
            b_color = color_complexity;
            label_name = "Complexity";
            label_color = "#4295f4";
            //label_color = "darkorchid";
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
}


/**
 * Scroll feature
 */
 
// offset from the header bar #RvAcnHdr
var scroll_offset = 0;
if($('#RvAcnHdr').length){
    scroll_offset = $('#RvAcnHdr').height();
}

// Add Scroll buttons to the header bar #RvAcnHdr
$('#RvAcnHdr table tbody tr').append(
    // Add Scroll buttons - Request Properties
    '<td id="td_scroll_properties" style="position:absolute; right:15px"><a class="acnbtn fl mr10" id="scroll_properties" style="border-color: #0394bf"><img src="images/spacer.gif" class="scpicon214" vspace="3" border="0" title="Request Properties"></a></td>' +
    // Add Scroll buttons - Conversations
    '<td id="td_scroll_conversation" style="position:absolute; right:56px"><a class="acnbtn fl mr10" id="scroll_conversation" style="border-color: #0394bf"><img src="images/spacer.gif" class="scpicon164" vspace="3" border="0" title="Conversations"></a></td>' +
    // Add Scroll buttons - Request Details
    '<td id="td_scroll_reqdetail" style="position:absolute; right:100px"><a class="acnbtn fl mr10" id="scroll_reqdetail" style="border-color: #0394bf"><img src="images/spacer.gif" class="scpicon97" vspace="3" border="0" title="Request Details"></a></td>'
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

function scrollTo(element)
{
    var offset = scroll_offset;
    if(! $('#RvAcnHdr.FixedAcnBar').length){
        offset = scroll_offset * 2;
    }
    //alert(offset);
    $('html,body').animate({
        scrollTop: element.offset().top - offset
    });
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