const express = require('express');
const noteCtrl = require('../controllers/noteController');

const router = express.Router();

router.get('/:noteId', noteCtrl.getNote);

router.get('/user/:userId', noteCtrl.getUserNotes);

router.post('/', noteCtrl.create);

router.put('/:noteId', noteCtrl.update);

router.delete('/:noteId', noteCtrl.delete);

module.exports = router;
