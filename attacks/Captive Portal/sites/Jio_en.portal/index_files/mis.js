/*
 * File: mis.js
 * TeamF1 Inc, 2012
 * Created on 20th July 2012 - suresh
 */
var idSuffix = "Menu";
/*****
 Image Swaping for enable / disape buttons. Replacing checkbox with this for nice look.
 ******/
var onloadCall = function(func, data){

     $(".enable-disable").live('click', function(){     
	     	var imgSrc = this.src;     	
	     	if (imgSrc.indexOf("_off") != -1) /*off is found else on is found */
	     	{     	
	     		this.src = this.src.replace("_off", "_on");     	
	     	} else {     	
	     		this.src = this.src.replace("_on", "_off");     	
	     	}  
	      
		    if (func) {
		    	func(data, this);
		    }           
	});

};

/*****
 For Main Menu Highlight.
 *****/
/*function mmSel(mmSelId){
    var identity = document.getElementById(mmSelId);
    identity.className = "active";
    if(mmSelId == 'mainMenu1') {
      identity.className = "firstLiActive";
    }
    else if(mmSelId == 'mainMenu7') {
      identity.className = "lastLiActive";
    }
} */

function mmSel(mmSelId,subchildMenu){
           var identity = document.getElementById(mmSelId);
           identity.className = "active";
           var subChildidentity = document.getElementById(subchildMenu);
           subChildidentity.className = "activeChild";
           $("#"+mmSelId).next('ul').slideToggle(250);
       }

/*****
 Modal dialog show
 *****/
function ShowDialog(modal, dialogId, overlayId){
    $("#" + overlayId).show();
    $("#" + dialogId).fadeIn(300);
    if (modal) {
        $("#" + overlayId).unbind("click");
    }
    else {
        $("#" + overlayId).click(function(e){
            HideDialog();
        });
    }
}

/*****
 Modal dialog hide
 *****/
function HideDialog(dialogId, overlayId){
    $("#" + overlayId).hide();
    $("#" + dialogId).fadeOut(300);
}

/**
 * This function in called on document ready and sets events on the respective fields to pop and hide divs
 * @method setOnclickDialogs
 * @param onclkBtn - id of add button
 * @param closeBtn - id of close button
 * @param dialogDivId - id of dialog div
 * @param overlayDivId - id of overlay div
 */
function setOnclickDialogs(onclkBtn, closeBtn, dialogDivId, overlayDivId){
    $("#" + onclkBtn).click(function(e){
        ShowDialog(true, dialogDivId, overlayDivId);
        e.preventDefault();
    });
    
    $("#" + closeBtn).click(function(e){
        HideDialog(dialogDivId, overlayDivId);
        e.preventDefault();
    });
}

/**
 * This function should be called on when doing rowwise operations
 * @method performSelectedOperation
 * @param OpInfoObj this object contains following information
 operation - operation to be performed for ex - delete/enable/disable
 tableId - id of table to which row belongs
 checkId - its a hidden field id. Based on its value number of rows to be
 deleted is defined. If its value is "0" then operation on one row
 takes place. If its value is 1 then operation on all row takes place.
 Value for this id is set when select all check box is checked on unchecked
 contextRowId - This is the id of row on which user right clicks
 url - file path which will handle ajax request and perform operations
 skipHeadIdRow - This should be the id of head section row. This row is out of consideration
 when rows on which action needs to take place is found
 */
function performDeleteOperation(OpInfoObj){
    var selectedData = null;
    var jsondata = null;
    var postData = null;
    // Check if the select all check box is selected
    var checkIdObj = document.getElementById(OpInfoObj.checkId);
    if (checkIdObj && checkIdObj.checked) {
        // Multiple delete operation
        //skipHeadIdRow id will be heading row that is part of thead
        //true is for multiple selection
        selectedData = getDataForAction(OpInfoObj.tableId, true, OpInfoObj.skipHeadIdRow);
    }
    else {
        // Single delete operation
        //false is for single selection
        //contextRowId is the id of row on which contextmenu event is generated
        selectedData = getDataForAction(OpInfoObj.contextRowId, false);
    }
    //Convert selected data to string
    jsondata = JSON.stringify(selectedData);
    postData = ({
        rows: jsondata,
        operationName: OpInfoObj.operation
    });
    $.post(OpInfoObj.url, postData, function(data){
        //Write a call backback function
    });
}


/**
 * This function should be called on when doing rowwise operations
 * @method performSelectedOperation
 * @param OpInfoObj this object contains following information
 operation - operation to be performed for ex - delete/enable/disable
 tableId - id of table to which row belongs
 checkId - its a hidden field id. Based on its value number of rows to be
 deleted is defined. If its value is "0" then operation on one row
 takes place. If its value is 1 then operation on all row takes place.
 Value for this id is set when select all check box is checked on unchecked
 contextRowId - This is the id of row on which user right clicks
 url - file path which will handle ajax request and perform operations
 skipHeadIdRow - This should be the id of head section row. This row is out of consideration
 when rows on which action needs to take place is found
 */
function performEditOperation(OpInfoObj){
    var selectedData = null;
    var jsondata = null;
    var postData = null;
    cleanFields(OpInfoObj.editFldObj)
    //contextRowId is the id of row on which contextmenu event is generated
    selectedData = getDataForAction(OpInfoObj.contextRowId, false);
    
    //Convert selected data to string
    jsondata = JSON.stringify(selectedData);
    postData = ({
        rows: jsondata,
        operationName: OpInfoObj.operation
    });
    $.post(OpInfoObj.url, postData, function(data){
        //Write a call backback function
        fillEditFlds(data, OpInfoObj.editFldObj)
    }, 'json');
}


/**
 * This function is called from performSelectedOperation to get the data
 * @method getDataForAction
 * @param actionIds - table id or contextid
 * @param state - true is multiple row operation and false is single row operation
 * @param skipHeadIdRow - skip row id in head tag
 */
function getDataForAction(actionIds, state, skipHeadRowId){
    var dataArr = [];
    var dataObj = null;
    if (!state) {
        dataObj = {};
        dataObj["1"] = actionIds;
        dataArr.push(dataObj);
    }
    else {
        var tableObj = document.getElementById(actionIds);
        var trArr = tableObj.getElementsByTagName('tr');
        if (trArr) {
            for (var i = 0; i < trArr.length; i++) {
                dataObj = {};
                if (trArr[i].id != skipHeadRowId) {
                    dataObj[i] = trArr[i].id;
                    dataArr.push(dataObj);
                }
            }
        }
    }
    return dataArr;
}

/**
 * This function sets the value of the hidden field id
 * @method setSelectAll
 * @param thisObjId - selected checkbox id
 * @param editId - prefixId of the edit field
 function setSelectAll (thisObjId, editId) {
 var thisObj = document.getElementById (thisObjId);
 var editIdObj = document.getElementById (editId + idSuffix);
 if (thisObj && thisObj.checked) {
 editIdObj.style.display = "none";
 }
 else {
 editIdObj.style.display = "block";
 }
 }*/
/**
 * This function sets the value of the hidden field id
 * @method setSelectAll
 * @param thisObjId - selected checkbox id
 * @param editId - prefixId of the edit field
 */
function setSelectAll(thisObjId, editId){
    var thisObj = document.getElementById(thisObjId);
    if (!thisObj) 
        return;
    if (!editId) 
        return;
    var objIdArr = editId.split(" ");
    for (idx in objIdArr) {
        var editIdObj = document.getElementById(objIdArr[idx] + idSuffix);
        
        if (editIdObj != null && thisObj && thisObj.checked) {
            editIdObj.style.display = "none";
        }
        else if(editIdObj != null) {
            editIdObj.style.display = "block";
        }
    }
}


/**
 * This function fills the edit fields with json data
 * @method fillEditFlds
 * @param data - json data returned from server
 * @param idNameMap - name-id map object
 */
function fillEditFlds(data, idNameMap){
    for (var prop in data) {
        if (data[prop]) {
            var obj = document.getElementById(idNameMap[prop]);
            if (obj) {
                obj.value = data[prop];
            }
        }
    }
}

/**
 * This function cleans the edit fields
 * @method cleanFields
 * @param idNameMap - name-id map object
 */
function cleanFields(idNameMap){
    for (var prop in idNameMap) {
        if (idNameMap[prop]) {
            var obj = document.getElementById(idNameMap[prop]);
            if (obj) {
                obj.value = '';
            }
        }
    }
}

/**
 * This function suffixes 'Menu' on fields of cloned object
 * @method setMenuIds
 */
function setMenuIds(){
    var conetxtMenuObj = document.getElementById('jqContextMenu');
    var liObjs = conetxtMenuObj.getElementsByTagName('li');
    for (var i = 0; i < liObjs.length; i++) {
        liObjs[i].id = liObjs[i].id + idSuffix;
    }
    var inputObjs = conetxtMenuObj.getElementsByTagName('input');
    for (var i = 0; i < inputObjs.length; i++) {
        inputObjs[i].id = inputObjs[i].id + idSuffix;
    }
}



/**
 * Function for Add or Edit Form fields
 * @method openForm
 * buttonPrefix: submit button we need to send ex: button.edit.users.users
 * rowId: Record id
 * dialogId: popup id
 * rowPrefix: Row Prefix ex: users
 * pageName: Page Name ex: users.html
 */
function openForm(buttonPrefix, rowId, dialogId, rowPrefix, pageName){
    var leftPx = $(window).innerWidth()/2 - $(".configDialog").width()/2;
    leftPx = Math.round(leftPx);
    $(".configDialog").css('left',leftPx+'px');
    var loadingDiv = '<div id="tf1_popUpLoadingMsg"><p style="line-height:60px;text-align:center;"> Loading Please wait..! </p></div>';
    $("#"+dialogId).html(loadingDiv);
    ShowDialog(true, dialogId, 'tf1_overlay');

    if(rowId == -1){   
        // Add Form                  
        dataString = buttonPrefix + ".-1=add&thispage="+pageName+"&id=-1";
                           $.ajax({
                                type: "POST",
                                url: "platform.cgi",
                                data: dataString,
                                async:false,
                                success: function(dataHTML){
									
									if (dataHTML.search("users.username") != -1)
									{
															
										$("#"+dialogId).hide();
										$("#"+dialogId).html(dataHTML);
										if ($("div.msgNew p").length > 0 && $("div.msgNew p").html() != '') 
										{
											window.location="platform.cgi?page=index.html&redirectStatusMessage="+$("div.msgNew p").html();
										} else {
								
											window.location="platform.cgi?page=index.html";
										}
				
									} else {
				
										$("#"+dialogId).html(dataHTML);
				
									}
									
                                },
                                dataType:'html'
                                });
    }else{
        // Edit Form
        rowId = rowId.replace(rowPrefix,"");
        dataString = buttonPrefix + "."+rowId+"=edit&thispage="+pageName+"&configRowId="+rowId;         
        $.ajax({
                                type: "POST",
                                url: "platform.cgi",
                                data: dataString,
                                async:false,
                                success: function(dataHTML){
                                   
									if (dataHTML.search("users.username") != -1)
									{
															
										$("#"+dialogId).hide();
										$("#"+dialogId).html(dataHTML);
                    if ($("div.msgNew p").length > 0 && $("div.msgNew p").html() != '') 
										{
											window.location="platform.cgi?page=index.html&redirectStatusMessage="+$("div.msgNew p").html();
										} else {
								
											window.location="platform.cgi?page=index.html";
										}
				
									} else {
				
										$("#"+dialogId).html(dataHTML);
				
									}
									
                                },
                                dataType:'html'
                                });
    }
    document.getElementById('tf1_form_hid_token').value = document.getElementById('tf1_popupform_hid_token').value;

}
/**
 * Function for Add or Edit Form fields
 * @method openPreviewForm
 * buttonPrefix: submit button we need to send ex: button.edit.users.users
 * rowId: Record id
 * dialogId: popup id
 * rowPrefix: Row Prefix ex: users
 * pageName: Page Name ex: users.html
 */
function openPreviewForm(buttonPrefix, rowId, dialogId, rowPrefix, pageName){
    var leftPx = $(window).innerWidth()/2 - $(".configDialog").width()/2;
    leftPx = Math.round(leftPx);
    $(".configDialog").css('left',leftPx+'px');
    var loadingDiv = '<div id="tf1_popUpLoadingMsg"><p style="line-height:60px;text-align:center;"> Loading Please wait..! </p></div>';
    $("#"+dialogId).html(loadingDiv);
    ShowDialog(true, dialogId, 'tf1_overlay');

    dataString = buttonPrefix + "."+rowId+"=view&thispage="+pageName+"&configRowId="+rowId;
    $.ajax({
    	type: "POST",
		url: "platform.cgi",
		data: dataString,
                async:false,
		success: function(dataHTML){
			if (dataHTML.search("users.username") != -1)
			{
				$("#"+dialogId).hide();
				$("#"+dialogId).html(dataHTML);
        if ($("div.msgNew p").length > 0 && $("div.msgNew p").html() != '') 
        {
          window.location="platform.cgi?page=index.html&redirectStatusMessage="+$("div.msgNew p").html();
        } else {
					window.location="platform.cgi?page=index.html";
				}
			} else {
				$("#"+dialogId).html(dataHTML);
 document.getElementById('tf1_form_hid_token').value = document.getElementById('tf1_popupform_hid_token').value;
			}
        },
        dataType:'html'
    });

}
/**
 * Function for delete one or more records
 * @method deleteRows
 * buttonPrefix: submit button we need to send ex: button.edit.users.users
 * frmId: Form Name 
 * rowId: Record id
 * selBoxId: Select Box Id 
 * dialogId: popup id
 * rowPrefix: Row Prefix ex: users
 * checkBoxPrefix: Check box Prefix ex: users
 */
function deleteRows( buttonPrefix, frmId, rowId, selBoxId, dialogId, rowPrefix, checkBoxPrefix) {
    $("#"+dialogId).html('');
    mainFormHidTokenVal = document.getElementById('tf1_form_hid_token').value;
    if ( $("#"+selBoxId+"Menu").is(':checked') ) {
        var childrenRows = $("#"+rowId).parent().children('tr');
        for (var i = 0; i < childrenRows.length; i++) {
            var thisElement = $(childrenRows[i]);
            thisRowId = thisElement.attr('id');
           
            thisRowId = thisRowId.replace(rowPrefix,"");
            $("#"+dialogId).append('<input type="hidden" name="'+checkBoxPrefix+'.checkbox" value="'+thisRowId+'">');
        }
    } else {
        rowId = rowId.replace(rowPrefix,"");
        $("#"+dialogId).append('<input type="hidden" name="'+checkBoxPrefix+'.checkbox" value="'+rowId+'">');
    }
   
    $("#"+dialogId).append('<input type="hidden" name="'+buttonPrefix+'" value="delete">');
    $("#"+dialogId).append('<input type="hidden" name="token" value="'+mainFormHidTokenVal+'">');
    displayProgressBar ();
	$("#"+frmId).submit();
}
/**
 * Function for calling enable/disable form submit
 * @method changeRowStauts
 * status: Status to change
 * frmId: Form Name
 * rowId:  Record id
 * dialogId: popup id
 * rowPrefix: Row Prefix ex: users
 * checkBoxPrefix: CheckBox Prefix ex: users
 * buttonSuffix: Button Suffix
 */
function changeRowStauts(status, frmId, rowId, dialogId, rowPrefix, checkBoxPrefix, buttonSuffix) {
    $("#"+dialogId).html('');
    mainFormHidTokenVal = document.getElementById('tf1_form_hid_token').value;
    rowId = rowId.replace(rowPrefix,"");
    $("#"+dialogId).append('<input type="hidden" name="'+checkBoxPrefix+'.checkbox" value="'+rowId+'">');
    $("#"+dialogId).append('<input type="hidden" name="button.'+status+'.'+buttonSuffix+'" value="'+status+'">');
    $("#"+dialogId).append('<input type="hidden" name="token" value="'+mainFormHidTokenVal+'">');
    displayProgressBar ();
    $("#"+frmId).submit();
}

/**
 * Function for resetting Image based on hidden form field of Image
 * @method resetImgOnOff  
*/

function resetImgOnOff(frmId) {
	$( "#"+frmId+" img.enable-disable" ).each(function() {			
			var imgSrc = this.src;									 	
	     	if ($(this).next().val() == 0)  {	     		
				this.src = this.src.replace("_on", "_off");	 	     		      		  	
	     	} else {	     	
	     		this.src = this.src.replace("_off", "_on");	     		 
	     	}	     	    	     		
	});
}

/**
 * Function for Set all hidden fields ON/OFF as per image src
 * @method setHiddenChks
*/
function setHiddenChks(frmId) {
	$( "#"+frmId+" img.enable-disable" ).each(function() {	
			var imgSrc = this.src;					 	
	     	if (imgSrc.indexOf("_off") != -1) /*off is found else on is found */
	     	{     	
	     		 $(this).next().val(0);		     		      		  	
	     	} else {
	     		$(this).next().val(1);
	     	}	     	     		     		
	});
}

function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    if (trident > 0) {
        // IE 11 (or newer) => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    // other browser
    return false;
}

/* Function to open Help popupup 
*
*/

/* Help default variable */

var helpSection = "deviceStatistics";

var helpConfigFile = "helpStatus.txt";


function helpPop (helpSection,helpConfigFile)
{

	/* For all browsers */
	
	var url = "platform.cgi?page=showHelp.html&help="+helpSection+"&helpfile="+helpConfigFile;
	
	/*Overwrite if it is Opera browser */
	
	if ( navigator.appName.indexOf ('Opera') != -1 ) {
	
			url = "platform.cgi?page=showHelp.html&help="+helpSection+"&helpfile="+helpConfigFile;
			
		}
  var isIE = detectIE(); 
	if (isIE)  {    // If Internet Explorer, return version number
       gotoIE(url);
   }
   else
   {
	
	helpwindow=window.open(url,'name','height=472,width=570,left=100,top=150,resizable=no,scrollbars=yes,toolbar=no,status=no');	
	
	if (window.focus) {helpwindow.focus()}
}
	
}
/* IE help pop up starts */
function gotoIE(url){
      var targetWindowName = "TestWindow";
       var wnd = window.open("",targetWindowName,"height=472,width=560,left=200,top=150,resizable=no,scrollbars=yes,toolbar=no,status=no");
       var link = document.getElementById("link");
       link.target = targetWindowName;
       link.href = url;
       link.click();
}
/* IE help pop up ends */

/* Returns the version of Internet Explorer greater then 0 or -1
* (-1 indicating the use of non IE browser)
*/

function getInternetExplorerVersion()
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

/* set the version */
var getIEVersion = getInternetExplorerVersion();

/*****
@method goToLogoutClick
*****/
function goToLogoutClick(){
displayProgressBar ();
  $("#tf1_frmLogout").submit();
}



/**
 * Function for help popup
 * @method openHelpForm
 */
function openHelpForm(){
    var leftPx = $(window).innerWidth()/2 - $(".configDialogHelp").width()/2;
    leftPx = Math.round(leftPx);
    $(".configDialogHelp").css('left',leftPx+'px');
    var loadingDiv = '<div id="tf1_popUpLoadingMsg"><p style="line-height:60px;text-align:center;"> Loading Please wait..! </p></div>';
    $("#tf1_helpContent").html(loadingDiv);
    ShowDialog(true, 'tf1_helpDialog', 'tf1_helpOverlay');
   // ShowDialog(true, dialogId, 'tf1_overlay');

			url = "platform.cgi?page=getHelp.html&help="+helpSection+"&helpfile="+helpConfigFile;

    $.ajax({
    	type: "GET",
		url: url,
		data: {},
		success: function(dataHTML){
			if (dataHTML.search("loginLogo.png") != -1)
			{
                dialogId = "tf1_helpDialog";
				$("#"+dialogId).hide();
				$("#"+dialogId).html(dataHTML);
                if ($("div.msgError p").length > 0 && $("div.msgError p").html() != '') 
                {
                    window.location="platform.cgi?page=index.html&redirectStatusMessage="+$("div.msgError p").html();
                } else {
					window.location="platform.cgi?page=index.html";
				}
	    	} else {
				$("#tf1_helpContent").html(dataHTML);
			}
        },
        dataType:'html'
    }); 
}

 $("#helpBtnClose").live("click",function(e){
	HideDialog('tf1_helpDialog', 'tf1_helpOverlay');
	e.preventDefault();
	// document.cookie = "recordModified=1";
});

 $("#logoutBtnClose").live("click",function(e){
	HideDialog('tf1_logOutDialog', 'tf1_logOutOverlay');
	e.preventDefault();
	// document.cookie = "recordModified=1";
});



/**
 * Function for close logout Form
 * @method closeConfirmForm
 */
function closeConfirmForm(){
    var leftPx = $(window).innerWidth()/2 - $(".configLogout").width()/2;
    var topPx = $(window).innerHeight()/2 - $(".configLogout").height()/2;
    leftPx = Math.round(leftPx);
    topPx = Math.round(topPx);
    $(".configLogout").css('left',leftPx+'px');
    $(".configLogout").css('top',topPx+'px');
    ShowDialog(true, 'tf1_logOutDialog', 'tf1_logOutOverlay');
			     
}
