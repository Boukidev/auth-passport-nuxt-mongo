import { User } from "../../models/User";

export default defineEventHandler(async (event) => {
  try {
    const user = await User.deleteOne({ _id: event.context?.params?._id });
    return {
      message: "User deleted !",
      user,
    };
  } catch (error) {
    console.error(error);
  }
});
