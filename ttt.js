module.exports = class TicTacToe {
  constructor(p1, p2) {
    this.player1 = p1;
    this.player2 = p2;
    this.game_id = parseInt(p1.toString() + p2.toString())
    this.board = [":zero:",":one:",":two:",":three:",":four:",":five:",":six:",":seven:",":eight:"];
    this.remaining_moves = 9;
    this.turn = 1;
    this.game_over = false;
    this.winner;
  }

  playTicTacToe(play) {
    play = parseInt(play);
    if (Number.isNaN(play)) {
      return `Invalid play. Player ${this.turn}'s turn.`
    } else if (play < 0 || play > 8) {
      return `Input out of range (0-8). Player ${this.turn}'s turn.`
    } else {
      if (this.board[play] !== ":x:" && this.board[play] !== ":o:") {
        if (this.turn === 1) {
          this.board[play] = ":x:";
          this.remaining_moves -= 1;
          if (this.isWinner()) {
            this.game_over = true;
            return `<@!${this.winner}> Wins!`
          } else if (this.remaining_moves === 0) {
            this.game_over = true;
            return `It's a draw!`;
          }
          this.turn = 2;
          return "Player 2's Turn."
        } else {
          this.board[play] = ":o:";
          this.remaining_moves -= 1;
          if (this.isWinner()) {
            this.game_over = true;
            return `<@!${this.winner}> Wins!`
          } else if (this.remaining_moves === 0) {
            this.game_over = true;
            return `It's a draw!`;
          }
          this.turn = 1;
          return "Player 1's Turn."
        }
      } else {
        return `Space is occupied. Player ${this.turn}'s turn.`
      }
    }
  }

  returnBoard() {
    let retString = "";
    for (let i = 0; i < 5; ++i) {
      retString += ":white_large_square:";
    }
    retString += "\n";
    for (let i = 0; i < 3; ++i) {
        retString += ":white_large_square:" + this.board[i*3] + this.board[i*3 + 1] + this.board[i*3 + 2] + ":white_large_square:" + "\n";
    }
    for (let i = 0; i < 5; ++i) {
      retString += ":white_large_square:";
    }
    retString += "\n";
    return retString;
  }

  isWinner() {
    if (this.board[0] === this.board[1] && this.board[1] === this.board[2]) {
      this.game_over = true;
      this.winner = (this.board[0] === ":x:")? this.player1 : this.player2;
      return true;
    } else if (this.board[3] === this.board[4] && this.board[4] === this.board[5]) {
      this.game_over = true;
      this.winner = (this.board[3] === ":x:")? this.player1 : this.player2;
      return true;
    } else if (this.board[6] === this.board[7] && this.board[7] === this.board[8]) {
      this.game_over = true;
      this.winner = (this.board[6] === ":x:")? this.player1 : this.player2;
      return true;
    } else if (this.board[0] === this.board[3] && this.board[3] === this.board[6]) {
      this.game_over = true;
      this.winner = (this.board[0] === ":x:")? this.player1 : this.player2;
      return true;
    } else if (this.board[1] === this.board[4] && this.board[4] === this.board[7]) {
      this.game_over = true;
      this.winner = (this.board[1] === ":x:")? this.player1 : this.player2;
      return true;
    } else if (this.board[2] === this.board[5] && this.board[5] === this.board[8]) {
      this.game_over = true;
      this.winner = (this.board[2] === ":x:")? this.player1 : this.player2;
      return true;
    } else if (this.board[0] === this.board[4] && this.board[4] === this.board[8]) {
      this.game_over = true;
      this.winner = (this.board[0] === ":x:")? this.player1 : this.player2;
      return true;
    } else if (this.board[2] === this.board[4] && this.board[4] === this.board[6]) {
      this.game_over = true;
      this.winner = (this.board[2] === ":x:")? this.player1 : this.player2;
      return true;
    } else {
      return false;
    }
  }
  currentPlayer() {
    if (this.turn === 1) {
      return this.player1
    } else {
      return this.player2
    }
  }
}