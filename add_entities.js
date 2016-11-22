'use strict';

import config from 'config';
import db from './models';

var request = require('request');

const api_endpoint = 'https://api.api.ai/v1/entities'

var tst = {
  'name': 'Utilities',
  'entries': [
  {
    'value': 'Electricity',
    'synonyms': ['electricity', 'electrical']
  }, {
    'value': 'Gas',
    'synonyms': ['gas', 'natural gas']
  }, {
    'value': 'Water',
    'synonyms': ['water']
  }]
};

db.Varietals.all().then((varietals)=>{
  let all_enitities = [];
  return new Promise((resolve, reject) => {
    varietals.forEach((varietal)=>{

      let tmp_enitity = {
        'value': `${varietal.name}`,
        'synonyms': varietal.synonyms.split(',') || []
      }
      all_enitities.push(tmp_enitity);
    })
    resolve(all_enitities)
  })
}).then((entries)=>{
  var post_entities = {
    'name': 'Varietals',
    'entries': entries
  };
  console.log(post_entities)
  request.post({
    headers: {
      'Authorization': `Bearer 12242d9207544c9a8d265cc46c4e7c4e`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    url: api_endpoint,
    body: JSON.stringify(post_entities)
  }, function(error, response, body) {
    console.log(body);
  });
})
