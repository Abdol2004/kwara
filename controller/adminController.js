const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminSchema = require("../model/adminSchema");
const applySchema= require("../model/applySchema")
const stateSchema= require("../model/stateSchema")



const createAdmin = async (req, res) => {
  try {
    const { adminUsername, adminEmail, adminPassword } = req.body;


    const existingAdmin = await adminSchema.findOne({ adminUsername });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }


    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newAdmin = new adminSchema({
      adminUsername,
      adminEmail,
      adminPassword: hashedPassword,
    });

    await newAdmin.save(); // Save newAdmin instead of checkAdmin

    // Create a token
    const token = jwt.sign({ adminId: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ msg: "Admin created successfully", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Error" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { adminEmail, adminPassword } = req.body;

    // Check if email and password are provided
    if (!adminEmail || !adminPassword) {
      return res.status(400).json({ error: "Please provide both email and password" });
    }

    // Find admin by email
    const admin = await adminSchema.findOne({ adminEmail });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(adminPassword, admin.adminPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const payload = { id: admin.id }; // You can include more admin info if needed
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token and admin information
    res.status(200).json({ message: "Login successful", token, admin: { id: admin.id, adminEmail: admin.adminEmail } });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getApplicant = async (req, res) => {
  try {
    const allApply = await applySchema.find();
    if (allApply.length === 0) {
      return res.status(500).json({ msg: "No Applicant" });
    }
    return res.status(200).json({ allApply });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getDashboardData = async (req, res) => {
  try {
    // Fetch all applicants
    const allApply = await applySchema.find();
    const totalApplicants = await applySchema.countDocuments();  // Count the total number of applicants

    // Fetch the total number of states
    const totalStates = await stateSchema.countDocuments();  // Count the total number of states

    // Fetch the total number of LGAs
    // Assuming your stateSchema has a field "LGAs" which is an array of LGAs
    const totalLGAs = await stateSchema.aggregate([
      { $unwind: "$LGAs" },  // Flatten the LGAs array
      { $group: { _id: null, count: { $sum: 1 } } }  // Group and count the LGAs
    ]);

    const lgaCount = totalLGAs.length > 0 ? totalLGAs[0].count : 0;  // Extract the count of LGAs

    // Render the dashboard with the fetched data
    res.render('dashboard', {
      title: 'Admin Dashboard',
      allApply,  // Pass all applicants to the view
      totalApplicants,  // Pass total applicants count
      totalStates,  // Pass total states count
      totalLGAs: lgaCount,  // Pass total LGAs count
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { createAdmin, loginAdmin,getApplicant,getDashboardData };
