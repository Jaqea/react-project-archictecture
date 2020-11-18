import { Home } from "@/views";

const HomeRoutes = {
  path: "/home",
  component: Home,
  backUrl: "/login",
  role: ["user"],
  children: [],
};

export default HomeRoutes;
