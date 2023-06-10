import { User } from "../../models/User";

export default defineEventHandler(async (event) => {
  const { username, email, password } = await readBody(event);

  try {
    const newUser = await User.create({ username, email, password });
    return {
      message: "User created !",
      newUser,
    };
  } catch (error) {
    console.log(error);
  }
});
