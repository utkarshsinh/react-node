// backend/routes/index.js
const fileController = require("../controllers/file");
const router = require("express").Router(); // Ge the router instance of Express
const userController = require("../controllers/user"); // Get all exported functions in the user controller

const auth = require("../middleware/auth");
const { upload } = require("../middleware/multer");

// Map the `signup` request to the signup function
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/upload", auth, upload.single("file"), fileController.upload);

router.get("/file/:createdBy", auth, fileController.getAll);

router.put("/file/:_id", auth, fileController.updateFile);
router.get("/file/:createdBy/:fileId", auth, fileController.getFile);


router.delete("/file/:_id", auth, fileController.deleteFile);

router.get("/file", auth, fileController.searchFiles);
module.exports = router;