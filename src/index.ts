import { ENV_PORT } from './config/env';
import Database from './config/mongo';
import RoleModule from './modules/role/role.module';
import ApplicationBootstrap from './config/application';



const initApp = async () => {
        const mongoDB = new Database();
	    await mongoDB.mongooseDB();


        const Role = new RoleModule()    
        new ApplicationBootstrap([Role])

}

initApp();