const { addSubmenuMenu, editSubmenuById, submenuBindParentMenu, delSubmenu} = require('./actionsSubmenu');

module.exports = {
    addSubmenuController: async (req, res) => {
        try {
            const result = await addSubmenuMenu(req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
    editSubmenuController: async (req, res) => {
        try {
            const { submenuId } = req.params;
            const result = await editSubmenuById(submenuId, req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
    submenuBindMenuController:async(req,res)=>{
        try{
            await submenuBindParentMenu({...req.params})
            return  res.status(200).json({message:'Success'})
        }catch(e){
            console.log(e)
            return e
        }
    },
    delSubmenuController:async(req,res)=>{
        try{
            const {submenuId}=req.params
            if(submenuId){
                await delSubmenu(submenuId)
            return  res.status(200).json({message:'Success'})
            } else
                return  res.status(400).json({message:'Submenu Id has not' +
                        ' null'})
            return  res.status(500).json({message:'Server Error'})
        }catch (e){
            console.log(e)
            return e
        }
    }
};
