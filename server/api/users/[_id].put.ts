import { User } from "../../models/User";

export default defineEventHandler(async (event) => {
  const { username, email, password } = await readBody(event);

  try {
    const user = await User.updateOne(
      { _id: event.context?.params?._id },
      { username, email, password, _id: event.context?.params?._id }
    );
    return {
      message: "User updated !",
      user,
    };
  } catch (error) {
    console.error(error);
  }
});
