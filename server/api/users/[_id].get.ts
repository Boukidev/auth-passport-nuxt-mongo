import { User } from "../../models/User";

export default defineEventHandler(async (event) => {
  try {
    const user = await User.findOne({ _id: event.context?.params?._id });
    return {
      message: "User fetched !",
      user,
    };
  } catch (error) {
    console.error(error);
  }
});
