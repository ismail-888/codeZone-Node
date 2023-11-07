const appError = require("../utils/appError");

module.exports=(...roles)=>{
    // exp ['ADMIN','MANGER']
    console.log("Role",roles);

    return (req,res,next)=>{
        if(!roles.includes(req.currentUser.role)){
            return next(appError.create('this role is not authrized',401))
        }
        next();
    }
}