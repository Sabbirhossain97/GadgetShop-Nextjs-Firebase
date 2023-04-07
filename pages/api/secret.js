import secret from "../../secret"
export default function response(req, res) {
  res.status(200).json(secret);
}
