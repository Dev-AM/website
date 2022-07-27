console.log("Init")

/*
class HTMLInclude extends HTMLElement {
  constructor() {
      super();
      this.innerHTML = "Loading...";
      this.loadContent();
  }

  async loadContent() {
      const source = this.getAttribute("src");
      if (!source) {
          throw new Error("No src attribute given.");
      }
      const response = await fetch(source);
      if (response.status !== 200) {
          throw new Error(`Could not load resource: ${source}`);
      }
      const content = await response.text();
      this.innerHTML = content;
  }
}
window.customElements.define("html-include", HTMLInclude);
*/

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    // Loop through a collection of all HTML elements: 
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      //search for elements with a certain atrribute:
      file = elmnt.getAttribute("include-html");
      if (file) {
        // Make an HTTP request using the attribute value as the file name:
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            // Remove the attribute, and call this function once more:
            elmnt.removeAttribute("include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        // Exit the function:
        return;
      }
    }
  }
  