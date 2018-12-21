$(document).ready(function () {

	var obiWanKenobi;
	var quiGonJinn;
	var countDooku;
	var darthVader;

	var characterSelection = [];
	var character = null;
	var defenders = [];
	var defender = null;

	function startGame() {
		lukeSkywalker = {
			id: 0,
			name: "Luke Skywalker",
			healthPoints: 120,
			baseAttack:10,
			attackPower: 10,
			counterAttackPower: 8,
			img:"assets/images/luke-skywalker.jpg"
		}

		chewbacca = {
			id: 1,
			name: "Chewbacca",
			healthPoints: 100,
			baseAttack: 8,
			attackPower: 8,
			counterAttackPower: 5,
			img:"assets/images/chewbacca.png"
		}

		stormTrooper = {
			id: 2,
			name: "Storm Trooper",
			healthPoints: 150,
			baseAttack:8,
			attackPower: 8,
			counterAttackPower: 10,
			img:"assets/images/storm-trooper.jpg"
		}

		darthVader = {
			id: 3,
			name: "Darth Vader",
			healthPoints: 100,
			baseAttack: 12,
			attackPower: 12,
			counterAttackPower: 12,
			img:"assets/images/darth-vader.jpg"
		}

		character = null;

		defenders = [];

		defender = null;

		characterSelection = [lukeSkywalker,chewbacca,stormTrooper,darthVader];
		$("#character").empty();
		$("#defenderArea").empty();
		$("#defender").empty();
		$("#status").empty();

		$.each(characterSelection, function(index, character) {
			var newCharacterDiv = $("<div>").addClass("character panel panel-success").attr("id",character.id);
			$("<div>").addClass("panel-body").append("<img src='" + character.img + "'>").appendTo(newCharacterDiv);
			$("<div>").addClass("panel-footer").append("<span class='hp'>" + character.healthPoints + "</span>").appendTo(newCharacterDiv);

			$("#characterSelection").append(newCharacterDiv);
		});

		$(".character").on("click", function() {

			if(character === null) {

				var charId = parseInt($(this).attr("id"));

				character = characterSelection[charId];

				// loop through character array
				$.each(characterSelection, function(index, character) {

					//unselected characters to enemies array
					if(character.id !== charId) {
						defenders.push(character);
						$("#"+character.id).removeClass("character panel-success").addClass("defender panel-danger").appendTo("#defenderArea");
					} else {
						$("#"+character.id).appendTo("#character");
					}
				});

				//click event after defender class
				$(".defender").on("click", function() {
					if(defender === null) {
						var defenderId = parseInt($(this).attr("id"));
						defender = characterSelection[defenderId];
						$("#"+defenderId).appendTo("#defender");
					}
				});
			}
		});

		$("#restart").hide();
	}

	startGame();

	

	$("#attack").on("click", function() {

		// when character selected, and there are still enemies left
		if(character !== null && character.healthPoints > 0 && defenders.length > 0) {

			// created variable to storestatus
			var status = "";

			//defender select
			if(defender !== null) {

				// decrease defender HP
				defender.healthPoints -= character.attackPower;
				status += "You attacked " + defender.name + " for " + character.attackPower + " damage.<br>";

				// update HP
				$("#"+defender.id + " .hp").html(defender.healthPoints);

				// decrease character HP 
				character.healthPoints -= defender.counterAttackPower;
				status += defender.name + " attacked you back for " + defender.counterAttackPower + " damage.<br>";

				// update HP
				$("#"+character.id + " .hp").html(character.healthPoints);

				// add base attacj each time
				character.attackPower += character.baseAttack;

				// character is defeated
				if(character.healthPoints <= 0) {
					status = "You've been defeated... GAME OVER!!!!";
                    $("#restart").show();
                    
				} else if(defender.healthPoints <= 0) {	// if defender is left
					status = "You have defeated " + defender.name + ", choose to fight another enemy.";

					// clear defender selection
					$("#defender").empty();
					defender = null;

					// remove defeated defender from defender array
					defenders.splice(defenders.indexOf(defender),1);
				}

				// when no defenders left
				if(defenders.length === 0) {
					status = "You win!";
					$("#restart").show();
				}
			} else {
				status = "No enemy here.";
			}

			$("#status").html(status);
		}
	})

	$("#restart").on("click", function() {
		startGame();
	})
	
});
