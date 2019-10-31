const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/things');

mongoose.connect('mongodb+srv://kodekage:HTYQXuCW4cfe3MHV@cluster0-sfopn.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
        .then(() => {
          console.log('Successfully Connected to Mongo Atlas');
        })
        .catch( error => {
          console.log('unable to connect to Mongo Atlas ATM');
          console.error(error);
        })

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.post('/api/stuff', (req, res, next) => {
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId
  });

  thing.save().then(() => {
      res.status(201).json({
        message: 'Post saved Successfully!'
      })
    }
  ).catch(error => {
    res.status(404).json({
      error
    });
  })
})

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then( thing => {
    res.status(200).json(thing);
  }).catch( error => {
    res.status(404).json(error);
  })
});

app.put('/api/stuff/:id', (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId
  })

  Thing.updateOne({
    _id: req.params.id
  }, thing).then(() => {
    res.status(201).json({
      message: 'thing updated successfully'
    });
  }).catch(error => {
    res.status(400).json({
      error: error
    });
  })
})

app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({
    _id: req.params.id
  }).then(() => {
    res.status(201).json({
      message: 'deleted'
    })
  }).catch(error => {
    res.status(400).json({
      error: error
    })
  })
});

app.use('/api/stuff', (req, res, next) => {
  Thing.find().then( thing => {
    res.status(200).json(thing);
  }).catch( error => {
    res.status(404).json(error);
  })
})

module.exports = app; //to be used by our node server [server.js]