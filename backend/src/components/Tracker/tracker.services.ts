// const Tracker = require("./tracker");

// // create or add sale 
// exports.createOrUpdateTracker = async (data) => {
//   const { city, company, model, sales } = data;

//   const existing = await Tracker.findOne({
//     city,
//     company,
//     model,
//   });

//   if (existing) {
//     //already exits (add sale to existing data )
//     existing.sales += Number(sales);
//     return await existing.save();
//   }

//   const newEntry = new Tracker(data);
//   return await newEntry.save();
// };

// // get all the user data
// exports.getTracker = async () => {
//   return await Tracker.find().lean();
// };

// // uodate sale 
// exports.updateTracker = async (id, data) => {
//   return await Tracker.findByIdAndUpdate(id, data, { new: true });
// };

// // DELETE
// exports.deleteTracker = async (id) => {
//   return await Tracker.findByIdAndDelete(id);
// };


import Tracker from "./tracker";

interface TrackerInput{
  city: string;
  company: string;
  productModel: string;
  sales: number;
}

type TrackerDoc = any;


export const createOrUpdateTracker = async (
  data: TrackerInput
): Promise<TrackerDoc> => {
  const { city, company, productModel, sales } = data;

  const existing = await Tracker.findOne({
    city,
    company,
    productModel,
  });

  if(existing) {
    existing.sales += Number(sales);
    return await existing.save();
  }

  const newEntry = new Tracker(data);
  return await newEntry.save();
};

//get All
export const getTracker = async (): Promise<TrackerDoc[]> => {
  return await Tracker.find().lean();

}

//update
export const updateTracker = async (
  id: string,
  data: Partial<TrackerInput>
): Promise<TrackerDoc | null> => {
  return await Tracker.findByIdAndUpdate(id, data, { new: true });
};


export const deleteTracker = async (
  id: string
): Promise<TrackerDoc | null> => {
  return await Tracker.findByIdAndDelete(id);
};