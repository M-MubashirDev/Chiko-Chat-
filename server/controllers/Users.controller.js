import User from "../models/Users.modal.js";

export async function signup(req, resp) {
  try {
    const { username, password, email } = req.body;
    console.log(username, password, email);
    if (!username || !password || !email) {
      resp.status(400).json({ message: "All fields are required" });
    }
    const user = await User({ username, password, email });
    await user.save();
    resp.status(201).json({ user });
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
}

export async function login(req, resp) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      resp.status(400).json({ message: "All fields are required" });
    }
    const user = await find({ email, password });
    if (!user) {
      resp.status(404).json({ message: "User not found" });
    }
    resp.status(200).json({ user });
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
}
export async function GetUsers(req, resp) {
  try {
    const data = await User.find();
    if (!data)
      resp.status(404).json({ message: "there are no users currently" });
    resp.status(200).json({
      message: "users found",
      data,
    });
  } catch (error) {
    resp.status(400).json({ message: error.message });
  }
}
