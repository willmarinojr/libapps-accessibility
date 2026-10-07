// use this function to restructure the LibCal weekly table in a more accessible format;
function fixWeeklyHours() {
	// LibCal actually loads 20 tables at a time. Script is looped to fix each separately.
	var dataTable = document.querySelectorAll('[id^="s-lc-w-w"]');
	for (i=0; i<dataTable.length; i++) {
		targetTable = dataTable[i].id;
		var a = document.getElementById(targetTable).getElementsByClassName("s-lc-h-bh");
		var b = document.getElementById(targetTable).getElementsByClassName("s-lc-h-bh")[0].getElementsByTagName("button")[0];
		var b1 = document.getElementById(targetTable).getElementsByClassName("s-lc-h-bh")[0].getElementsByTagName("button")[1];
		var initialDate = document.getElementById(targetTable).getElementsByClassName("s-lc-h-head-date")[0];
		var cap = document.getElementById(targetTable).getElementsByTagName("caption")[0];
		var capContent = "Hours for the week of " + initialDate.innerText;
		var buttonDiv = document.createElement("div");
		a[0].innerHTML = "Location";
		a[0].setAttribute("style","text-align: left;");
		a[0].setAttribute("scope","col");
		buttonDiv.append(b);
		buttonDiv.append(b1);
		buttonDiv.setAttribute("class","flex");
		b.setAttribute("style","margin-right:1%");
		b.innerText = "Previous";
		b1.innerText = "Next";
    // following statement disables the previous button if the first table is loaded;
		if (i==0) {
		b.setAttribute("disabled","disabled");
		}
		document.getElementById(targetTable).appendChild(buttonDiv);
		cap.removeAttribute("class");
		cap.innerHTML = capContent;
		// remove tabindex -1 from column headers
			let colHeads = document.getElementById(targetTable).querySelectorAll("th");
			colHeads.forEach(removeTab);
			function removeTab(colHead){
				colHead.removeAttribute("tabindex");
			}		
		// add today flag to appropriate header, first check to see if today is defined in table;
		if (document.getElementById(targetTable).getElementsByClassName("s-lc-h-today-h")[0] !== undefined) {
			var today = document.getElementById(targetTable).getElementsByClassName("s-lc-h-today-h")[0].getElementsByClassName("s-lc-h-head-date")[0];
			var text = document.getElementById(targetTable).getElementsByClassName("s-lc-h-today-h")[0].getElementsByClassName("s-lc-h-head-date")[0].textContent;
			if (text.includes("Today")) {
        // do nothing, marker already exists;
      } else {
				today.innerHTML = "Today <br>" + text;
        today.insertAdjacentHTML('beforeend','<br>');
			}
    today.style.color = "#000";
		}
	}
}

// call function;
window.addEventListener("load", fixWeeklyHours);
