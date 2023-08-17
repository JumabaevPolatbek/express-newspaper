const submenuTable = require('../../models/index').submenu;
const menuSubmenuLangTable =
    require('../../models/index').menus_has_submenus_post_languages;
module.exports = {
    addSubmenuBindMenu: async (body) => {
        try {
            const { submenu, parentMenuId, languageId, description } = body;
            return await submenuTable.create(
                {
                    title: submenu.title,
                    slug: submenu.slug,
                    content: submenu.content,
                    submenus: {
                        menuId: parentMenuId,
                        languageId: languageId,
                        description: description,
                    },
                },
                {
                    include: [
                        {
                            model: menuSubmenuLangTable,
                            as: 'submenus',
                        },
                    ],
                }
            );
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    editSubmenuById: async (submenuId, body) => {
        try {
            const { submenu, parentMenuId, languageId } = body;
            await submenuTable.update(
                { ...submenu },
                { where: { id: submenuId } }
            );
            return await menuSubmenuLangTable.update(
                { menuId: parentMenuId, languageId: languageId },
                { where: { submenuId: submenuId } }
            );
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    submenuBindParentMenu:async({submenuId, langId, parentMenuId})=>{
        try{
            return  await menuSubmenuLangTable.update({
                submenuId: submenuId
            },{
                where:{
                    menuId: parentMenuId,
                    languageId:langId
                }
            })
        }catch(error){
            console.log(error)
            return error
        }
    },
    delSubmenu:async(submenuId)=>{
        try{
            return  await submenuTable.destroy({where:{
                id:submenuId
                }})
        }catch (e){
            console.log(e)
            return e
        }
    }
};
