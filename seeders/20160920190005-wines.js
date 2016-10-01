'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Wines', [
      {
        name: 'Albariño',
        synonyms:'Albarino, Alvarinho',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Aligote',
        synonyms:'Aligotay',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Arneis',
        synonyms:'little rascal',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Barbera',
        synonyms:'perricone, barbera d\'alba, barbera d\'asti',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Blaufrankisch',
        synonyms:'Lemberger, Kékfrankos',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Cabernet Franc',
        synonyms:'Cab Franc, C Franc, Franc',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Cabernet Sauvignon',
        synonyms:'Cab Sauvignon, Cab Sauv, CS, Cab, Cabernet',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Carignan',
        synonyms:'Carignane, Carignano, Cariñena',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Carménère',
        synonyms:'Carmenere',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Charbono',
        synonyms:'Bonarda, Douce noir',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Chardonnay',
        synonyms:'Chard, Cougar Milk',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Chenin Blanc',
        synonyms:'Chenin',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Cortese',
        synonyms:'Gavi',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Dolcetto',
        synonyms:'Dolceto, Dolcetto di Dogliani, the little sweet one',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Falanghina',
        synonyms:'Falanghina Greco',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Fiano',
        synonyms:'Falanghina Greco',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Gamay',
        synonyms:'Beaujolais, Gamay Beaujolais',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Gewürztraminer',
        synonyms:'Gewürz, Gewurz, Gewurztraminer, Gewurtztraminer, Gevertz, Gevurz',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Grenache',
        synonyms:'Garnacha, Garnatxa, Grenache Noir',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Grenache Blanc',
        synonyms:'GB',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Grüner Veltliner',
        synonyms:'GV, Gruner, Grüner, Grooner, Gruner V',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Malbec',
        synonyms:'Cot, Cðt',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Malvasia',
        synonyms:'Malmsey, Malvazia, Monemvasia, Malvasier, Malvasia Bianca',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Marsanne',
        synonyms:'Malmsey, Malvazia, Monemvasia, Malvasier, Malvasia Bianca',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Melon de Bourgogne',
        synonyms:'Melon, Muscadet',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Merlot',
        synonyms:'',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Montepulciano',
        synonyms:'Montepulciano d\'Abruzzo',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Mourvèdre',
        synonyms:'Monastrell, Mourvedre, Mourved, Mataro',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Muscat',
        synonyms:'Moscato, Moscatel, Muscato',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Nebbiolo',
        synonyms:'Moscato, Moscatel, Muscato',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Negroamaro',
        synonyms:'Negro Amaro',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Petite Sirah',
        synonyms:'Petit Sirah, Petite Syrah, Petite, Durif',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Picpoul',
        synonyms:'The lip stinger',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Pinot Blanc',
        synonyms:'Pinot Bianco, Weissburgunder',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Pinot Gris',
        synonyms:'Pinot Grigio, PG',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Pinot Noir',
        synonyms:'Pinot, PN, Burgundy, Bourgogne, Bourgogne Rouge, Pinot Nero, Spätburgunder, Spatburgunder',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Pinotage',
        synonyms:'',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Primitivo',
        synonyms:'',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Prosecco',
        synonyms:'Glera',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Riesling',
        synonyms:'',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Roussanne',
        synonyms:'',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Sangiovese',
        synonyms:'Sangio, Chianti, Montalcino, ',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Sauvignon Blanc',
        synonyms:'Sauv Blanc, Sauvie, Sauvignon B, SB, Sauvie Blanc',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Savagnin',
        synonyms:'Traminer, Paien, Heida, Vin Jaune',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Sémillon',
        synonyms:'Semillon, Semilon, Sem',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Syrah',
        synonyms:'Shiraz, Serine, Petite Serine',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Tempranillo',
        synonyms:'Tinta Roriz, Tinto, Tinto de Toro, Ull de Llebre, Temprano, Aragonez, Aragones',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Torrontes',
        synonyms:'Torrontés',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Touriga Nacional',
        synonyms:'Touriga',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Trebbiano',
        synonyms:'Trebbiano Toscano, Ugni Blanc, Orvieto',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Verdejo',
        synonyms:'',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Verdelho',
        synonyms:'SYNONYMS',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Verdicchio',
        synonyms:'Lugana, Terbiana, Turbiana, Trebbiano di Lugana',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Vermentino',
        synonyms:'Rolle, Pigato, Favorita',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Viognier',
        synonyms:'SYNONYMS',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Zinfandel',
        synonyms:'Zin',
        description: '',
        createdAt: new Date(), updatedAt: new Date()
      }

  ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
