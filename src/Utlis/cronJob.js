import schedule from'node-schedule';
import userModel from '../../DB/models/user.model.js';
import cloudinary from './cloudinary.js';
// At midnight every day , checking if there's any folder exist in cloudnairy belongs to user , where user is not exist in Database ( permanently Deleted Account )
export const deleteUserFromCloud = ()=>{
    return schedule.scheduleJob('0 0 * * *',async()=>{
        let cloud = await cloudinary.api.sub_folders(`${process.env.APP_NAME}/users`)
        const user = await userModel.find({})
        let usersInCloud = cloud.folders.filter(x=>!user.map(x=>x._id.toString()).includes(x.name))
        for (const user of usersInCloud) {
            await cloudinary.api.delete_resources_by_prefix(`${process.env.APP_NAME}/users/${user.name}`)
            await cloudinary.api.delete_folder(`${process.env.APP_NAME}/users/${user.name}`)
        }
    });
}


