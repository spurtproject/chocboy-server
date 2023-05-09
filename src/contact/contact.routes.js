const { Router } = require("express");
const { createContact } = require("./controller");
const router = Router();

router.post("/create", createContact);

module.exports = router;
