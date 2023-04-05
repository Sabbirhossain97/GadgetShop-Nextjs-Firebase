import users from "../../users"
export default function response(req, res) {
  res.status(200).json(users);
}
