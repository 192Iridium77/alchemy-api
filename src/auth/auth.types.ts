import { User } from "../users/user.types";

export interface AuthenticatedRequest extends Request {
  user: Pick<User, "id" | "role">;
}
