$(document).ready(function() {
	// ### Specify ###
	
	// Div onde se pode especificar um automato atraves de texto
	var divSpec = $(".automatus-spec-area");
	var specArea = divSpec.find("textarea");
	var specConfirm = divSpec.find(".spec-area-confirm a");
	
	$(".button.spec-area").click(function() {
		if (divSpec.is(":visible")) {
			divSpec.hide();
		} else {
			divSpec.show();
		}
	});
	
	specConfirm.click(function() {
		var valueSpec = specArea.val();
		specArea.val("");
		
		var statesList = [];
		for (var key in nfa.states) {
			statesList[statesList.length] = key;
		}
		
		for (var index in statesList) {
			nfa.deleteState(statesList[index]);
		}
		
		fillNFABySpec(valueSpec);
	});
	
	// ### Credits ###
	
	var divCredits = $(".automatus-credits-area");
	
	$(".button.credits-area").click(function() {
		if (divCredits.is(":visible")) {
			divCredits.hide();
		} else {
			divCredits.show();
		}
	});
});

function fillNFABySpec(spec) {
	var specLines = spec.split("\n");
	var allStates = [];
	
	for (var i = 0, length = specLines.length; i < length; i++) {
		var line = specLines[i].trim();
		var lineSplit = line.split(" ");
		
		if (lineSplit[0] == "s") {
			var state = lineSplit[1];
			nfa.addState(state);
			allStates[allStates.length] = state;
			
			if (lineSplit.length == 3) {
				if (lineSplit[2] == "-i") {
					nfa.startState = state;
				} else if (lineSplit[2] == "-f") {
					nfa.addAcceptingState(state);
				}
			}
		} else if (lineSplit[0] == "t") {
			var state1 = lineSplit[1];
			var state2 = lineSplit[2];
			
			if (lineSplit.length == 4) {
				nfa.addTransition(state1, lineSplit[3], state2);
			} else {
				nfa.addTransition(state1, "ε", state2);
			}
		}
	}
	
	var radiusSize = 100 + 10*allStates.length;
	var angleGap = 360 / allStates.length;
	var centerVector = new Vector(100 + radiusSize, 300);

	for (var index = 0; index < allStates.length; index++) {
		var state = allStates[index];
		var currentAngle = 180 - index * angleGap;
		console.log(currentAngle);
		var radians = currentAngle * (Math.PI / 180);
		
		nfaview.states[state].position = new Vector(centerVector.x + radiusSize * (Math.cos(radians)), centerVector.y + radiusSize * (Math.sin(radians)));
	}
	
}