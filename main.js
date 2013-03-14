<!--James Jackson-->
<!--VFW 1303-->
<!--Project 2-->

window.addEventListener("DOMContentLoaded", function () {

// getting element by id
    function $(i) {
        var theElement = document.getElementById(i);
        return theElement;
    }


    function createOptions() {
        var formTag = document.getElementsByTagName("form");
        makeSelect = document.createElement("select");
        var	selectLi = $("select");
        makeSelect.setAttribute("id", "groups");
        for (var i = 0; i < printGroups.length; i++) {
            var makeOption = document.createElement("option");
            var optText = printGroups[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }


// find value of selected radio button
    function retrieveRadioValue() {
        var radios = document.forms[0].school;
        for (var i=0; i < radios.length; i++){
            if (radios[i].checked) {
                schoolValue = radios[i].value;
            }
        }
    }



// turn links on and off
    function switchControls(n) {
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

    function retrieveCheckbox(){
        if($('recordComplete').checked) {
            recordCompleteValue = 'Yes';
        }else{
            recordCompleteValue = 'No'
        }
    }

// function for storing input data from form
    function storeData(key) {
        if(!key) {
            var id = Math.floor(Math.random() * 19760110);
        } else {
            id = key;
        }
        retrieveRadioValue();
        retrieveCheckbox();
        var item             = {};
        item.group = ["Artist:", $("groups").value];
        item.printName = ["Print Name:", $("printName").value];
        item.approxDateOfPrint = ["Approximate Date:", $("approxDateOfPrint").value];
        item.school = ["Version:", schoolValue];
        item.approxValue = ["Cost:", $("approxValue").value];
        item.datePrint = ["Date Printed:", $("datePrint").value];
        item.dateAdded = ["Date Acquired:", $("dateAdded").value];
        item.additionalComments = ["Comments:", $("additionalComments").value];
        item.recordComplete = ["Completed Record?", recordCompleteValue];
        localStorage.setItem(id, JSON.stringify(item));
        alert("Japanese print record saved");
    }

    function retireveRecords() {
        switchControls("on");
        if (localStorage.length === 0) {
            alert("I automagically added some records for you!");
            automagicRecords();
        }
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id","items");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $("items").style.display = "block";
        for (var i = 0; i < localStorage.length; i++) {
            var makeli = document.createElement("li");
            var linksLi = document.createElement("li");
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSublist = document.createElement("ul");
            makeli.appendChild(makeSublist);
            for (var n in obj) {
                var makeSubli = document.createElement("li");
                makeSublist.appendChild(makeSubli);
                var optSubText = obj[n][0] + " " + obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSublist.appendChild(linksLi);
            }
            linkTogether(localStorage.key(i), linksLi);
        }
    }

    function automagicRecords () {
        for(var n in json) {
            var id = Math.floor(Math.random() * 19760110);
            localStorage.setItem(id, JSON.stringify(json[n]));	}
    }

    function linkTogether(key, linksLi) {
        var editLink       = document.createElement("a");
        editLink.href      = "#";
        editLink.key       = key;
        var editText       = "Edit Print Record";
        editLink.addEventListener("click", editPrintRecords);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);

        var breakTag = document.createElement("br");
        linksLi.appendChild(breakTag);

        var deleteLink       = document.createElement("a");
        deleteLink.href      = "#";
        deleteLink.key       = key;
        var deleteText       = "Delete Print Record";
        deleteLink.addEventListener("click", deletePrintRecords);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }


    function editPrintRecords() {
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);

        switchControls("off"); // show the form

        $("groups").value   = item.group[1];
        $("printName").value = item.printName[1];
        $("approxDateOfPrint").value = item.approxDateOfPrint[1];
        $("recordCompleteValue").value = item.recordComplete[1];


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
        editSubmit.addEventListener("click", validateInput);
        editSubmit.key = this.key;
    }

    function deletePrintRecords () {
        var ask = confirm("This is about to delete this entry?");
        if (ask) {
            localStorage.removeItem(this.key);
            alert("Print record was deleted.");
            window.local.reload();
        } else {
            alert("Print record not deleted.");
        }
    }


    function clearLocalStorage() {
        if(localStorage.length === 0) {
            alert("There is no data to clear.")
        } else {
            localStorage.clear();
            alert("All records have been deleted.");
            window.location.reload();
            return false;
        }
    }

    function validateInput(e) {
        var getGroup = $("groups");
        var getprintName = $("printName");
        var getapproxValue = $("approxValue");
        var getdatePrint = $("datePrint");
        var getdateAdded = $("dateAdded");
        var recordComplete = $("recordComplete");


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

        if (recordComplete.value === "") {
            var recordCompleteError = "Please check if record complete.";
            recordCompleteAdded.style.border = "1px solid red";
            messageAry.push(recordCompleteError);
        }

        if (messageAry.length >= 1) {
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
        schoolValue;
        recordCompleteValue = 'No';
        errMsg = $("errors");
        createOptions();

// set link and submit click events
    var displayLink = $("displayLink");
    displayLink.addEventListener("click", retireveRecords);
    var clearLink = $("clear");
    clearLink.addEventListener("click", clearLocalStorage);

//var searchLink = $("searchLink");
//searchLink.addEventListener("click", getSearch);
    var save = $("submit");
    save.addEventListener("click", validateInput);

});
