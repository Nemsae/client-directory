const express = require('express');
const router = express.Router();
const moment = require('moment');

const Client = require('../models/Client');

router.route('/')
  .get((req, res) => {
    let options = req.query;
    console.log('options: ', options);
    let pagesize = 20;
    let page = 0;
    let gender = null;
    let baseAge = {
      lowest: 0,
      highest: 120
    };
    let beforeUnix = moment(Date.now()).unix();
    let afterUnix = 0;
    if (options.pagesize) {
      pagesize = parseInt(req.query.pagesize);
    }
    if (options.page) {
      page = parseInt(req.query.page) - 1;
    }
    if (options.gender) {
      gender = {gender: options.gender};
    }
    if (options.minage) {
      baseAge.lowest = parseInt(options.minage);
    }
    if (options.maxage) {
      baseAge.highest = parseInt(options.maxage);
    }
    if (options.visitbefore) {
      beforeUnix = moment(options.visitbefore).unix();
    }
    if (options.visitafter) {
      afterUnix = moment(options.visitafter).unix();
    }
    if (options.allergies) {
      let allergies = [options.allergies];
      Client.find(gender)
        .limit(pagesize)
        .skip(pagesize * page)
        .where('age').gte(baseAge.lowest).lte(baseAge.highest)
        .where('allergies').in(allergies)
        .then((clients) => {
          let newClients = clients.filter((client) => {
            let unix = moment(client.lastVisit).unix();
            if (unix > afterUnix && unix < beforeUnix) {
              return client;
            }
          });
          res.send(newClients);
        })
        .catch((err) => res.status(400).send(err));
    }
    Client.find(gender)
      .limit(pagesize)
      .skip(pagesize * page)
      .where('age').gte(baseAge.lowest).lte(baseAge.highest)
      .then((clients) => {
        let newClients = clients.filter((client) => {
          let unix = moment(client.lastVisit).unix();
          console.log('unix: ', unix);
          console.log('beforeUnix: ', beforeUnix);
          console.log('afterUnix: ', afterUnix);
          if (unix > afterUnix && unix < beforeUnix) {
            console.log('Sanity:0');
            return client;
          }
          // } else if (unix > afterUnix) {
          //   console.log('Sanity:1');
          //   return client;
          // } else if (unix < beforeUnix) {
          //   return client;
          // }
        });
        res.send(newClients);
      })
      .catch((err) => res.status(400).send(err));
  })
  .post((req, res) => {
    Client.create(req.body)
      .then((user) => res.send(user))
      .catch((err) => res.status(400).send(err));
  });

router.route('/:id')
  .get((req, res) => {
    Client.findById(req.params.id)
    .lastVisit.getTime()
    .then((client) => {
      res.send(client);
    })
    .catch((err) => res.status(400).send(err));
  })
  .put((req, res) => {
    Client.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then((client) => {
        res.send(client);
      })
      .catch((err) => res.status(400).send(err));
  })
  .delete((req, res) => {
    Client.findByIdAndRemove(req.params.id)
      .then((deletedClient) => {
        res.send(deletedClient);
      })
      .catch((err) => res.status(400).send(err));
  });

module.exports = router;
