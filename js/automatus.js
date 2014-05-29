$(document).ready(function() {
	// ### Specify ###
	
	// Div onde se pode especificar um automato atraves de texto
	var divSpec = $(".automatus-spec-area");
	var specArea = divSpec.find("textarea");
	var specConfirm = divSpec.find(".spec-area-confirm a");
	
	$(".spec-area").click(function() {
		console.log("x")
		if (divSpec.is(":visible")) {
			divSpec.hide();
		} else {
			divSpec.show();
		}
	});
	
	specConfirm.click(function() {
		var valueSpec = specArea.val();
		specArea.val("");
		
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
	
	// ### Operation - Trim ###
	
	$(".operation-trim").click(function() {
		operationAcc();
	});
});

function fillNFABySpec(spec) {
	var specLines = spec.split("\n");
	
	var automatusInfo = {'states': {}, 'transitions': []};
	
	for (var i = 0, length = specLines.length; i < length; i++) {
		var line = specLines[i].trim();
		var lineSplit = line.split(" ");
		
		if (lineSplit[0] == "s") {
			var state = lineSplit[1];
			automatusInfo['states'][state] = {'initial': false, 'final': false};
			
			if (lineSplit.length == 3) {
				if (lineSplit[2] == "-i") {
					automatusInfo['states'][state]['initial'] = true;
				} else if (lineSplit[2] == "-f") {
					automatusInfo['states'][state]['final'] = true;
				}
			}
		} else if (lineSplit[0] == "t") {
			var state1 = lineSplit[1];
			var state2 = lineSplit[2];
			
			if (lineSplit.length == 4) {
				automatusInfo['transitions'].push([state1, lineSplit[3], state2]);
			} else {
				automatusInfo['transitions'].push([state1, "ε", state2]);
			}
		}
	}
	
	drawAutomatus(automatusInfo);
}

function clearAutomatus() {
	var statesList = [];
	for (var key in nfa.states) {
		statesList[statesList.length] = key;
	}
	
	for (var index in statesList) {
		nfa.deleteState(statesList[index]);
	}
}

function drawAutomatus(automatusInfo) {
	var initX = 350;

	var cachePositions = null;
	if (automatusInfo['keepPositions']) {
		cachePositions = {};
		for (var state in nfaview.states) {
			cachePositions[state] = nfaview.states[state].position;
		}
	}
	
	clearAutomatus();
	
	var automatusInfoStates = automatusInfo['states'];
	for (var state in automatusInfoStates) {
		nfa.addState(state);
		
		if (automatusInfoStates[state].initial) {
			nfa.startState = state;
		}
		if (automatusInfoStates[state].final) {
			nfa.addAcceptingState(state);
		}
	}
	
	var automatusInfoTransitions = automatusInfo['transitions'];
	for (var index in automatusInfoTransitions) {
		var trans = automatusInfoTransitions[index];
		nfa.addTransition(trans[0], trans[1], trans[2]);
	}
	
	var allStates = Object.keys(automatusInfoStates);
	
	var radiusSize = 100 + 10*allStates.length;
	var angleGap = 360 / allStates.length;
	var centerVector = new Vector(initX + radiusSize, 300);

	for (var index = 0; index < allStates.length; index++) {
		var state = allStates[index];
		var currentAngle = 180 - index * angleGap;
		var radians = currentAngle * (Math.PI / 180);
		
		if (cachePositions) {
			nfaview.states[state].position = cachePositions[state];
		} else {
			nfaview.states[state].position = new Vector(centerVector.x + radiusSize * (Math.cos(radians)), centerVector.y + radiusSize * (Math.sin(radians)));
		}
	}
}

function getInfoOpeAcc() {
	var startState = nfa.startState;
	var automatusInfo = {'states': {}, 'transitions': []};
	automatusInfo['states'][startState] = {'initial': true, 'final': nfa.accept[startState]};
	
	function addReachables(state) {
		var fromState = nfa.transitions[state];
		for (var key in fromState) {
			for (var key2 in fromState[key]) {
				if (!automatusInfo['states'][key2]) {
					automatusInfo['states'][key2] = {'initial': false, 'final': nfa.accept[key2]};  
					automatusInfo['transitions'].push([state, key, key2]);
					
					addReachables(key2);
				}
			}
		}
	}
	addReachables(startState);
	
	return automatusInfo;
}

function getInfoOpeCoAcc() {
	var automatusInfo = {'states': {}, 'transitions': []};

	function addReachables(state) {
		for (var fromTran in nfa.transitions) {
			for (var viaTran in nfa.transitions[fromTran]) {
				for (var toTran in nfa.transitions[fromTran][viaTran]) {
					if (toTran == state && !automatusInfo['states'][fromTran]) {
						automatusInfo['states'][fromTran] = {'initial': (nfa.startState == fromTran), 'final': false};
						automatusInfo['transitions'].push([fromTran, viaTran, toTran]);
						
						addReachables(fromTran);
					}
				}
			}
		}
	}
	
	for (var finalState in nfa.accept) {
		automatusInfo['states'][finalState] = {'initial': (nfa.startState == finalState), 'final': true};
		addReachables(finalState);
	}
	
	return automatusInfo;
}

function operationAcc() {
	var automatusInfo = getInfoOpeAcc();
//	var automatusInfo = getInfoOpeCoAcc();
	automatusInfo['keepPositions'] = true;

	drawAutomatus(automatusInfo);
}