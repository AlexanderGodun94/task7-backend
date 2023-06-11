const AppError = require('../services/error');
const db = require('../../app/services/db');

const gameTypes = [
  {
    name: 'tic-tac-toe'
  },
  {
    name: 'tic-tac-toe-5x5'
  },

];


module.exports = class PrepareDb {


  static async prepareAllInstances() {
    await this.createTypesDocuments();

  }

  static async createTypesDocuments() {
    try {
      const models = db.getModels();

      for (let i = 0; i < gameTypes.length; i++) {
        try {
          let gameType = await models.GameType.create(gameTypes[i]);
          console.log('gameType' + i + ' created');

        } catch (err) {
          if (err.original && err.original.constraint.includes('gameType_name_key')) {
            console.log('gameType' + i + ' exist');
          } else {
            if (err instanceof AppError) throw err;
            throw new AppError({err: err});
          }
        }
      }
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError({err: err});
    }
  }


};
