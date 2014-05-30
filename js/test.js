var nfa = new NFA( [ '0', '1' ] );
var nfaview = new NFAView( nfa );

var initX = 280;

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



nfa.addState( 's1' );
nfa.addState( 's2' );

nfa.addTransition( 's', '0', 's' );
nfa.addTransition( 's', '1', 's' );
nfa.addTransition( 's', '1', 's1' );
nfa.addTransition( 's1', '0', 's2' );

nfa.addAcceptingState( 's2' );

nfaview.states[ 's' ].position = new Vector( initX + 250, 100 );
nfaview.states[ 's1' ].position = new Vector( initX + 400, 200 );
nfaview.states[ 's2' ].position = new Vector( initX + 400, 400 );