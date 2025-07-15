/* 
practice when developing:
1. global scope and namespaces
2. stable selection (data+ attributes)
3. seperate logic by responsibilities : seperation of concerns
created 3 js files
app.js 
view.js
store.js

using es6 cuz it eliminates some js silent errors by changing the errors
better optimization
uses strict mode
*/
export default class View{
    $={};
    $$={};
    constructor(){
        this.$.menu = this.#qs('[data-id="menu"]');
        // selected action div class
        this.$.menu_item = this.#qs('[data-id="menu-items"]');
        // globally availabe to us in runtime now
        this.$.reset_btn = this.#qs('[data-id="reset-btn"]');
        this.$.new_round_btn = this.#qs('[data-id="new-round-btn"]');
        this.$$.squares = this.#qsall('[data-id="square"]');
        this.$.model = this.#qs('[data-id="model"]');
        this.$.model_text = this.#qs('[data-id="model-text"]');
        this.$.model_btn = this.#qs('[data-id="model-btn"]');
        this.$.turn = this.#qs('[data-id="turn"]');
        this.$.menu_btn = this.#qs('[data-id="menu-btn"]');
        this.$.p1wins = this.#qs('[data-id="p1wins"]');
        this.$.p2wins = this.#qs('[data-id="p2wins"]');
        this.$.ties = this.#qs('[data-id="ties"]');

        // ui only
        this.$.menu_btn.addEventListener('click', (event)=>{
            //this.$.menu_item.classList.toggle('hidden');
            //this.$.menu_btn.classList.toggle('border');
            this.#togglemenu(); // calling it out
        });
        // currently only menu button toggling nothing else working
        // weve to make and call event listeners to work
    }
    bindGame_reset_event(handler){
        /*rather than handling element within view we want to do it within controller which reads currents state of application */
        this.$.reset_btn.addEventListener('click', handler);
        //instead of passing  [ (event)=>{}] we passed handler for controller
        this.$.model_btn.addEventListener('click', handler);
    }
    bindGame_NewRound_event(handler){
        this.$.new_round_btn.addEventListener('click', handler);
    }
    bindGame_PlayerMove_event(handler){
        this.$$.squares.forEach((square)=>{
            square.addEventListener('click', () => handler(square));
        });
    }
    /**dom helper methods */
    updateScoreboard(p1wins, p2wins, ties){
        this.$.p1wins.innerText = `${p1wins} wins`;
        this.$.p2wins.innerText = `${p2wins} wins`;
        this.$.ties.innerText = `${ties} ties`;
    }
    openModel(message){
        this.$.model.classList.remove('hidden');
        this.$.model_text.innerText = message;
    }
    
    closeAll(){
        this.#closeModel();
        this.#closeMenu();
    }
    clearMoves(){
        this.$$.squares.forEach(square => {
            square.replaceChildren();
        });
    }
    #closeModel(){
        this.$.model.classList.add('hidden');
    }

    #closeMenu(){
        this.$.menu_item.classList.add('hidden');
        this.$.menu_btn.classList.remove('border');
        const icon = this.$.menu_btn.querySelector('i');
        icon.classList.add('fa-chevron-down');
        icon.classList.remove('fa-chevron-up');
    }
    #togglemenu(){
        this.$.menu_item.classList.toggle('hidden');
        this.$.menu_btn.classList.toggle('border');
        const icon = this.$.menu_btn.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
        
    };
    handleplayermove(squareEL, player){
        const icon = document.createElement('i');
         icon.classList.add('fa-solid', 
            //player === 1? 'fa-x' : 'fa-o',
            //player === 1? 'yellow' : 'turquoise'
            player.iconClass,
            player.colorClass,
        );
         squareEL.replaceChildren(icon);
    };

    setTurnIndicator(player){
        const icon = document.createElement('i');
        const label = document.createElement('p');
        //this.$.turn.classList.add(player.colorClass);
        icon.classList.add("fa-solid", player.colorClass, player.iconClass);
        //icon.classList.add('fa-solid', player.iconClass); added above only
        label.classList.add(player.colorClass);
        label.innerText = `${player.name}, you're up!`;
        this.$.turn.replaceChildren(icon, label);
    };
    #qs(Selector, parent){
        const el = parent? parent.querySelector(Selector) : document.querySelector(Selector);
        if(!el) throw new Error("couldn't find element");
        return el;
    }
    #qsall(Selector){
        const elList = document.querySelectorAll(Selector);
        if(!elList) throw new Error("couldn't find element");
        return elList;
    }
}
// toggling menu purely view based , so registering it within constructor itself