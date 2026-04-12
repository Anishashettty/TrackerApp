const Tracker = require("./tracker");

// create or add sale 
exports.createOrUpdateTracker = async (data) => {
  const { city, company, model, sales } = data;

  const existing = await Tracker.findOne({
    city,
    company,
    model,
  });

  if (existing) {
    //already exits (add sale to existing data )
    existing.sales += Number(sales);
    return await existing.save();
  }

  const newEntry = new Tracker(data);
  return await newEntry.save();
};

// get all the user data
exports.getTracker = async () => {
  return await Tracker.find().lean();
};

// uodate sale 
exports.updateTracker = async (id, data) => {
  return await Tracker.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
exports.deleteTracker = async (id) => {
  return await Tracker.findByIdAndDelete(id);
};