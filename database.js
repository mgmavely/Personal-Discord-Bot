const Database = require("@replit/database")
const db = new Database()

module.exports = class DB {
  constructor() {
    db.list().then(keys => {console.log(keys)});
    //db.delete('182655526302253058').then(() => {});
  }

  getHistory(id, channel) {
      db.get(id).then(value => {
        if (value !== null) {
        channel.send(`<@!${id}> | Wins: ${value.wins} - Losses: ${value.losses} - Draws: ${value.draws}`);
      } else {
        db.set(id, {wins: 0, losses:0, draws:0}).then(() => {});
        channel.send(`<@!${id}> | Wins: 0 - Losses: 0 - Draws: 0`);
      }
    });
  }

  addWin(id) {
    db.get(id).then(value => {
      if (value !== null) {
        db.set(id, {wins: (value.wins+1), losses:value.losses, draws:value.draws}).then(() => {});
      } else {
        db.set(id, {wins: 1, losses:0, draws:0}).then(() => {});
      }
    });
  }

  subWin(id) {
    db.get(id).then(value => {
      if (value !== null) {
        db.set(id, {wins: (value.wins-1), losses:value.losses, draws:value.draws}).then(() => {});
      } else {
        db.set(id, {wins: -1, losses:0, draws:0}).then(() => {});
      }
    });
  }

  addLoss(id) {
    db.get(id).then(value => {
      if (value !== null) {
        db.set(id, {wins: value.wins, losses:(value.losses+1), draws:value.draws}).then(() => {});
      } else {
        db.set(id, {wins: 0, losses:1, draws:0}).then(() => {});
      }
    });
  }

  subLoss(id) {
    db.get(id).then(value => {
      if (value !== null) {
        db.set(id, {wins: value.wins, losses:(value.losses-1), draws:value.draws}).then(() => {});
      } else {
        db.set(id, {wins: 0, losses:-1, draws:0}).then(() => {});
      }
    });
  }

  addDraw(id) {
    db.get(id).then(value => {
      if (value !== null) {
        db.set(id, {wins: value.wins, losses:value.losses, draws:(value.draws+1)}).then(() => {});
      } else {
        db.set(id, {wins: 0, losses:0, draws:1}).then(() => {});
      }
    });
  }

  subDraw(id) {
    db.get(id).then(value => {
      if (value !== null) {
        db.set(id, {wins: value.wins, losses:value.losses, draws:(value.draws-1)}).then(() => {});
      } else {
        db.set(id, {wins: 0, losses:0, draws:-1}).then(() => {});
      }
    });
  }

  setScore(text) {
    console.log("setScore")
    this.score = text;
    console.log(this.score)
  }
}
