// const trackerService = require("./tracker.services");

// // Add or merge
// exports.createTracker = async (req, res) => {
//   try {
//     const data = await trackerService.createOrUpdateTracker(req.body);
//     res.status(201).json(data);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // get
// exports.getTracker = async (req, res) => {
//   try {
//     const data = await trackerService.getTracker();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update
// exports.updateTracker = async (req, res) => {
//   try {
//     const data = await trackerService.updateTracker(req.params.id, req.body);
//     res.json(data);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // deelte
// exports.deleteTracker = async (req, res) => {
//   try {
//     await trackerService.deleteTracker(req.params.id);
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };


import { Request, Response } from "express";
import * as trackerService from "./tracker.services";

//Add or merge 
export const createTracker = async (req: Request, res: Response) => {
	try{
		const data = await trackerService.createOrUpdateTracker(req.body);
		res.status(201).json(data);

	}catch(err: any){
		res.status(400).json({ message: err.message });
	}
	
};

//Get 
export const getTracker = async (req: Request, res: Response) => {
	try{
		const data = await trackerService.getTracker();
		res.json(data);
	}catch(err: any){
		res.status(500).json({ message: err.message });
	}
}

//Update
export const updateTracker = async (req: Request, res: Response) => {
	try{
		const data = await trackerService.updateTracker(req.params.id as string, req.body);
		res.json(data);
	}catch(err: any){
		res.status(400).json({ message: err.message });
	}
}

//Delete 
export const deleteTracker = async (req: Request, res: Response) => {
	try{
		await trackerService.deleteTracker(req.params.id as string);
		res.json({ message: "Deleted successfully" });
	}catch(err: any){
		res.status(400).json({ message: err.message });
	}
}
