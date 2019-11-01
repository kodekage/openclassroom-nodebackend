const Thing = require('../models/things');

exports.createThing = (req, res, next) => {
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
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then( thing => {
    res.status(200).json(thing);
  }).catch( error => {
    res.status(404).json(error);
  })
};

exports.modifyOneThing = (req, res, next) => {
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
};

exports.deleteOneThing = (req, res, next) => {
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
};

exports.getAllThings = (req, res, next) => {
  Thing.find().then( thing => {
    res.status(200).json(thing);
  }).catch( error => {
    res.status(404).json(error);
  })
};