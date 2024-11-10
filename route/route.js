const express= require("express")
const Router= express.Router();
const {registerApplicant,createState,getStates,generateUserCode,getLGAsByState,getWardsByLGA,updateApplicant, deleteApplicant}= require("../controller/applyContoller")
const {createAdmin,loginAdmin,getApplicant,getDashboardData}= require("../controller/adminController")
const authMiddleware = require("../middleware/authMiddleware");

Router.post("/apply", registerApplicant)
Router.get("/api/getStates", getStates);
Router.get('/api/getWards/:lgaName', getWardsByLGA);
Router.get('/api/getLGAs/:stateId', getLGAsByState);
Router.post("/apply", generateUserCode)
Router.post("/state", createState)
Router.get("/api/counts", getDashboardData)
Router.get("/state", getStates)
Router.post("/admin/register", createAdmin)
Router.post("/admin/login", loginAdmin)
Router.get('/admin/applicants', authMiddleware, getApplicant);
Router.put('/admin/applicants/:id', authMiddleware, updateApplicant);
Router.delete('/admin/api/users/:id', deleteApplicant);




module.exports= Router; 