import { ServiceBroker } from "moleculer";

const broker = new ServiceBroker();

const user = []

function generatedId(){
    return Math.floor(Math.random() * 100) +1
}

broker.createService({
    name: 'user',
    actions: {
       async  createUser(ctx){
            const { username,email} = ctx.params
            const newUser = {id:generatedId(),username, email}
            user.push(newUser)
            return newUser
            
        },

       async getUsers(ctx){
             return user
        }
    }

});


export default  broker;