const jwt = require("jsonwebtoken");
const tokenSecret="H-e-s-o-y-a-m";

const Group = require("./../models/group");

const  isInConnectedGroup =  async (userOneGroup,userTwoGroup,userOne,userTwo) => {

    console.log("user one  id  :",userOne._id);
    console.log("user two  id",userTwo._id);

    let groups1 =[]
    groups1 = userOneGroup.merged;
let groups2=[]
    groups2 = userTwoGroup.merged;
    
    let foundGroup;
    let isOK = false;
    let res = await Promise.all(
        groups1.map(async item =>{
            foundGroup = await Group.findById(item);
            console.log("item Group1:", item, foundGroup.merged);
            console.log();
    
            if(foundGroup.merged.includes(userTwoGroup._id)) 
               {
                this.isOK = true;
               }
        }
        )
      );
   
    console.log("user one group id  :",userOneGroup._id);
    console.log("user two group id", userTwoGroup._id);
    let data = await Promise.all(
        groups2.map(async item => {
            foundGroup = await Group.findById(item);
            console.log("item Group2:", item, "merged is :", foundGroup.merged);
            console.log();
            if(foundGroup.merged.includes(userOneGroup._id)){
             this.isOK = true;
            }
    
          })
      );
   console.log(isOk)
    return isOK;
};

module.exports = isInConnectedGroup;