const express = require("express");
const router = express.Router();

// Item model
const Item = require("../../models/Item");

// @route GET api/items
// @desc Get All Items
// @access Public

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route POST api/items
// @desc Create a todo
// @access Public

router.post("/", (req, res) => {
  const newItem = new Item({
    todo: req.body.todo,
  });
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
});

// @route DELETE api/items
// @desc Delete a todo
// @access Public

router.delete("/:id", (req, res) => {
  Item.findOneAndDelete({ _id: req.params.id }, (err, item) => {
    if (err) {
      res.status(404).json({ success: false });
    } else if (item == null) {
      //When an Id is passed but not found
      res.status(404).json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
});

// @route PUT api/items
// @desc update a todo
// @access Public

router.put("/:id", (req, res) => {
  res.send("Put");
  switch (req.body.type) {
    case "CHECK_ITEM":
      Item.findById(req.params.id, (err, item) => {
        if (err) {
          return err;
        }
        item.checked = !item.checked;
        item.save().catch((err) => console.log(err));
      });
      break;
    case "UPDATE_ITEM":
      Item.findById(req.params.id, (err, item) => {
        if (err) {
          return err;
        }
        item.todo = req.body.todo;
        item.save().catch((err) => console.log(err));
      });
    default:
      break;
  }
});

module.exports = router;
