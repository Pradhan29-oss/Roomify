import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('visulaizer/:id', './routes/visulizer.$is.tsx')

] satisfies RouteConfig;
