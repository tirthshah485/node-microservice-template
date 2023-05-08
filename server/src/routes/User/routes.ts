import { BaseRouter } from "../base"
import { helloWorldController } from "../../controllers"

export const routes: Array<BaseRouter.Route> = [
    {
        method: BaseRouter.METHOD.GET,
        path: "/hello",
        controllers: [helloWorldController]
    },
    
]