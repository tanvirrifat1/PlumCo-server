"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
const express_1 = require("express");
const profile_controller_1 = require("./profile.controller");
const router = (0, express_1.Router)();
router.get('/:userId', profile_controller_1.ProfileController.myProfile);
router.patch('/:userId', profile_controller_1.ProfileController.updated);
exports.ProfileRoutes = router;
