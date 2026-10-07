// remove profile picture default alt text and mark as decorative
function profileChange() {
  let image = document.querySelectorAll('[id^="s-lib-profile-image"]');
	let image2 = document.querySelectorAll('[class^="s-lib-featured-profile-image"]');
  if (image.length>0) {
    for(i=0; i<image.length; i++) {
      image[i].children[0].setAttribute("alt", "");
    }
  } else if (image2.length>0) {
      for(i=0; i<image2.length;i++){
        image2[i].children[0].setAttribute("alt","");
      }
  } 
// use if setting the alt text to the librarian's name. NOTE: comment out if statement above; 
  // let name = document.querySelectorAll('[id^="s-lib-profile-name"]');
  // let name2 = document.querySelectorAll('[class*="s-lib-featured-profile-name"]');
  // This area cleans up the text before inserting.;
	/* if (image.length>0) {
		let cleanname = name[0].childNodes[0].textContent.replace(/\n/g, "").trimStart().trimEnd();
		image[0].children[0].setAttribute("alt", cleanname + ".");
		} else if (image2.length>0) {
		  for(i=0; i<image2.length; i++){
			  image2[i].children[0].setAttribute("alt", name2[i].textContent + ".");    
      }
		} */
}

// set alt text for all book covers from catalog to null;
function bookCoverChange() {
	var cover = document.querySelectorAll('[class*="s-lg-book-cover-img-0"]');
	for (i=0; i<cover.length; i++) {
		cover[i].setAttribute("alt","");
	}
} 

// set current page aria attributes for screen readers;
function ariaCurrent() {
  var activePage = document.querySelectorAll('[class*="active"]');
  // set the aria attribute on breadcrumb;
  activePage[0].setAttribute("aria-current","page");
  // set the aria attribute on the appropriate a element in nav menu;
  activePage[1].children[0].setAttribute("aria-current","page");
}

// two functions that make sure the new window target icon appears in anchor element;
// use this function to ensure that blankTarget doesn't duplicate the icon;
function targetWindow() {
	var a = document.getElementsByTagName('a');
	for (i=0; i<a.length; i++) {
		var child = a[i].nextElementSibling;
		if (child != null && child.className === "fa fa-fw fa-external-link ") {
			var readerText = child.nextSibling;
			if (readerText != null && readerText.className === "sr-only") {
				a[i].appendChild(child);
				a[i].appendChild(readerText);
			} else {
				a[i].appendChild(child);
			}
		}
  }
}
// identify all links that open in a new window and add indications;
function blankTarget() {
	const a = document.getElementsByTagName('a');
	var attr;
	for (i=0; i<a.length; i++) {
		if (a[i].hasAttribute("target")) {
			attr = a[i].getAttribute("target");
			if (attr === "_blank" || attr === "_new") {
				var child = a[i].children;
				var iconExists = false;
				var backToTop = a[i].getAttribute("title");
				for (x=0; x<child.length; x++){
					if (child[x].className === "fa fa-fw fa-external-link ") {
						iconExists = true;
					}
				}
				if (iconExists === true) {
					// do nothing -- the indication already exists
        } else if (backToTop === "Back to Top") {
					// do nothing -- make sure that the icon is not put on the link
        } else {
						var newDiv = document.createElement("div");
						newDiv.setAttribute("style","display:inline;");
						newDiv.innerHTML = "<i class='fa fa-fw fa-external-link ' aria-hidden='true' title='This link opens in a new window'></i><span class='sr-only'>This link opens in a new window</span>";
			 			a[i].appendChild(newDiv);
        }
      } else {
        // do nothing to links that do not open in a new window;
      }
    }	
  }
}

// call functions
// in Bootstrap 5, you can call the functions directly in footer JS code; no need for timeouts, etc.;
window.onload = function(){
	setTimeout(profileChange, 1000); <!-- delay required for script to run properly -->
	bookCoverChange();
  ariaCurrent();
  targetWindow();
  blankTarget();
}
