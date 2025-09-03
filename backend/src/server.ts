import { app } from './app'
import { sequelize } from './Data/database'

const PORT = process.env.PORT

app.listen(PORT, async () =>{
    try{
        console.log(`Server is running on port ${PORT}`);
        await sequelize.authenticate();

    }catch(error){
        console.log(error);
    }
})