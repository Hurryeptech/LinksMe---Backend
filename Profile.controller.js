const Profile = require('../../models/Userprofile/Profile');

// Create a new profile
exports.createUser = async (req, res) => {
  try {
    const newUser = new Profile(req.body);
    await newUser.save();
    res.status(201).json({ message: 'Profile created successfully', data: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Error creating profile', error: error.message });
  }
};

// Get all profiles
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Profile.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profiles', error: error.message });
  }
};

// Get single profile by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await Profile.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// Update profile
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile updated successfully', data: updatedUser });
  } catch (error) {
    res.status(400).json({ message: 'Error updating profile', error: error.message });
  }
};

// Delete profile
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await Profile.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting profile', error: error.message });
  }
};
