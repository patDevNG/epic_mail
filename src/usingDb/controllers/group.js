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

    static async getAllGroupInfo(req,res){
       const {rows,rowCount} = await db.query(queries.getAllGroupInfo);
       if(rowCount ===0){
          res.status(400).json({'status':400, 'message':'No Record'});
       }else{
         const data = rows;
         res.status(200).json({'status':200,data})
       }
       
    

    }
    static async editGroupName(req,res){
     const groupId = req.params.id;
     const name = req.body.name;
     const creator = req.body.creator;
     const evaluateCreator = await db.query(queries.checkGroupCreator,[creator,name])
     if(evaluateCreator.rowCount!==1){
     res.status(403).json({'status':403, 'Message':'You are not Authorize to Edit group name'})
     }else{
      
      const {rows,rowCount} = await db.query(queries.checkIfGroupExist,[name]);
      if(rowCount>0){
         res.status(401).json({'status':401,'message':'Group Name Already Exist Choose another Name'})
      }else{
         const editGroupTableValue =[name,groupId,creator];
         const {rows} = await db.query(queries.updateGroupName, editGroupTableValue);
         return res.status(201).json({'status':201, 'message':`Group name updated to ${name}`});
      }
 
     }
    }
    static async deleteGroup(req,res){
       const groupId = req.params.id;
       const email = req.body.email;
       const evaluateCreator = await db.query(queries.checkIfGroupExistById,[groupId,email]);
       if(evaluateCreator.rowCount!==1){
          res.status(403).json({'status':403, 'message':'You are not Authorized to delete Group'});
       }else{
          const deletedGroup = await db.query(queries.deleteGroup,[groupId,email]);
          res.status(200).json({'status':200, 'Message':'Group Successfully Deleted'});
       }

    }
    static async addUserToGroup(req,res){
       try{
          
          
       const addedUser ={};
       addedUser.groupId = req.body.groupId;
       addedUser.email = req.body.email;
       addedUser.addedon = Date.now();
       const evaluateGroup =await db.query(queries.checkIfGroupExistByOneValue,[addedUser.groupId]);
       if(evaluateGroup.rowCount ==0){
         const evaluateUser = await db.query(queries.checkIfUserExist,[addedUser.email]);

         if(evaluateUser.rowCount ===1){
           const insertIntoGroup = await db.query(queries.insertUserIntoAGroup,[1,addedUser.email]);
           res.status(201).json({'status':201, 'Message':'User Added Successfully'}) 
         } else{
            res.status(401).json({'status':401, 'message':'User Cannot be found'})
         }
       }else{
         
       }res.status(401).json({'status':401,'message':'Group Does Not Exist'})
       
      }catch(e){
    console.log("asaksnnnnnnnnnnnnnnnnndasdklnasdjnasdjlnasjd;lj;asdas",e);
    
    
    }
}

}