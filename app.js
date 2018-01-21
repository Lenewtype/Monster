new Vue({
	el:'#app',
	data: {
		gameStarted: false,
		playerHP: 100,
		monsterHP: 100,
		actions: []
	},
	computed: {
		victoryMessage: function() {
			let playerHP = this.playerHP;
			let monsterHP = this.monsterHP;
			let text = '';
			if(playerHP <= 0 && monsterHP > 0) {
				text = 'You lose...';
			}
			else if(playerHP > 0 && monsterHP <= 0) {
				text = 'You win!!';
			}
			else if(playerHP === 0 && playerHP === monsterHP) {
				text =  'Draw???';
			}
			if(text.length > 0) {
				if(confirm(text + ' Play again?')) {
					this.reset();
				}
				else {
					this.giveUp();
				}
			}
		},
		reverseActions: function () {
			return this.actions.slice().reverse();
		}
	},
	methods: {
		reset: function() {
			this.playerHP = 100;
			this.monsterHP = 100;
			this.gameStarted = true;
			this.actions = [];
		},
		useAttack: function() {
			//execute a player attack and a monster attack
			this.attack('player');
			this.attack();
		},
		useSpecial: function() {
			//execute a special attack
			this.specialAttack();
			this.attack();
		},
		useHeal: function() {
			//exectute a healing move
			this.attack();
			this.heal();
		},
		giveUp: function() {
			//only for quitters...
			this.gameStarted = false;
		},
		attack: function(from = 'monster') {
			//create the action object
			let action = {dealer: from};
			action.damage = Math.floor( Math.random() * 10 );

			//based on who did the action, adjust the opposite player's hit points
			if(from === 'monster') {
				action.target = 'player';
				this.playerHP -= action.damage;
			}
			else {
				action.target = 'monster';
				this.monsterHP -= action.damage;
			}
			//add the action to the actions array to be logged out
			this.actions.push(action);
		},
		heal: function(){
			let damage = 10;
			if(this.playerHP > 90) {
				damage = 100 - this.playerHP;
			}
			this.playerHP += damage;
			this.actions.push({dealer: 'player', target:'player', damage: damage, healed: true})
		},
		specialAttack: function() {
			let action = {dealer: 'player', target: 'monster'};
			action.damage = Math.floor( Math.random() * 17.5 );
			this.monsterHP -= action.damage;
			this.actions.push(action);
		},
		actionClasses: function(action) {
			let classes = 'action';
			if(action.dealer === 'player'){
				return classes + ' player-turn';
			}
			return classes + ' monster-turn';
		}

	},

});