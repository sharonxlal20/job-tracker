const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const protect = require('../middleware/authMiddleware');
const asyncWrapper = require('../middleware/asyncWrapper');

// GET /jobs — search, filter, sort, paginate
router.get('/', protect, asyncWrapper(async (req, res) => {
  const { search, status, jobType, sort, page, limit } = req.query;

  const queryObject = { createdBy: req.user._id };

  if (status && status !== 'all') {
    queryObject.status = status;
  }

  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }

  let result = Job.find(queryObject);

  if (sort === 'latest') result = result.sort('-createdAt');
  if (sort === 'oldest') result = result.sort('createdAt');
  if (sort === 'a-z') result = result.sort('company');
  if (sort === 'z-a') result = result.sort('-company');
  if (!sort) result = result.sort('-createdAt');

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  result = result.skip(skip).limit(limitNum);

  const jobs = await result;
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limitNum);

  res.json({ jobs, totalJobs, numOfPages, currentPage: pageNum });
}));

// GET /jobs/:id
router.get('/:id', protect, asyncWrapper(async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, createdBy: req.user._id });
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json({ job });
}));

// POST /jobs — create a job for the logged-in user
router.post('/', protect, asyncWrapper(async (req, res) => {
  const { company, position, status, jobType, jobLocation } = req.body;
  const job = await Job.create({
    createdBy: req.user._id,
    company,
    position,
    status,
    jobType,
    jobLocation,
  });
  res.status(201).json({ message: 'Job created', job });
}));

// PUT /jobs/:id
router.put('/:id', protect, asyncWrapper(async (req, res) => {
  const { company, position, status, jobType, jobLocation } = req.body;
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    { company, position, status, jobType, jobLocation },
    { new: true, runValidators: true }
  );
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json({ message: 'Job updated', job });
}));

// DELETE /jobs/:id
router.delete('/:id', protect, asyncWrapper(async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json({ message: 'Job deleted' });
}));

module.exports = router;