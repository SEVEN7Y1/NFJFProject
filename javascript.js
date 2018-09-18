"use strict"; 

var mysqlServerElem;
var mysqlUsernameElem;
var mysqlPasswordElem;
var mysqlDatabaseElem;

var mysqlServerSetting;
var mysqlUsernameSetting;
var mysqlPasswordSetting;
var mysqlDatabaseSetting;

var optimizeButton;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    mysqlServerElem   = document.getElementById('mysqlServerId');
    mysqlUsernameElem = document.getElementById('mysqlUsernameId');    
    mysqlPasswordElem = document.getElementById('mysqlPasswordId');
    mysqlDatabaseElem = document.getElementById('mysqlDatabaseId');

    showLoadTab();

    optimizeButton    = document.getElementById('optimizeButtonId');
    optimizeButton.addEventListener( "click", runOptimization, false);

    loadScript('initMap');
    showLoadTab();
    loadSettings();
    
}

function wait(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds)
        {
          break;
        }
    }
}

function showLoadTab() {
    document.getElementById('load').click();
}

function showHomeTab() {
	document.getElementById('home').click();
}

function showTab(event, tabName) {
    // Declare all variables
    var i, tabContentElems, tabLinkElems;

    // Get all elements with class="tabContent" and hide them
    tabContentElems = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContentElems.length; i++) {
        tabContentElems[i].style.display = "none";
    }

    // Get all elements with class="tabLink" and remove the class "active"
    tabLinkElems = document.getElementsByClassName("tabLink");
    for (i = 0; i < tabLinkElems.length; i++) {
        tabLinkElems[i].className = 
        	tabLinkElems[i].className.replace("active", "");
    }

    // Show the current tab, and add an "active" class to the link
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += "active";
}

function loadSettings() {
    mysqlServerElem.value   = localStorage.mysqlServerSetting   || '127.0.0.1:3306';
    mysqlUsernameElem.value = localStorage.mysqlUsernameSetting || 'newuser';
    mysqlPasswordElem.value = localStorage.mysqlPasswordSetting || '12345678';
    mysqlDatabaseElem.value = localStorage.mysqlDatabaseSetting || 'hospital';
}

function clearSettings() {
    localStorage.clear(); /* deletes all local storage elements */
    loadSettings();
}

function saveSettings() {
    localStorage.mysqlServerSetting   = mysqlServerElem.value;  
    localStorage.mysqlUsernameSetting = mysqlUsernameElem.value;
    localStorage.mysqlPasswordSetting = mysqlPasswordElem.value;
    localStorage.mysqlDatabaseSetting = mysqlDatabaseElem.value;
}

function testConnection() {
		MySql.Execute(
			"127.0.0.1:3306",			 // mySQL server
			"newsuser", 		                                 // login name
			"123456", 		                             // login password
			"hospital", 		                         // database to use
											// SQL query string
			"SHOW TABLES FROM " + mysqlDatabaseElem.value + ";",
	        function (data) {
	        	processTestResult(data);
	    	}
	    );
}

function processTestResult(queryReturned) {
    if (!queryReturned.Success) {
        document.getElementById("mysqlConnectionStatus").innerHTML = queryReturned.Error;
    } else {
        document.getElementById("mysqlConnectionStatus").innerHTML = "Good Settings!";
    }
}

var dayValue, fromTimeValue, toTimeValue;
function setVars() {
    dayValue = document.getElementById("daypicker").value;
    fromTimeValue = document.getElementById("fromTime").value;
    toTimeValue = document.getElementById("toTime").value;

    document.getElementById("daypicker").selectedIndex = 0;
    document.getElementById("fromTime").value = '';
    document.getElementById("toTime").value = '';

    document.getElementById('scheduleStatus').style.display = "block";
}

function doQuery() {

    var querySelectStmt = "SELECT * " +
                          "FROM building; "

    MySql.Execute(
        "127.0.0.1:3306",                 // mySQL server
        "newuser",                                        // login name
        "12345678",                                      // login password
        "hospital",                                // database to use
                                        // SQL query string

        queryInsertStmt,
        querySelectStmt,

        function (data) {
            document.getElementById("test").innerHTML = JSON.stringify(data.Result, null, 2);        }
    );
}

function processQueryResult(queryReturned) {
    if (!queryReturned.Success) {
        document.getElementById("queryOutput").innerHTML = JSON.stringify(data.Result, null, 2);
        alert(queryReturned.Error)
    } else {
        document.getElementById("queryOutput").innerHTML = JSON.stringify(data.Result, null, 2);
        document.getElementById("TextFeedback").innerHTML = JSON.stringify(data.Result, null, 2);
    }
}
