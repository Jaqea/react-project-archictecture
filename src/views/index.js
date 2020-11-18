// 路由懒加载统一出口
import Loadable from "./Loadable";

const Home = Loadable(() => import("./Home"));
const Login = Loadable(() => import("./Login"));
const NotFound = Loadable(() => import("./NotFound"));

export { Home, Login, NotFound };
