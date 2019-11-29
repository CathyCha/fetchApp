"use strict";

function loginOwner(event) {
  const ownertxt = document.createTextNode("──────   OWNER   ────── ");
	const ogtxt = document.getElementById("dropdownMenuButton");
 	ogtxt.replaceChild(ownertxt, ogtxt.childNodes[0]);
}

function loginWalker(event) {
  const ownertxt = document.createTextNode("──────   WALKER   ────── ");
  const ogtxt = document.getElementById("dropdownMenuButton");
  ogtxt.replaceChild(ownertxt, ogtxt.childNodes[0]);
}
