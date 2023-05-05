// module imports
import { RequestHandler, Router } from "express";

// internal imports
import { Logger } from "../services";

export class BaseRouter {

  public router: Router;
  private logger: Logger;

  constructor(private readonly routes: Array<BaseRouter.Route>) {
    this.routes = routes;
    this.router = Router();
    this.logger = new Logger();
    this.init();
  }

  private addRoute(method: BaseRouter.Method, path: string, controllers: Array<RequestHandler>) {
    switch (method) {
      case (BaseRouter.METHOD.GET):
        this.router.get(path, ...controllers);
        break;
      case (BaseRouter.METHOD.POST):
        this.router.post(path, ...controllers);
        break;
      case (BaseRouter.METHOD.PUT):
        this.router.put(path, ...controllers);
        break;
      case (BaseRouter.METHOD.PATCH):
        this.router.patch(path, ...controllers);
        break;
      case (BaseRouter.METHOD.PUT):
        this.router.delete(path, ...controllers);
        break;
      default:
        this.logger.error(`Undefined HTTP verb "${method}". Unable to add a route for the same in the router.`);
        break;
    }
  }

  private init() {
    this.routes.forEach((routeObject: BaseRouter.Route) => {
      this.addRoute(routeObject.method, routeObject.path, routeObject.controllers);
    });
  }

}


export namespace BaseRouter {
  export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  export enum METHOD {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
  }
  export type Route = {
    method: Method;
    path: string;
    controllers: Array<RequestHandler>;
  }
}