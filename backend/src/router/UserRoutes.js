const express = require("express");
const router = express.Router("/users");

const userController = require("../controller/usersController");
const { jwtMiddleware } = require("../security/jwt");

router.use(jwtMiddleware);
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/change-password/:id", userController.changePassword);

module.exports = router;
