// // const express = require("express");
// // const router = express.Router();

// // const allocationController = require("../controllers/allocationController");

// // console.log("✅ Allocation route loaded");
// // // router.post("/", allocationController.addAllocation);


// // router.post("/", allocationController.addAllocation);
// // router.get("/", allocationController.getAllAllocations);
// // router.get("/:id", allocationController.getAllocationById);
// // router.get("/room/:roomId", allocationController.getAllocationByRoomId);
// // // Update Allocation
// // router.put("/:id", allocationController.updateAllocation);
// // // Delete Allocation
// // router.delete("/:id", allocationController.deleteAllocation);

// // module.exports = router;

// // const express = require("express");
// // const router = express.Router();

// // const allocationController =
// //     require("../controllers/allocationController");

// // console.log("✅ Allocation route loaded");

// // router.post(
// //     "/",
// //     allocationController.addAllocation
// // );

// // router.get(
// //     "/",
// //     allocationController.getAllAllocations
// // );

// // // IMPORTANT: keep this BEFORE /:id
// // router.get(
// //     "/room/:roomId",
// //     allocationController.getAllocationByRoomId
// // );

// // router.get(
// //     "/:id",
// //     allocationController.getAllocationById
// // );

// // router.put(
// //     "/:id",
// //     allocationController.updateAllocation
// // );

// // router.delete(
// //     "/:id",
// //     allocationController.deleteAllocation
// // );

// // module.exports = router;


// const express = require("express");
// const router = express.Router();

// const allocationController = require("../controllers/allocationController");

// console.log("✅ Allocation route loaded");
// router.get("/test", (req, res) => {
//     res.json({
//         success: true,
//         message: "Allocation route is working"
//     });
// });
// // =====================================================
// // ADD ALLOCATION
// // POST /api/allocations
// // =====================================================
// router.post(
//     "/",
//     allocationController.addAllocation
// );

// // =====================================================
// // GET ALL ALLOCATIONS
// // GET /api/allocations
// // =====================================================
// router.get(
//     "/",
//     allocationController.getAllAllocations
// );

// // =====================================================
// // GET ALLOCATION BY ROOM ID
// // IMPORTANT: MUST COME BEFORE /:id
// // GET /api/allocations/room/1
// // =====================================================
// router.get(
//     "/room/:roomId",
//     allocationController.getAllocationByRoomId
// );

// // =====================================================
// // GET ALLOCATION BY ALLOCATION ID
// // GET /api/allocations/1
// // =====================================================
// router.get(
//     "/:id",
//     allocationController.getAllocationById
// );

// // =====================================================
// // UPDATE ALLOCATION
// // PUT /api/allocations/1
// // =====================================================
// router.put(
//     "/:id",
//     allocationController.updateAllocation
// );

// // =====================================================
// // DELETE ALLOCATION
// // DELETE /api/allocations/1
// // =====================================================
// router.delete(
//     "/:id",
//     allocationController.deleteAllocation
// );

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// const allocationController = require("../controllers/allocationController");

// console.log("✅ Allocation route loaded");


// // TEST ROUTE
// router.get("/test", (req, res) => {
//     console.log("🔥 ALLOCATION TEST ROUTE HIT");

//     res.json({
//         success: true,
//         message: "Allocation route is working"
//     });
// });


// // ADD ALLOCATION
// router.post(
//     "/",
//     allocationController.addAllocation
// );


// // GET ALL ALLOCATIONS
// router.get(
//     "/",
//     allocationController.getAllAllocations
// );


// // GET ALLOCATION BY ROOM ID
// // IMPORTANT: before /:id
// router.get(
//     "/room/:roomId",
//     allocationController.getAllocationByRoomId
// );


// // GET ALLOCATION BY ID
// router.get(
//     "/:id",
//     allocationController.getAllocationById
// );


// // UPDATE ALLOCATION
// router.put(
//     "/:id",
//     allocationController.updateAllocation
// );


// // DELETE ALLOCATION
// router.delete(
//     "/:id",
//     allocationController.deleteAllocation
// );

// router.get("/test", (req, res) => {
//     res.json({
//         success: true,
//         message: "Allocation route is working"
//     });
// });
// module.exports = router;


const express = require("express");
const router = express.Router();

const allocationController = require("../controllers/allocationController");

console.log("✅ Allocation route loaded");

router.post("/", allocationController.addAllocation);

router.get("/", allocationController.getAllAllocations);

// IMPORTANT: keep this BEFORE /:id
router.get("/room/:roomId", allocationController.getAllocationByRoomId);

router.get("/:id", allocationController.getAllocationById);

router.put("/:id", allocationController.updateAllocation);

router.delete("/:id", allocationController.deleteAllocation);

module.exports = router;