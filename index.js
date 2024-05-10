import UserService from "./services/user.service.js";
import EmailService from "./services/email.service.js";
import AuthService from "./services/auth.service.js";


async function startApp(){
    await UserService.start();
    await EmailService.start();
    await AuthService.start()

    try {
        //user services
        const newUser = await UserService.call('user.createUser', {
            username: 'John',
            email: 'john@gmail.com'
        });
        console.log('New User created:', newUser);

        const users = await UserService.call('user.getUsers');
        console.log("All Users:", users);


        //emails service 
        const  emailResult = await EmailService.call('email.sendEmail',{
            recipient: newUser.email,
            subject: 'Application Form',
            content: 'Job Application'
        })
        console.log("Email:", emailResult);

        //auth  service
        const  authResult = await AuthService.call('auth.authUser',{
            username: newUser.username,
            password: 'password'
        })
        console.log("Auth:", authResult);

    } catch (error) {
        console.error("Error occurred:", error);

    } finally {
        await UserService.stop();
        await EmailService.stop();
        await AuthService.stop();
        
        console.log("Services stopped.");
    }
}

startApp();