// Put all elements into an Array
var documentElements = [...document.getElementsByTagName("*")];

// Insert a link to The Bee Movie script every time there is the letter 'B' in code.
function insertLink() {
	documentElements.forEach(function(element) {
		element.childNodes.forEach(function(text) {
			// Check if the node is text(ie nodeType = 3)
			// If so, we can turn it into a link to the script if it's "bee"
			if (text.nodeType == 3) {
				createLink(text);
			}
		});
	});
}

function createLink(str) {
	// var a = document.createElement('a');
	// a.textContent = "b";
	// a.href = "http://www.script-o-rama.com/movie_scripts/a1/bee-movie-script-transcript-seinfeld.html";
	
	var regex = /bee/gi, result, indices = [], matches = [];

	// Keep all text matches of "bee" along with their indices to insert link later
	while ( (result = regex.exec(str.nodeValue)) != null ) {
	    indices.push(result.index);
	    matches.push(result[0]);
	}

	// Create new link element to replace the original text element based on results above
	var parentNode = str.parentNode;
	var diff = 0;
	for (var i=0;i<indices.length;i++) {
		var curr_ind = indices[i] - diff;
		var s = str.nodeValue;

		// Keep everything before the text we want to replace
		var part1 = s.substr(0, curr_ind);
		// And keep everything after the text we want to replace
		var part3 = s.substr(curr_ind + 3);

		var textNode = document.createTextNode(part1);
		parentNode.replaceChild(textNode, str);

		// Create the link to insert after part1
		var aNode = document.createElement('a');
		aNode.appendChild(document.createTextNode(matches[i]));
		aNode.href = "http://www.script-o-rama.com/movie_scripts/a1/bee-movie-script-transcript-seinfeld.html";
		parentNode.insertBefore(aNode, textNode.nextSibling);

		// Insert part3 text after the link
		textNode = document.createTextNode(part3);
		parentNode.insertBefore(textNode, aNode.nextSibling);
		str = textNode;
		diff = indices[i] + 3;
	}

}

insertLink();
