const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Item = require('../../models/Item');

// @route       GET api/items
// @desc        Get all users items
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        const items = await Item.find({ user: req.user.id }).sort({ date: -1 });
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/items
// @desc        Add new items
// @access      Private
router.post('/', [ auth, [
    check('name', 'Name is required').not().isEmpty()]] , 
    
    async (req, res) => { 
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name } = req.body;

        try {
            const newItem = new Item({
                name,
                user: req.user.id
            });

            const item = await newItem.save();

            res.json(item);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route       PUT api/items/:id
// @desc        Update items
// @access      Private
router.put('/:id', auth, async (req, res) => {
    const { name } = req.body;

    // Build item object
    const itemField = {};
    if(name) itemField.name = name;

    try {
        let item = await Item.findById(req.params.id);

        if(!item) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user owns contact
        if(item.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized '});
        }

        item = await Item.findByIdAndUpdate(req.params.id,
            { $set: itemField },
            { new: true });

            res.json(item);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route       DELETE api/items/:id
// @desc        Delete items
// @access      Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);

        if(!item) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user owns contact
        if(item.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized '});
        }

        await Item.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Item removed '});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;
