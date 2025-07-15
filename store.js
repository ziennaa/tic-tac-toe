/* till now, we're doing doing view logic and hardcoding values wheras in app.js we had state variables where we were tracking moves and based on thr moves 
we were getting game status
information:
if there is a winner
tie/ win
which player

RULE : DO NOT MUTATE STATE
redux(used before react commonly) we follow this cuz it avoids bugs generally if we do not use this sometimes it fails to re-render it 
previously we used state and updated it for smaller apps it's ok but as go on for building at a larger scale, it should be avoided

getter methods needed to read state, since we set everything as private*/
const initial_value = {
    moves:[],
    history: {
        current_round_game: [],
        allGames: [],
    }
};
export default class Store{
    #state = initial_value;
    constructor(player){
        this.player = player;
    }
    get stats(){
        // getting us total no of wins from player
        const state = this.#getState();
        console.log(this.#getState());
        return{
            playerwithstats: this.player.map((player) => {
                const wins = state.history.current_round_game.filter(
                    (Game) => Game.status.winner?.id === player.id
                ).length;
                return{
                    ... player,
                    wins
                }
            }),
            ties: state.history.current_round_game.filter(Game => Game.status.winner === null).length
        };
    }
    // purpose of getter object is to get raw state object which is just an array of game moves
    // and calculate all sorts of information from that
    get Game(){
        const state = this.#getState();
        // tells us how many moves in current game
        // return 0 or 1
        // player 1 = 0, player 2=1
        // basically its returning even or odd
        const currentPlayer = this.player[state.moves.length % 2];
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
        let winner = null;
        for(const player of this.player){
            const selected_square_ids = state.moves.filter(move => move.player.id === player.id).map(move => move.squareId);
            // array of raw state of moves and filter out array player that doesn't matter
            for(const patterns of winning_patterns){
                if(patterns.every(v => selected_square_ids.includes(v))){
                    winner = player;
                }
            }
        }
        // we're going through both loops and if no winning pattern is faced then winner = null , telling if it was tie game
        return{
            moves : state.moves,
            currentPlayer,
            status: {
                isComplete : winner != null || state.moves.length === 9,
                winner,
            },
            //winner,
            //moves : state.moves,
            //currentPlayer,
        };
    }
    playerMove(squareId){
        const stateClone = structuredClone(this.#getState());
        //const stateClone = structuredClone(state);
        // were no longer passing a value of ref
        stateClone.moves.push({
            squareId,
            player: this.Game.currentPlayer,
        })
        this.#saveState(stateClone)
    }
    reset(){
        const stateClone = structuredClone(this.#getState());
        const {status, mmoves} = this.Game;
        if(status.isComplete){
            stateClone.history.current_round_game.push({
                mmoves,
                status,
            })
        }
        stateClone.moves = []
        this.#saveState(stateClone);
    }
    newRound(){
        // basically take all of the games and push them in allgames array
        // basically we will clear out moves and current_round_game
        this.reset();
        const stateClone = structuredClone(this.#getState());
        stateClone.history.allGames.push(...stateClone.history.current_round_game);
        stateClone.history.current_round_game=[]
        this.#saveState(stateClone);
    }
    // way to get a read only copy of the current state
    #getState(){
        return this.#state;
    } 
    // change to next state
    #saveState(StateorFn){
        // refering prev state within this method 
        const prevState = this.#getState();
        let newState;
        switch(typeof StateorFn){
            case "function":
                newState = StateorFn(prevState);
                break;
            case "object":
                newState = StateorFn;
                break;
            default:
                console.error("Invalid value passed to #saveState:", StateorFn);
                throw new Error("Invalid");
                
        }
        this.#state = newState;
     }
}
/*
now we have a fully functional game
last thing we want is persistance state across refreshes
that is if we refresh the page everything is cleared out
and ideally we want to refresh the page and still want all of our game
this is possible through local storage

local storage:
available accross browser tabs
property of window interface allows us to access storage object for the document's origin
stored data is stored accross browser sessions
simillar to session storage which ends when page session ends that is
when page is closed
but localstorage data has no expiration date(if opened in private/incoginot data is always cleared out once last page is closed
*/