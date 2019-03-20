import db from '../config/db';
import queries from '../config/queries';

export default class GroupControllers{
    static async createGroup(req,res){
      //  const text = 'SELECT * FROM groups WHERE name=$1'
       try{
      const  groupData = {};
      groupData.name = req.body.name;
      groupData.createdOn = Date.now();
      groupData.creator = req.body.creator;
      console.log(groupData);
      const {rowCount} = await db.query(queries.checkIfGroupExist,[groupData.name]);
       if(rowCount===0){
            const groupTableData = [groupData.name,groupData.createdon,groupData.creator];
            const createdGroup = await db.query(queries.createGroup,groupTableData);
            const data ={
               groupName :groupData.name,
               creator:groupData.creator,
            }
            res.status(201).json({'status':201,data,'message':`${groupData.name} Created Successfully` })
         }else{
             res.status(401).json({'status':401,'Error':'Group Already Exist'})
         }
      
      
      
      
    }catch(e){
     
       }
        
    }
}