var documentElements = [...document.getElementsByTagName("*")];

// Insert a link to The Bee Movie script every time there is the letter 'B' in code.
function insertLink() {
	documentElements.forEach(function(element) {
		element.childNodes.forEach(function(text) {
			if (text.nodeType == 3) {
				createLink(text);
			}
		});
	});
}

function createLink(str) {
	var a = document.createElement('a');
	a.textContent = "b";
	a.href = "http://www.script-o-rama.com/movie_scripts/a1/bee-movie-script-transcript-seinfeld.html";
	var regex = /bee/gi, result, indices = [], matches = [];
	while ( (result = regex.exec(str.nodeValue)) != null ) {
	    indices.push(result.index);
	    matches.push(result[0]);
	}
	var parentNode = str.parentNode;
	var diff = 0;
	for (var i=0;i<indices.length;i++) {
		var curr_ind = indices[i] - diff;
		var s = str.nodeValue;

		var part1 = s.substr(0, curr_ind);
		var part3 = s.substr(curr_ind + 3);

		var textNode = document.createTextNode(part1);
		parentNode.replaceChild(textNode, str);

		var aNode = document.createElement('a');
		aNode.appendChild(document.createTextNode(matches[i]));
		aNode.href = "http://www.script-o-rama.com/movie_scripts/a1/bee-movie-script-transcript-seinfeld.html";
		parentNode.insertBefore(aNode, textNode.nextSibling);


		textNode = document.createTextNode(part3);
		parentNode.insertBefore(textNode, aNode.nextSibling);
		str = textNode;
		diff = indices[i] + 3;

	}

}

insertLink();
