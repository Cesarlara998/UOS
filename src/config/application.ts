import express, { Application } from "express";
import { ENV_PORT } from "./env";
import { color, log, red, green, cyan, cyanBright } from 'console-log-colors';
import * as bodyParser from "body-parser";
import { errorHandler, responseFormatter } from "../helpers/responses";
var cors = require('cors')
export default class ApplicationBootstrap {
    public app: Application;
    public port: number;
    public prefix: string;
    
    constructor(routers: any[]) {
        this.port = ENV_PORT;
        this.prefix = "/api/v1";
        
        this.app = express();
        this.Helpers();

        if (routers) this.initRouter(routers)
          this.app.use(errorHandler);
          this.init()    
      }

    private Helpers() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        
        this.app.use(responseFormatter);
    }
    
    private initRouter(routers: any[]) {

        routers.forEach((route) => {
          this.app.use(this.prefix, route.router);      
          route.router.stack.forEach((layer: { route: { methods: {}; path: any; }; }) => {
            if (layer.route) {    
              const methods = Object.keys(layer.route.methods).map((method) => {
                return method.toUpperCase();
              });
              console.log(`[${red(methods.join(", "))}] - ${this.prefix}${layer.route.path}`);
            }
          });
    
        });
      }
      public init() {
        try {
    
          this.app.listen(this.port, () => {
            console.log(`Server Ready on port ${cyanBright(this.port)}`);
          })
        } catch (error) {
          console.error(error);
          process.exit(1);
        }
    
      }
}