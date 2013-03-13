window.addEventListener("DOMContentLoaded", function () {

// getting element by id
    function $(i) {
        var theElement = document.getElementById(i);
        return theElement;
    }

// create select field element and populate it with options on the fly
    function makeCats() {
        var formTag = document.getElementsByTagName("form");    // formTag is an array of all the form tags
        makeSelect = document.createElement("select");		// this creates the select tag
        var	selectLi = $("select");								// setting that select tag
        makeSelect.setAttribute("id", "groups");			// creating the select tag and giving it an id of groups
        for (var i = 0; i < printGroups.length; i++) {			// looping through the printGroups array by length
            var makeOption = document.createElement("option");  // setting the option tag
            var optText = printGroups[i];							// setting the elements in printGroups array to i
            makeOption.setAttribute("value", optText);  		// creating the option tag and giving it a value of optText
            makeOption.innerHTML = optText;						// creating the option tag and setting the form input to optText
            makeSelect.appendChild(makeOption);					// creating a select tag and appending the option tag to it
        }
        selectLi.appendChild(makeSelect);
    }


// find value of selected radio button
    function getSelectedRadio() {
        var radios = document.forms[0].school;
        for (var i=0; i < radios.length; i++){
            if (radios[i].checked) {
                schoolValue = radios[i].value;
            }
        }
    }

// turn links on and off
    function toggleControls(n) {
        switch(n) {
            case "on":
                $("printForm").style.display = "none";
                $("clear").style.display = "inline";
                $("displayLink").style.display = "none";
                $("addNew").style.display = "inline";
                break;
            case "off":
                $("printForm").style.display = "block";
                $("clear").style.display = "inline";
                $("displayLink").style.display = "inline";
                $("addNew").style.display = "none";
                $("items").style.display = "none";
                break;
            default:
                return false;
        }
    }
// function for storing input data from form
    function storeData(key) {
        if(!key) {
            var id = Math.floor(Math.random() * 1000001);
        } else {
            id = key;
        }
        getSelectedRadio();
        var item             = {};
        item.group       = ["Artist:", $("groups").value];
        item.printName    = ["Print Name:", $("printName").value];
        item.approxDateOfPrint    = ["Quantity:", $("approxDateOfPrint").value];
        item.school     = ["Version:", schoolValue];
        item.approxValue        = ["Cost:", $("approxValue").value];
        item.datePrint   = ["Date Printed:", $("datePrint").value];
        item.dateAdded     = ["Date Acquired:", $("dateAdded").value];
        item.additionalComments = ["Comments:", $("additionalComments").value];
        localStorage.setItem(id, JSON.stringify(item));
        alert("Japanese print record saved");
    }

    function getData() {
        toggleControls("on");
        if (localStorage.length === 0) {
            alert("There is no data in local storage, so I added some.");
            autoFillData();
        }
        // write data from local storage to the browser
        var makeDiv  = document.createElement("div");
        makeDiv.setAttribute("id","items");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $("items").style.display = "block";
        for (var i = 0; i < localStorage.length; i++) {
            var makeli      = document.createElement("li");
            var linksLi     = document.createElement("li");
            makeList.appendChild(makeli);
            var key         = localStorage.key(i);
            var value       = localStorage.getItem(key);
            var obj         = JSON.parse(value);
            var makeSublist = document.createElement("ul");
            makeli.appendChild(makeSublist);
            for (var n in obj) {
                var makeSubli       = document.createElement("li");
                makeSublist.appendChild(makeSubli);
                var optSubText      = obj[n][0] + " " + obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSublist.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi); // create our edit and delete buttons
        }
    }

    function autoFillData () {
        for(var n in json) {
            var id = Math.floor(Math.random() * 19760110);
            localStorage.setItem(id, JSON.stringify(json[n]));	}
    }

    function makeItemLinks(key, linksLi) {
        var editLink       = document.createElement("a");
        editLink.href      = "#";
        editLink.key       = key;
        var editText       = "Edit Print Record";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);

        var breakTag = document.createElement("br");
        linksLi.appendChild(breakTag);

        var deleteLink       = document.createElement("a");
        deleteLink.href      = "#";
        deleteLink.key       = key;
        var deleteText       = "Delete Print Record";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }


    function editItem() {
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);

        toggleControls("off"); // show the form

        $("groups").value   = item.group[1];
        $("printName").value = item.printName[1];
        $("approxDateOfPrint").value = item.approxDateOfPrint[1];


        var radios = document.forms[0].school;
        for (i = 0; i < radios.length; i++){
            if (radios[i].value == "Kaigetsudō school, from 1700–14" && item.school[1] == "Kaigetsudō school, from 1700–14") {
                radios[i].setAttribute("checked", "checked");
            }
            if (radios[i].value == "Torii school, from 1700" && item.school[1] == "Torii school, from 1700") {
                radios[i].setAttribute("checked", "checked");
            }
            if (radios[i].value == "Katsukawa school, from about 1740" && item.school[1] == "Katsukawa school, from about 1740") {
                radios[i].setAttribute("checked", "checked");
            }
            if (radios[i].value == "Utagawa school, from 1842" && item.school[1] == "Utagawa school, from 1842") {
                radios[i].setAttribute("checked", "checked");
            }
            if (radios[i].value == "Sōsaku hanga movement, from 1904" && item.school[1] == "Sōsaku hanga movement, from 1904") {
                radios[i].setAttribute("checked", "checked");
            }
        }
        $("approxValue").value = item.approxValue[1];
        $("datePrint").value = item.datePrint[1];
        $("dateAdded").value = item.dateAdded[1];
        $("additionalComments").value = item.additionalComments[1];

        save.removeEventListener("click", storeData);
        // change Submit button value to say edit
        $("submit").value = "Edit Contact";
        var editSubmit = $("submit");
        // save the key value established in this function as a property
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }

    function deleteItem () {
        var ask = confirm("This is about to delete this entry?");
        if (ask) {
            localStorage.removeItem(this.key);
            alert("Print record was deleted.");
            window.local.reload();
        } else {
            alert("Print record not deleted.");
        }
    }


    function clearLocal() {
        if(localStorage.length === 0) {
            alert("There is no data to clear.")
        } else {
            localStorage.clear();
            alert("All records have been deleted.");
            window.location.reload();
            return false;
        }
    }

    function validate(e) {
        var getGroup = $("groups");
        var getprintName = $("printName");
        var getapproxValue = $("approxValue");
        var getdatePrint = $("datePrint");
        var getdateAdded = $("dateAdded");


        var messageAry = [];
        if (getGroup.value === "--Choose One--") {
            var groupError = "Please select a Japanese print artist.";
            getGroup.style.border = "1px solid red";
            messageAry.push(groupError);
        }

        if (getprintName.value === "") {
            var printNameError = "Please enter a new print into the catalogue.";
            getprintName.style.border = "1px solid red";
            messageAry.push(printNameError);
        }

        if (getapproxValue.value === "") {
            var approxValueError = "Please enter an approximate value.";
            getapproxValue.style.border = "1px solid red";
            messageAry.push(approxValueError);
        }

        if (getdatePrint.value === "") {
            var datePrintError = "Please enter the date printed.";
            getdatePrint.style.border = "1px solid red";
            messageAry.push(datePrintError);
        }

        if (getdateAdded.value === "") {
            var dateAddedError = "Please enter the date acquired.";
            getdateAdded.style.border = "1px solid red";
            messageAry.push(dateAddedError);
        }

        if(messageAry.length >= 1) {
            for(i = 0; i < messageAry.length; i++) {
                var txt = document.createElement("li");
                txt.innerHTML = messageAry[i];
                errMsg.appendChild(txt);
            }
            e.preventDefault();
            return false;
        } else {
            storeData(this.key);
        }
    }


// variable for drop down
    var printGroups = ["--Choose One--", "Hokusai", "Yoshitoshi", "Kuniyoshi"],
        schoolValue,
        errMsg = $("errors");
    makeCats();

// set link and submit click events
    var displayLink = $("displayLink");
    displayLink.addEventListener("click", getData);
    var clearLink = $("clear");
    clearLink.addEventListener("click", clearLocal);
//var searchLink = $("searchLink");
//searchLink.addEventListener("click", getSearch);
    var save = $("submit");
    save.addEventListener("click", validate);

});
