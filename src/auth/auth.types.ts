import { User } from "../user/user.types";

export interface AuthenticatedRequest extends Request {
  user: Pick<User, "id" | "role">;
}
