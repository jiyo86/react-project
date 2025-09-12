
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/userlist.tsx"),
    route("new-user", "routes/new-user.tsx"),

] satisfies RouteConfig;
