const express = require("express");

const router = express.Router();

const { getMap, setNewMarker, editMapPoint,deletePoint, addStar } = require("../controllers/mapController");

router.get("/", getMap);
router.put("/:id", editMapPoint);
router.post("/", setNewMarker);
router.delete("/:id", deletePoint);
router.put('/point/:id', addStar)


module.exports = router;
