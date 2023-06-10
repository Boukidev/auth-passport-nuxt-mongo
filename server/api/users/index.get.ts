import { User } from "../../models/User";

export default defineEventHandler(async (event) => {
  try {
    const users = await User.find();
    return {
      message: "users fetched !",
      users,
    };
  } catch (error) {
    console.log(error);
  }
});
