createEmbed = (game) => {
  let toText;
  let board = game.returnBoard();
  let msg = game.message;
  if (game.game_over) {
    toText = `<@!${game.player1}> <@!${game.player2}>`;
  } else {
    toText = `<@!${game.currentPlayer()}>`;
  }

  let fieldsArray = [];

  if (!game.game_over) {
    fieldsArray.push({name:"Turn:", value: toText, inline: false});
  } else {
    fieldsArray.push({name:"Players:", value: toText, inline: false});
    let outcome = (game.winner) ? `<@!${game.winner}> Wins!` : `It's a Draw!`;
    fieldsArray.push({name:"Outcome:", value: outcome, inline: false});
  }

  fieldsArray.push({
    name: "Board:",
    value: board,
    inline: false
  });

 if (msg !== "" && game.ff !== true) {
    fieldsArray.push({name:"Error:", value: msg, inline: false});
  } else if (game.ff) {
    fieldsArray.push({name:"Message:", value: msg, inline: false});
  }

  const exampleEmbed = {
	color: game.color,
	title: 'Tic-Tac-Toe',
	url: 'https://github.com/mgmavely/Personal-Discord-Bot',
	fields: fieldsArray,
	timestamp: new Date(),
};
return exampleEmbed;
}

module.exports = { createEmbed };