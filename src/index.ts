import { ENV_PORT } from './config/env';
import Database from './config/mongo';
import RoleModule from './modules/role/role.module';
import ApplicationBootstrap from './config/application';
import UserModule from './modules/users/user.module';
import emailService from './modules/email/email.service';



const initApp = async () => {
        const mongoDB = new Database();
	    await mongoDB.mongooseDB();


        const Role = new RoleModule();
        const EmailService = new emailService();
        const User = new UserModule(EmailService);
        
        new ApplicationBootstrap([Role,User]);

}

initApp();