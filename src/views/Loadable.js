// 路由懒加载
import Loadable from "react-loadable";
import Loading from "components/Loading";

export default function LoadComponent(component, options = {}) {
  return Loadable({
    loader: component,
    loading: Loading,
    delay: 200,
    timeout: 1000,
    ...options,
  });
}
