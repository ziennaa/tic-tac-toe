// importing view and store, which was made for better functionality and readibility of code
import View from './view.js';
import Store from './store.js';
/*
// toggling menu first
const App = {
    /*
    $ is just a valid variable name or object key
    no special meaning
    pretty standard convention prefix
    so this would be the property of the namespace
    convention that devs often use for specific purpose
    usually used to group DOM references*/
    // All of OUR SELECTED HTML ELEMENTS
    /*
    $: {
        menu : document.querySelector('[data-id= "menu"]'),
        // selected action div class
        menu_item : document.querySelector('[data-id= "menu-items"]'),
        // globally availabe to us in runtime now
        reset_btn : document.querySelector('[data-id= "reset-btn"]'),
        new_round_btn : document.querySelector('[data-id= "new-round-btn"]'),
        squares : document.querySelectorAll('[data-id= "square"]'),
        model : document.querySelector('[data-id= "model"]'),
        model_text : document.querySelector('[data-id= "model-text"]'),
        model_btn : document.querySelector('[data-id= "model-btn"]'),
        turn : document.querySelector('[data-id="turn"]')
    },
    state: {
        //currentPlayer:1,
        /*we dont need current players we'll be 
        able to derive it on the basis of moves array */
        // now we're thinking of which player icon to add
        // to square
       /* moves: [],
    },
    getGameStatus(moves){
        const p1moves = moves.filter((move)=>move.playerId===1).map((move)=> +move.squareId);
        const p2moves = moves.filter((move)=>move.playerId===2).map((move)=> +move.squareId);
        // check if there is a winner or tie game
        console.log(p1moves);
        const winning_patterns=[
                    // all 8 patterns
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,4,7],
            [2,5,8],
            [3,6,9],
            [1,5,9],
            [3,5,7],
        ];
                /* instead of looping through each square
                we're gonna track that in state*/
      /*  let winner = null;
        winning_patterns.forEach(patters=> {
            //console.log({patters, p1moves, p2moves});
            const p1wins = patters.every((v)=>p1moves.includes(v))
            const p2wins = patters.every((v)=>p2moves.includes(v))

            if(p1wins) winner=1;
            if(p2wins) winner=2;
        });
        return{
            status: moves.length===9 || winner != null ? 'complete':'in-progress', // in progress || completed
            winner: winner, // either 1 or 2 or null
        }
    },
    init(){
        // 4 events being listed in init method
        App.registerEventListener();
    },
    // our method to add event listeners here init
    //initialisation logic 
    // allows us to control when our logic initialises!!!

    // now making a new method
    registerEventListener(){
        //TOGGLING DONE
        App.$.menu.addEventListener('click', (event)=>{
            App.$.menu_item.classList.toggle('hidden');
        });
        // RESET-TODO
        App.$.reset_btn.addEventListener('click', (event)=>{
            console.log("reset reset!!!")
        });
        // NEW ROUND-TODO
        App.$.new_round_btn.addEventListener('click', (event)=>{
            console.log("new round new round new round!!!")
        });
        App.$.model_btn.addEventListener('click', event=>{
            App.state.moves=[];
            App.$.model.classList.add('hidden');
            // but even after adding hide again game is
            // at that place where we left it off
            // so we do this
            App.$.squares.forEach(square=>square.replaceChildren());
        })
        // ADDING X&O-TODO
        console.log(App.$.squares);
        App.$.squares.forEach(square => {
            square.addEventListener('click', event=>{
                console.log(
                    `Square with id ${event.target.id} was clicked`
                ); 
                //<i class="fa-solid fa-x yellow"></i>
                //<i class="fa-solid fa-o turquoise"></i>
                /*target always represents the html element that was clicked
                not necesrailliy the square itself
                console.log(`current player is ${App.state.currentPlayer}`);
                console.log("square: ", square);
                console.log("event target: ", event.target);
                // square represents div 
                // event target also div
                // till now we're still seeing 2 or more icons 
                // on the same square if we click the same square many times
                // icon ne welement html tag not in div but in event target
                // so we should be updating square elemenet itself and not
                // relying on event

                // check if there is already a play, if so, return early
                /*if(square.hasChildNodes()){
                    return;
                }
               const has_move = (squareId)=>{
                const existing_move = App.state.moves.find(
                    move=> move.squareId===squareId
                    // look for move
                    // looks for the square id matches with square id passing
                );
                return existing_move !== undefined; 
               };
               if(has_move(+square.id)){
                //look for square id in that array a number
                // returns us whether theres a move or now
                return;
               }
               // basically checking whether the square has been filled or not
               // and if filled, cannot be filled again
                const square_icon = document.createElement('i');
                // determine which player icon to add to square
                const lastmove = App.state.moves.at(-1);
                const get_opposite_player = (playerId) => playerId===1?2:1;
                const currentPlayer = App.state.moves.length===0?1:get_opposite_player(lastmove.playerId);
                //current player signifies who is actually clicking rn
                const nextplayer = get_opposite_player(currentPlayer);
                const turnlabel  = document.createElement('p');
                const turnicon = document.createElement('i');
                turnlabel.innerText = `Player ${nextplayer} you're up!`;
                //turnlabel.classList = 'turquoise';
                if(currentPlayer===1){
                    square_icon.classList.add('fa-solid', 'fa-x', 'yellow');
                    turnicon.classList.add('fa-solid', 'fa-o', 'turquoise');
                    //turnlabel.innerText = `Player ${nextplayer} you're up!`;
                    turnlabel.classList = 'turquoise';
                }else{
                    square_icon.classList.add('fa-solid', 'fa-o', 'turquoise');
                    turnicon.classList.add('fa-solid', 'fa-x', 'yellow');
                    //turnlabel.innerText = `Player ${nextplayer} you're up!`;
                    turnlabel.classList = 'yellow';
                }
                App.$.turn.replaceChildren(turnicon, turnlabel);
                App.state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer,
                })
                App.state.currentPlayer = currentPlayer===1?2:1;
                // toggle on who's playing the game
                // we hardcoded the element for now
                // now we need to insert the element
                console.log(App.state);
                square.replaceChildren(square_icon);
                // we cant play in a square twice
                // right now its causing unsolicated behavior
                // so we make a check, if theres something return early
                // otherwise no

                /*console.log({patters, p1moves, p2moves});
                // check if there is a winner or tie game
                const winning_patterns=[
                    // all 8 patterns
                    [1,2,3],
                    [4,5,6],
                    [7,8,9],
                    [1,4,7],
                    [2,5,8],
                    [3,6,9],
                    [1,5,9],
                    [3,5,7],
                ];*/
                /* instead of looping through each square
                we're gonna track that in state*/
              /*  const game = App.getGameStatus(App.state.moves)
                console.log(game);
                if(game.status === 'complete'){
                    App.$.model.classList.remove('hidden');
                    let text = '';
                    if(game.winner){
                        //alert(`Player ${game.winner} wins!`);
                        text = `Player ${game.winner} wins!`;
                    }else{
                        //alert('TIE');
                        text = `It's a tie :|`;
                    };
                    /*now the goal is to open model and give
                    user option to play again and reset the game
                    or start over the game
                    basically
                    new round
                    reset
                    play again + with infor of who wins or tie */
                   // App.$.model_text.textContent = text;
             //   };
           // });
        //});
        
    //},
//};
/*
menu.addEventListener('click', event =>{
    console.log('hi');
    console.log(event.target);
    menu_item.classList.toggle('hidden');
    /
    this was in gloabl scope
    element : base class from which all element objects 
    in a doc inherit
    classlist : has a toggle method of dom 
    toggle : removes an existing to and from the list 
    and returns false
    basically add and remove

    // element getting printed on console
})
*/
//window.addEventListener('load', ()=>App.init());*/
/*
window: wait for document to load so that it becomes
safe to use then
'load' first whole project is loaded and then this gets used
all html is firstly parsed and now we can initialise normally
*/
 /*
 now for RESET and NEWROUND
 instead of adding classes we can add data-id
 much more stable way to select elements
 data-* : allows proprietry information to be exchanged between 
 html and css
 globle attribute for a class of attributes
 custom
 App.$ groups all your selected DOM 
 elements in one place.
You know where to look when 
you need to change a selector or debug something.

Scalability
Imagine a file with 50 
DOM elements and 20+ functions.
Keeping everything in one namespace
 (App) makes it way easier to manage and avoid global variables.

 Easier testing or refactoring
If tomorrow you want to change
 how you select buttons, you change only 
 in App.$, not all over your file.

 reset, new round, adding x and o 
 turn indicator icon to  play
 what is a game move
 who is currently up
 did the latest move cause a tie or game to win
 state
 current player
 total wins
 total tie
 prior game history
 */

 function init(){
    const view = new View(); // making class instant of view
    const player = [
        {
            id: 1,
            name: "Player 1",
            iconClass: "fa-x",
            colorClass: "turquoise",

        },
        {
            id: 2,
            name: "Player 2",
            iconClass: "fa-o",
            colorClass: "yellow",
        },
    ];
    console.log(view.$.turn); // to check if it was initialised correctly or not
    const store = new Store(player);
    console.log(store.Game);
    

    view.bindGame_reset_event((event)=>{
        console.log("reset event!!!");
        console.log(event);
        view.closeAll();
        // works but doesn't reset so
        store.reset();
        view.clearMoves();
        view.setTurnIndicator(store.Game.currentPlayer); // player 1 is gonna be up in next game
        view.updateScoreboard(store.stats.playerwithstats[0].wins, store.stats.playerwithstats[1].wins, store.stats.ties);
        console.log(store.stats);
    });
    view.bindGame_NewRound_event((event)=>{
        console.log("new round new round!!!");
        console.log(event);
        store.newRound();
        view.closeAll();
        view.clearMoves();
        view.setTurnIndicator(store.Game.currentPlayer);
        view.updateScoreboard(store.stats.playerwithstats[0].wins, store.stats.playerwithstats[1].wins, store.stats.ties);
        
    });
    view.bindGame_PlayerMove_event((square)=>{
        console.log("player moves!");
        console.log(event);
        //const clicked_square = event.target;
        const existing_move = store.Game.moves.find(move => move.squareId === +square.id);
        if(existing_move){
            return
        }
        // place an icon of the currentplayer in the square
        view.handleplayermove(square, store.Game.currentPlayer);
        // advance to the next state by pushing the move to the moves array
        store.playerMove(+square.id);
        // we wanna update our state, but not current player but for next player
        // state change happened between the 2 store.Game.currentPlayer
        if(store.Game.status.isComplete){
            view.openModel(store.Game.status.winner? `${store.Game.status.winner.name} wins!`: 'Tie!' );
            return;
        }
        // set the next player indicator
        view.setTurnIndicator(store.Game.currentPlayer);
        //view.handleplayermove(event.target, player[1]);
        // first we need to handle the player

    });
 }
 window.addEventListener('load', init);
 // getting uncaught reference error view is not defined
 //using es6 module for better readibility 
 /*view.js
 section1: register all event listeners
 section2: DOM helper methods

  */