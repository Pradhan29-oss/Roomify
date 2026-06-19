import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
<<<<<<< HEAD
    route('visualizer/:id', './routes/visulaizer.$id.tsx')
=======
    route('visualizer/:id', './routes/visualizer.$id.tsx')
>>>>>>> b4887eb (implement coderabbit suggested fixes)

] satisfies RouteConfig;
