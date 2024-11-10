const applySchema = require('../model/applySchema'); // Adjust the path as necessary
const stateSchema = require('../model/stateSchema'); // Adjust the path as necessary

const checkDatabaseRecords = async () => {
    try {
        // Check for records in applySchema
        const totalApplicants = await applySchema.countDocuments();
        console.log(`Total Applicants: ${totalApplicants}`);

        // Check for records in stateSchema
        const totalStates = await stateSchema.countDocuments();
        console.log(`Total States: ${totalStates}`);

        // Check for LGAs in stateSchema
        const statesWithLGAs = await stateSchema.aggregate([
            { $unwind: "$LGAs" },
            { $group: { _id: null, count: { $sum: 1 } } }
        ]);
        const totalLGAs = statesWithLGAs.length > 0 ? statesWithLGAs[0].count : 0;
        console.log(`Total LGAs: ${totalLGAs}`);

        // Add any other checks you need here...

    } catch (error) {
        console.error('Error checking database records:', error);
    }
};

module.exports = { checkDatabaseRecords };