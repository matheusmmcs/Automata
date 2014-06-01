var nfa = new NFA( [ '0', '1' ] );
var nfaview = new NFAView( nfa );

var initX = 280;

nfa.addState( 'B' );
nfa.addState( 'C' );
nfa.addState( 'D' );
nfa.addState( 'E' );
nfa.addTransition( 's', 'a', 'B' );
nfa.addTransition( 's', 'b', 'C' );
nfa.addTransition( 'B', 'a', 'B' );
nfa.addTransition( 'B', 'b', 'D' );
nfa.addTransition( 'C', 'a', 'B' );
nfa.addTransition( 'C', 'b', 'C' );
nfa.addTransition( 'D', 'a', 'B' );
nfa.addTransition( 'D', 'b', 'E' );
nfa.addTransition( 'E', 'a', 'B' );
nfa.addTransition( 'E', 'b', 'C' );
nfa.addAcceptingState( 'E' );
nfaview.states[ 's' ].position = new Vector( initX + 200, 300 );
nfaview.states[ 'B' ].position = new Vector( initX + 400, 300 );
nfaview.states[ 'C' ].position = new Vector( initX + 400, 100 );
nfaview.states[ 'D' ].position = new Vector( initX + 400, 500 );
nfaview.states[ 'E' ].position = new Vector( initX + 800, 300 );

// nfa.addState( 'q_1' );
// nfa.addState( 'q_2' );
// nfa.addState( 'q_3' );
// nfa.addState( 'q_4' );
// nfa.addState( 'q_5' );
// nfa.addState( 'q_6' );
// nfa.addTransition( 's', 'b', 's' );
// nfa.addTransition( 's', 'a', 'q_1' );
// nfa.addTransition( 's', 'ε', 'q_1' );
// nfa.addTransition( 's', 'a', 'q_2' );
// nfa.addTransition( 'q_1', 'b', 'q_2' );
// nfa.addTransition( 'q_2', 'a', 'q_3' );
// nfa.addTransition( 'q_2', 'b', 'q_3' );
// nfa.addTransition( 'q_2', 'a', 'q_6' );
// nfa.addTransition( 'q_2', 'b', 'q_6' );
// nfa.addTransition( 'q_3', 'a', 's' );
// nfa.addTransition( 'q_3', 'b', 's' );
// nfa.addTransition( 'q_3', 'a', 'q_4' );
// nfa.addTransition( 'q_3', 'c', 'q_5' );
// nfa.addTransition( 'q_4', 'ε', 'q_5' );
// nfa.addTransition( 'q_6', 'b', 'q_2' );
// nfa.addTransition( 'q_6', 'c', 'q_2' );
// nfa.addAcceptingState( 'q_5' );
// nfaview.states[ 's' ].position = new Vector( initX + 100, 200 );
// nfaview.states[ 'q_1' ].position = new Vector( initX + 250, 100 );
// nfaview.states[ 'q_2' ].position = new Vector( initX + 400, 200 );
// nfaview.states[ 'q_3' ].position = new Vector( initX + 400, 400 );
// nfaview.states[ 'q_4' ].position = new Vector( initX + 250, 500 );
// nfaview.states[ 'q_5' ].position = new Vector( initX + 100, 400 );
// nfaview.states[ 'q_6' ].position = new Vector( initX + 700, 200 );



//nfa.addState( 's1' );
//nfa.addState( 's2' );
//nfa.addTransition( 's', '0', 's' );
//nfa.addTransition( 's', '1', 's' );
//nfa.addTransition( 's', '1', 's1' );
//nfa.addTransition( 's1', '0', 's2' );
//nfa.addAcceptingState( 's2' );
//nfaview.states[ 's' ].position = new Vector( initX + 250, 100 );
//nfaview.states[ 's1' ].position = new Vector( initX + 400, 200 );
//nfaview.states[ 's2' ].position = new Vector( initX + 400, 400 );



// nfa.addState( '2' );
// nfa.addState( '3' );
// nfa.addState( '4' );
// nfa.addTransition( 's', 'a', '2' );
// nfa.addTransition( 's', 'c', '2' );
// nfa.addTransition( 's', 'c', '4' );
// nfa.addTransition( '2', 'ε', 's' );
// nfa.addTransition( '2', 'b', '3' );
// nfa.addTransition( '3', 'a', '2' );
// nfa.addTransition( '4', 'c', '3' );
// nfa.addTransition( '4', 'ε', '3' );
// nfa.addAcceptingState( '3' );
// nfaview.states[ 's' ].position = new Vector( initX + 200, 300 );
// nfaview.states[ '2' ].position = new Vector( initX + 400, 200 );
// nfaview.states[ '3' ].position = new Vector( initX + 600, 300 );
// nfaview.states[ '4' ].position = new Vector( initX + 400, 400 );



// nfa.addState( '1' );
// nfa.addState( '2' );
// nfa.addState( '3' );
// nfa.addState( '4' );
// nfa.addState( '5' );
// nfa.addState( '6' );
// nfa.addState( '7' );
// nfa.addState( '8' );
// nfa.addState( '9' );
// nfa.addState( '10' );
// nfa.addTransition( 's', 'ε', '1' );
// nfa.addTransition( 's', 'ε', '7' );
// nfa.addTransition( '1', 'ε', '2' );
// nfa.addTransition( '1', 'ε', '4' );
// nfa.addTransition( '2', 'a', '3' );
// nfa.addTransition( '4', 'b', '5' );
// nfa.addTransition( '3', 'ε', '6' );
// nfa.addTransition( '5', 'ε', '6' );
// nfa.addTransition( '6', 'ε', '7' );
// nfa.addTransition( '6', 'ε', '1' );
// nfa.addTransition( '7', 'a', '8' );
// nfa.addTransition( '8', 'b', '9' );
// nfa.addTransition( '9', 'b', '10' );
// nfa.addAcceptingState( '10' );
// nfaview.states[ 's' ].position = new Vector( initX + 200, 300 );
// nfaview.states[ '1' ].position = new Vector( initX + 250, 300 );
// nfaview.states[ '2' ].position = new Vector( initX + 300, 200 );
// nfaview.states[ '4' ].position = new Vector( initX + 300, 400 );
// nfaview.states[ '3' ].position = new Vector( initX + 350, 200 );
// nfaview.states[ '5' ].position = new Vector( initX + 350, 400 );
// nfaview.states[ '6' ].position = new Vector( initX + 400, 300 );
// nfaview.states[ '7' ].position = new Vector( initX + 450, 300 );
// nfaview.states[ '8' ].position = new Vector( initX + 500, 300 );
// nfaview.states[ '9' ].position = new Vector( initX + 550, 300 );
// nfaview.states[ '10' ].position = new Vector( initX + 600, 300 );
