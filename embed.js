createEmbed = (game) => {
  let toText;
  let board = game.returnBoard();
  if (game.game_over) {
    toText = `<@!${game.player1}> <@!${game.player2}>`;
  } else {
    toText = `<@!${game.currentPlayer()}>`;
  }

  let fieldsArray = [];

  if (!game.game_over) {
    fieldsArray.push({name:"Turn", value: toText, inline: false});
  } 

  fieldsArray.push({
    name: "Board",
    value: board,
    inline: false
  });

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