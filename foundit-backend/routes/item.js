const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const path = require('path');
var fs = require('fs');
const Item = require('../models/Item');
const Placement = require('../models/Placement');
const Notes = require('../models/Notes');

const fetchuser = require('../middlewares/fetchuser');
const User = require('../models/User');

// cloudinary***********
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.API_SECRET_KEY
});

// Router- 1 ADD an Item using POST:'/api/item/uploaditem' | login required**********
router.post('/uploaditem',
  fetchuser,
  [
    // validation rules for input
    body('name', 'Enter a valid item name').isLength({ min: 2 }),
    // body('place', 'Enter a valid item name').isLength({ min: 2 }),
    // body('type', 'Enter a valid item type').isLength({ min: 2 }),
    body('status', 'Enter a valid status').isLength({ min: 4 })
  ],
  (req, res) => {
    try {
      //check for validaion errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(502).json({ success: false, message: "Some errors in creds validation", errors: errors.array() });
      }

      const file = req.files.image;
      cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        if (result) {
          // create an new item using Item model
          let date = new Date();
          if (req.body.date) {
            date = new Date(req.body.date);
          }
          const item = new Item({
            user: req.user_id,
            name: req.body.name,
            type: req.body.type,
            date: date,
            place: req.body.place,
            description: req.body.description,
            image_name: result.url,
            public_id: result.public_id,
            user_name: req.body.user_name,
            status: req.body.status
          });
          // Now save the item to mongodb
          item.save().then(savedItem => { res.send({ success: true, savedItem }); });
        } else {
          return res.status(503).send({ success: false, from: "Cannot upload image", message: error.message });
        }
      });
    } catch (error) {
      return res.status(503).send({ success: false, from: "Catch section", message: error.message });
    }
  });


// Router 2) - fetch all Items of a user using GET:'/api/item/fetchitems' | login required
router.get('/fetchitems',
  fetchuser,
  async (req, res, next) => {
    try {
      // fetch all items of current user from DB with the help of user_id
      const user_id = req.user_id;
      let items_list = await Item.find({ user: user_id });
      res.json({ success: true, items_list });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  });

// Router 3: Delete an existing Item using:DELETE   '/api/item/deleteItem:id'   Login required;
router.delete('/deleteItem/:id/:public_id', fetchuser, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    if (item.user.toString() !== req.user_id) {
      return res.status(401).send({ success: false, message: "sorry!! You are not allowed to delete this item" });
    }
    // Finaly deleting Image**
    await cloudinary.uploader.destroy(req.params.public_id);
    // finaly Deleting item**
    item = await Item.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Item deleted successfully", item: item });
  } catch (error) {
    console.error(error.message);
    res.status(402).send({ success: false, message: error.message, from: "deleteItem | catch" });
  }
})

// Router 4: Update an existing Item using:PUT   '/api/item/updateItem/:id'   Login required;
router.put('/updateItem/:id/:public_id',
  fetchuser, [
  body('name', 'Enter a valid item name').isLength({ min: 2 }),
  // body('place', 'Enter a valid item name').isLength({ min: 2 })
],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(502).json({ success: false, from: "creds validation", message: errors.array() });

      // checking whether user owns this Item or not
      let item = await Item.findById(req.params.id);
      if (item.user.toString() !== req.user_id) return res.status(401).send({ success: false, message: "You are not allowed to update this Item" });

      const { name, type, place, date, description } = req.body;
      const file = req.files.image;
      cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        if (result) {
          // Making a item that will replace old existing item
          const newItem = {};
          newItem.image_name = result.url;
          newItem.public_id = result.public_id;
          if (name) newItem.name = name;
          // if (type) newItem.type = type;  
          // if (place) newItem.place = place;
          if (date) newItem.date = date; else newItem.date = Date.now;
          if (description) newItem.description = description;

          // Finaly deleting Image**
          await cloudinary.uploader.destroy(req.params.public_id);
          item = await Item.findByIdAndUpdate(req.params.id, { $set: newItem }, { new: true })
          res.json({ success: true, item });
        }
        else console.log("Can not upload Item || UpdateItem");
      });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message, from: "Catch section" });
    }
  })

// Router 5: getAllItems || Login required
router.get('/getAllItems', fetchuser, async (req, res) => {
  try {
    const allitems = await Item.find();
    res.send({ success: true, allitems: allitems });
  } catch (error) {
    res.status(402).send({ success: false, message: error.message, from: "getAllItems" });
  }
})

// Router 6: getAItem || Login required
router.get('/getAItem/:id', fetchuser, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.send({ success: true, item: item });
  } catch (error) {
    res.status(402).send({ success: false, message: error.message, from: "getAItem" });
  }
})

// Router 7: addplacementexp || Login required
router.post('/addplacementexp', fetchuser, async (req, res) => {
  try {
    let date = new Date();
    date = new Date(req.body.date);
    const uploader = await User.findById(req.user_id);

    const item = new Placement({
      userId: req.user_id,
      uploader: uploader.name,
      company_name: req.body.company_name,
      profile: req.body.profile,
      date: date,
      No_students: req.body.No_students,
      No_rounds: req.body.No_rounds,
      intern_or_fte: req.body.intern_or_fte,
      round_exp: req.body.round_exp
    });
    // Now save the item to mongodb
    item.save().then(savedItem => { res.send({ success: true, savedItem }); });
  } catch (error) {
    res.status(402).send({ success: false, message: error.message, from: "getAItem" });
  }
})

// Router 8: fetchPlacements of Logged in User || Login required
router.post('/fetchPlacements', fetchuser, async (req, res) => {
  try {
    const allitems = await Placement.find();
    res.send({ success: true, allitems: allitems });
  } catch (error) {
    res.status(402).send({ success: false, message: error.message, from: "getAItem" });
  }
})

// Router 9: fetchPItem item using Item _id || Login required
router.get('/fetchPItem/:id', fetchuser, async (req, res) => {
  try {
    const item = await Placement.findById(req.params.id);
    res.send({ success: true, item: item });
  } catch (error) {
    res.status(402).send({ success: false, message: error.message, from: "getAItem" });
  }
})

// Router 10: addNotes || Login required
router.post('/addnotes', fetchuser, async (req, res) => {
  try {
    let date = new Date();
    const uploader = await User.findById(req.user_id);

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.send("No Notes found");
    }

    let foo=req.files.foo;
    let uploadpath = path.join(process.cwd() , 'public/notes', req.files.foo.name);
    const r=await foo.mv(uploadpath);

    const note = new Notes({
      user_id: req.user_id,
      user_name: uploader.name,
      notes_name: req.body.notes_name,
      file_name: req.files.foo.name,
      date: date,
      description: req.body.description
    });
    // Now save the item to mongodb
    note.save().then(savedNote => { res.send({ success: true, savedNote }); });
  } catch (error) {
    res.status(402).send({ success: false, message: error.message, from: "getAItem" });
  }
})

// Router 11: fetchAllNotes || Login required
router.post('/fetchAllNotes', fetchuser, async (req, res) => {
  try {
    const notes=await Notes.find();
    return res.send({success:true, notes:notes});
  } catch (error) {
    res.status(402).send({ success: false, message: error.message, from: "getAItem" });
  }
})


module.exports = router;