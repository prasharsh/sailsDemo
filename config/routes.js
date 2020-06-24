/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  "/": { view: "pages/homepage" },
  "GET /getParts": "LabController.getParts",
  "GET /getPartsByNameID": "LabController.getPartsByNameID",
  "POST /addParts": "LabController.addParts",
  "POST /updateParts": "LabController.updateParts",
  "GET /viewData": "LabController.viewData",
  "GET /viewSpecificData": { view: "pages/viewDataByNameId" },
  "GET /addData": { view: "pages/addData" },
  "GET /updateData": { view: "pages/updateData" },
  "POST /addData": "LabController.addData",
};
