const express = require("express");
const applySchema = require("../model/applySchema");
const stateSchema = require("../model/stateSchema");
const { v4: uuidv4 } = require('uuid');
const registerApplicant = async (req, res) => {
  try {
      const { name, phone, birthday, gender, occupation, education, govben,vin, nin, bvn, bankDetails, state, LGA, ward } = req.body;
      const userId = uuidv4();
      // Debugging output
      console.log(req.body); // Log the incoming request body

      // Check for required fields
      if (!state || typeof state !== 'string') {
          return res.status(400).json({ msg: 'Invalid or missing state' });
      }
      if (!LGA || typeof LGA !== 'string') {
          return res.status(400).json({ msg: 'Invalid or missing LGA' });
      }
      if (!ward || typeof ward !== 'string') {
          return res.status(400).json({ msg: 'Invalid or missing ward' });
      }

      // Generate user code
      const userCode = generateUserCode(state, LGA, ward);

      // Check for userCode conflicts
      const existingUser = await applySchema.findOne({ userCode });
      if (existingUser) {
          return res.status(409).json({ msg: "UserCode conflict, please try again" });
      }

      // Create a new applicant
      const newApplicant = new applySchema({
          userId,
          userCode, // Automatically generated
          name,
          phone,
          birthday,
          gender,
          occupation,
          education,
          govben,
          vin,
          nin,
          bvn,
          bankDetails,
          state,
          LGA,
          ward,
      });

      await newApplicant.save();
      return res.status(201).json({ msg: "New user added successfully" });

  } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal server error" });
  }
};

// Function to generate user code
const generateUserCode = (state, LGA, ward) => {
  // Validate inputs
  if (!state || typeof state !== 'string') {
    throw new Error('Invalid or missing state');
  }
  // if (!LGA || typeof LGA !== 'string') {
  //   throw new Error('Invalid or missing LGA');
  // }
  if (!ward || typeof ward !== 'string') {
    throw new Error('Invalid or missing ward');
  }

  // Generate abbreviations and user code
  const stateAbb = state.slice(0, 2).toUpperCase();
  const lgaAbb = LGA.slice(0, 2).toUpperCase();
  const wardAbb = ward.slice(0, 2).toUpperCase();
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `${stateAbb}-${lgaAbb}-${wardAbb}-${randomNumber}`;
};


const createState = async (req, res) => {
  try {
    const newState = new stateSchema(req.body);
    const { stateName } = req.body; // Use req.body instead of newState to get stateName directly

    // Check if the state already exists
    const validate = await stateSchema.findOne({ stateName });
    if (validate) {
      return res.status(409).json({ "msg": "State already exists" });
    }

    // Save the new state
    await newState.save();
    return res.status(201).json({ "msg": "New state added successfully", newState });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ "msg": "Internal server error" });
  }
};

const getStates = async (req, res) => {
  try {
      const states = await stateSchema.find(); // Fetching states
      if (states.length === 0) {
          return res.status(404).json({ msg: "No states found" });
      }
      return res.status(200).json({ states }); // Returning states in a structured format
  } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal server error" });
  }
};

const getLGAsByState = async (req, res) => {
  const { stateId } = req.params;
  try {
      const state = await stateSchema.findOne({ stateName: stateId });
      if (!state) {
          return res.status(404).json({ msg: "State not found" });
      }
      return res.status(200).json({ LGAs: state.LGAs });
  } catch (error) {
      console.error('Error fetching LGAs:', error);
      return res .status(500).json({ msg: "Internal server error" });
  }
};




  
 
  

const getWardsByLGA = async (req, res) => {
  const { lgaName } = req.params;
  try {
      const state = await stateSchema.findOne({ "LGAs.lgaName": lgaName });
      if (!state) {
          return res.status(404).json({ msg: "LGA not found" });
      }
      const lga = state.LGAs.find(lga => lga.lgaName === lgaName);
      return res.status(200).json({ wards: lga.wards });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal server error" });
  }
};


  const updateApplicant = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedApplicant = await applySchema.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedApplicant) {
            return res.status(404).json({ msg: 'Applicant not found' });
        }
        return res.status(200).json({ msg: 'Applicant updated successfully', updatedApplicant });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};


// Function to delete an applicant by ID
const deleteApplicant = async (req, res) => {
    const { id } = req.params;  // Extract the ID from the URL parameter

    try {
        // Check if the applicant exists before attempting to delete
        const deletedApplicant = await applySchema.findByIdAndDelete(id);
        
        if (!deletedApplicant) {
            return res.status(404).json({ msg: 'Applicant not found' });
        }

        // Return a success response
        return res.status(200).json({ msg: 'Applicant deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};


  

module.exports = { registerApplicant, createState, getStates, generateUserCode,getLGAsByState,getWardsByLGA,deleteApplicant,updateApplicant };
