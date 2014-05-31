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
		operationTrim();
	});
	
	// ### Operation - Product ###
	$(".operation-product").click(function() {
		operationProduct();
	});
	$(".operation-product-cache").click(function() {
		auxClearOperationProduct();
	});
	
	
	// ### Operation - Parallel ###
	$(".operation-parallel").click(function() {
		operationParallel();
	});
	$(".operation-parallel-cache").click(function() {
		auxClearOperationParallel();
	});

	// ### Operation - Product ###
	$(".afn-afd").click(function() {
		operationAfnToAfd();
	});
});

var _EMPTY_TRANSITION = 'ε';

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
				} else if (lineSplit[2] == "-if") {
					automatusInfo['states'][state]['initial'] = true;
					automatusInfo['states'][state]['final'] = true;
				}
			}
		} else if (lineSplit[0] == "t") {
			var state1 = lineSplit[1];
			var state2 = lineSplit[2];
			
			if (lineSplit.length == 4) {
				automatusInfo['transitions'].push([state1, lineSplit[3], state2]);
			} else {
				automatusInfo['transitions'].push([state1, _EMPTY_TRANSITION, state2]);
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

function getCurrentInfo() {
	var automatusInfo = {'states': {}, 'transitions': [], '_transitions': {}};
	
	for (var state in nfa.states) {
		automatusInfo.states[state] = {'initial': (state == nfa.startState), 'final': nfa.accept[state]};
	}
	
	var _transitions = automatusInfo['_transitions'];
	
	for (var fromTran in nfa.transitions) {
		for (var viaTran in nfa.transitions[fromTran]) {
			for (var toTran in nfa.transitions[fromTran][viaTran]) {
				automatusInfo['transitions'].push([fromTran, viaTran, toTran]);
				
				if (!_transitions[fromTran]) {
					_transitions[fromTran] = {};
					_transitions[fromTran][viaTran] = {};
				} else if (!_transitions[fromTran][viaTran]) {
					_transitions[fromTran][viaTran] = {};
				}
				
				_transitions[fromTran][viaTran][toTran] = true;
			}
		}
	}
	
	return automatusInfo;
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
					addReachables(key2);
				}
			}
		}
	}
	addReachables(startState);
	
	for (var state in automatusInfo.states) {
		for (var viaTrans in nfa.transitions[state]) {
			for (var toTrans in nfa.transitions[state][viaTrans]) {
				if (automatusInfo.states[toTrans]) {
					automatusInfo['transitions'].push([state, viaTrans, toTrans]);
				}
			}
		}
	}
	
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
	
	for (var state in automatusInfo.states) {
		for (var viaTrans in nfa.transitions[state]) {
			for (var toTrans in nfa.transitions[state][viaTrans]) {
				if (automatusInfo.states[toTrans]) {
					automatusInfo['transitions'].push([state, viaTrans, toTrans]);
				}
			}
		}
	}
	
	return automatusInfo;
}

function operationTrim() {
	var automatusInfoAcc = getInfoOpeAcc();
	var automatusInfoCoAcc = getInfoOpeCoAcc();
	
	var automatusInfo = {'states': {}, 'transitions': [], 'keepPositions': true};
	for (var state in automatusInfoAcc.states) {
		var coAccState = automatusInfoCoAcc.states[state];
		if (coAccState) {
			automatusInfo.states[state] = coAccState; 
		}
	}
	
	var allTransitions = [].concat(automatusInfoAcc.transitions).concat(automatusInfoCoAcc.transitions);
	var auxTransitions = {};
	
	for (var index in allTransitions) {
		var fromT = allTransitions[index][0];
		var viaT = allTransitions[index][1];
		var toT = allTransitions[index][2];
		
		if (automatusInfo.states[fromT] && automatusInfo.states[toT] && (!auxTransitions[fromT] || !auxTransitions[fromT][viaT] || !auxTransitions[fromT][viaT][toT])) {
			if (!auxTransitions[fromT]) {
				auxTransitions[fromT] = {};
				auxTransitions[fromT][viaT] = {};
			} else if (!auxTransitions[fromT][viaT]) {
				auxTransitions[fromT][viaT] = {};
			}
			
			auxTransitions[fromT][viaT][toT] = true;
			
			automatusInfo.transitions.push([fromT, viaT, toT]);
		}
	}

	drawAutomatus(automatusInfo);
}

var automatusForProductBuffer = null;
function operationProduct() {
	if (automatusForProductBuffer) {
		var currentInfo = getCurrentInfo();
		
		var automatusInfo = {'states': {}, 'transitions': []};
		
		function getStateInfo(state1, state2) {
			var stateInfo = {'initial': false, 'final': false};
			if (automatusForProductBuffer.states[state1]['initial'] && currentInfo.states[state2]['initial']) {
				stateInfo['initial'] = true;
			}
			if (automatusForProductBuffer.states[state1]['final'] && currentInfo.states[state2]['final']) {
				stateInfo['final'] = true;
			}
			
			return stateInfo;
		}
		
		for (var state1 in automatusForProductBuffer.states) {
			for (var state2 in currentInfo.states) {
				for (var trans1 in automatusForProductBuffer._transitions[state1]) {
					if (currentInfo._transitions[state2] && currentInfo._transitions[state2][trans1]) {
						var mixState1 = state1 + " | " + state2;
						automatusInfo.states[mixState1] = getStateInfo(state1, state2);
						
						var toState1 = Object.keys(automatusForProductBuffer._transitions[state1][trans1])[0];
						var toState2 = Object.keys(currentInfo._transitions[state2][trans1])[0];
						var mixState2 = toState1 + " | " + toState2;
						automatusInfo.states[mixState2] = getStateInfo(toState1, toState2);
						
						automatusInfo.transitions.push([mixState1, trans1, mixState2]);
					}
				}
			}
		}
		
		drawAutomatus(automatusInfo);
		drawAutomatus(getInfoOpeAcc());
		
		auxClearOperationProduct();
	} else {
		automatusForProductBuffer = getCurrentInfo();
		clearAutomatus();
		
		$(".operation-product-cache").slideDown();
		$(".operation-product a").text("Product Operation 2");
	}
}

function auxClearOperationProduct() {
	automatusForProductBuffer = null;
	$(".operation-product-cache").slideUp();
	
	$(".operation-product a").text("Product Operation 1");
}

var automatusForParallelBuffer = null;
function operationParallel() {
	if (automatusForParallelBuffer) {
		var currentInfo = getCurrentInfo();
		
		var automatusInfo = {'states': {}, 'transitions': []};
		
		function getStateInfo(state1, state2) {
			var stateInfo = {'initial': false, 'final': false};
			if (automatusForParallelBuffer.states[state1]['initial'] && currentInfo.states[state2]['initial']) {
				stateInfo['initial'] = true;
			}
			if (automatusForParallelBuffer.states[state1]['final'] && currentInfo.states[state2]['final']) {
				stateInfo['final'] = true;
			}
			
			return stateInfo;
		}
		
		// Necessário para montar o alfabeto de cada automato
		var allTrans1 = {};
		var allTrans2 = {};
		for (var state1 in automatusForParallelBuffer.states) {
			for (var trans1 in automatusForParallelBuffer._transitions[state1]) {
				allTrans1[trans1] = true;
			}
		}
		for (var state2 in currentInfo.states) {
			for (var trans2 in currentInfo._transitions[state2]) {
				allTrans2[trans2] = true;
			}
		}
		
		for (var state1 in automatusForParallelBuffer.states) {
			for (var state2 in currentInfo.states) {
				var mixState1 = state1 + " | " + state2;
				automatusInfo.states[mixState1] = getStateInfo(state1, state2);
				
				var allTrans = {};
				
				for (var trans1 in automatusForParallelBuffer._transitions[state1]) {
					allTrans[trans1] = true;
				}
				for (var trans2 in currentInfo._transitions[state2]) {
					allTrans[trans2] = true;
				}
				
				for (var trans in allTrans) {
					var toState1 = state1;
					var toState2 = state2;
					
					if (automatusForParallelBuffer._transitions[state1] && automatusForParallelBuffer._transitions[state1][trans]) {
						toState1 = Object.keys(automatusForParallelBuffer._transitions[state1][trans])[0];
					} else if (allTrans1[trans]) {
						// Continua o for pq o alfabeto do primeiro automato possui o evento
						continue;
					}
					if (currentInfo._transitions[state2] && currentInfo._transitions[state2][trans]) {
						toState2 = Object.keys(currentInfo._transitions[state2][trans])[0];
					} else if (allTrans2[trans]) {
						// Continua o for pq o alfabeto do segundo automato possui o evento
						continue;
					}
					
					var mixState2 = toState1 + " | " + toState2;
					automatusInfo.states[mixState2] = getStateInfo(toState1, toState2);

					automatusInfo.transitions.push([mixState1, trans, mixState2]);
				}
			}
		}
		
		drawAutomatus(automatusInfo);
		drawAutomatus(getInfoOpeAcc());
		
		auxClearOperationParallel();
	} else {
		automatusForParallelBuffer = getCurrentInfo();
		clearAutomatus();
		
		$(".operation-parallel-cache").slideDown();
		$(".operation-parallel a").text("Parallel Composition 2");
	}
}

function auxClearOperationParallel() {
	automatusForParallelBuffer = null;
	$(".operation-parallel-cache").slideUp();
	
	$(".operation-parallel a").text("Parallel Composition 1");
}



function operationAfnToAfd() {
		var cAutomatus = getCurrentInfo(),
			cStates = cAutomatus['states'],
			cTransitions = cAutomatus['_transitions'];

		var toVisit = [], visited = {}, initial;
		var automataNotEmpty = {'states': {}, 'transitions': [], 'keepPositions': false};

		//construindo o alfabeto
		var alphabet = {};
		for (var s in cStates) {
			for (var t in cTransitions[s]) {
				alphabet[t] = true;
			}

			if(cStates[s] && cStates[s]['initial']){
				initial = s;
			}
		}

		//construindo a primeira tabela, que contem se é inicial/final, todoas as transicoes e os estados alcancaveis
		var table1 = {};
		for (var s in cStates) {
			var state = cStates[s];

			//todos as transicoes do alfabeto
			for(var a in alphabet){

				//se houver transicoes
				if(cTransitions[s]){
					for(var fs in cTransitions[s][a]){
						if(!state[a]){
							state[a] = [];
						}
						state[a].push(fs);
					}
				}
			}

			//estados alcancaveis (vazios)
			var reachables = [];
		    getAllReachableStates(s, cTransitions, function (n) {
		        reachables.push(n);
		    });

		    state['reachables'] = reachables;
		    table1[s] = state;
		}

		//estados alcancaveis (vazios)
		var init = getUniqueState(table1[initial]['reachables'], "-");
		toVisit.push(init);

		//percorrendo a tabela 1 a partir do no incial, removendo todas as transicoes vazias
		while(toVisit.length > 0){
			var state = toVisit.pop();
			visited[state] = true;

			//adiciona estado ao resultado
			automataNotEmpty.states[state] = getStateConfiguration(state, cStates, "-");

			//se for estado inicial, forçar que seja estado inicial
			if(init == state){
				automataNotEmpty.states[state]['initial'] = true;
			}

			var states =  getStatesByUniqueState(state, "-");

			//todo alfabeto
			for(var a in alphabet){
				if(a != _EMPTY_TRANSITION){
					var statesReachableOfA = [];

				 	//todos os estados que foram aglomerados sao considerados
				 	for(var s in states){
				 		if(table1[states[s]][a]){
				 			statesReachableOfA = statesReachableOfA.concat(table1[states[s]][a]);
				 		}
				 	}

				 	for(var s in statesReachableOfA){
				 		s = statesReachableOfA[s];
				 		//adiciona a transicao no resultado final
				 		var newState = getUniqueState(table1[s]['reachables'], "-");
				 		automataNotEmpty.transitions.push([state, a, newState]);

				 		if(!visited[newState]){
				 			toVisit.push(newState);
				 		}
				 	}
				}
			}
		}


		drawAutomatus(automataNotEmpty);
		cAutomatus = getCurrentInfo();
		cStates = cAutomatus['states'];
		cTransitions = cAutomatus['_transitions'];

		//remover transicoes duplicadas
		initial = null;
		for (var s in cStates) {
			if(cStates[s] && cStates[s]['initial']){
				initial = s;
			}
		}

		var automata = {'states': {}, 'transitions': [], 'keepPositions': false};
		toVisit = [initial]; 
		visited = {};


		//iterar para evitar transicoes duplicadas
		while(toVisit.length > 0){
			var state = toVisit.pop();
			visited[state] = true;
			
			automata.states[state] = getStateConfiguration(state, cStates, ";");

			var states =  getStatesByUniqueState(state, ";");

			//caso seja um estado composto, percorro todos os estados, buscando as transicoes e os estados que são atingidos
			var transitions = {};
			for(var s in states){
				s = states[s];
				for(var t in cTransitions[s]){
					for(var fs in cTransitions[s][t]){
						if(cTransitions[s][t][fs]){
							if (!transitions[t]){
								transitions[t] = [fs];
							}else{
								transitions[t].push(fs);
							}
						}
					}
				}
			}


			//itero as transicoes, inserindo estas transicoes no novo automato e verificando se os novos estados ja foram visitados
			for(var t in transitions){
				var newState = getUniqueState(transitions[t], ";");
				automata.transitions.push([state, t, newState]);

				if(!visited[newState]){
					toVisit.push(newState);
				}
			}
		}

		drawAutomatus(automata);
}

//operationAfnToAfd();

//adaptacao de uma busca em largura que retorna todos os estados alcançaveis por estados vazios
function getAllReachableStates(start, nodes, fn) {
    var frontier = [start];
    var level = 0, levels = {};

    while (0 < frontier.length >>> 0) {
        var next = [];
        for (var i in frontier) {
            var node = frontier[i];
            levels[node] = level;
            
            fn(node);

            for (var t in nodes[node]) {
            	if(t == _EMPTY_TRANSITION){
	            	for(var fs in nodes[node][t]){
	            		//var adj = nodes[node][t];
		                if (void(0) === levels[fs]) {
		                    next.push(fs);
		                }
	            	}
	            }
            }
        }
        frontier = next;
        level += 1;
    }
}




function getUniqueState(states, charSplit){
	var res = "", avoidRepeat = {};
	for(var i in states){
		avoidRepeat[states[i]] = true;
	}

	states = Object.keys(avoidRepeat);
	states.sort();

	for(var i in states){
		res += states[i];
		if(i < states.length-1){
			res += charSplit;
		}
	}
	return res;
}

function getStatesByUniqueState(uniqueState, charSplit){
	return uniqueState.split(charSplit);;
}

// state no formato "s-s1-s2"
function getStateConfiguration(state, cStates, charSplit){
	states = getStatesByUniqueState(state, charSplit);
	var ini = true, fin = false;
	for(var i in states){
		var s = cStates[states[i]];
		ini = ini && (s['initial'] != null && s['initial'] != undefined ? s['initial'] : false);
		fin = fin || (s['final'] != null && s['final'] != undefined ? s['final'] : false);
	}
	return {'initial':ini, 'final':fin};
}