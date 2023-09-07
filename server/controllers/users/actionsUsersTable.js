const usersTable = require("../../models/index").users_table;
const { hashPassword } = require("../../services/hashPassword");
const validationError = require("../../services/validationError");
const permissionsTable = require("../../models/index").permissions;
const usersGroup = require("../../models/index").users_has_groups;
const usersHasPermission = require("../../models/index").users_has_permissions;
const imagesTable = require("../../models/index").images;
const fs=require('fs')
module.exports = {
  addUser: async (body) => {
    try {
      const { username, password, email, permissions } = body;
  
      const createdUser = await usersTable.create({
        username: username,
        password: hashPassword(password),
        email: email,
      });
  
      const createdPermissions = await permissionsTable.create({ ...permissions });
  
      await usersHasPermission.create({
        userId: createdUser.id,
        permissionId: createdPermissions.id,
      });
  
      return {
        message: 'User added successfully',
        statusCode: 200,
      };
    } catch (error) {
      const {statusCode,message,errors}=validationError(error)
      return {
        statusCode:statusCode,
        message:message,
        errors:errors
      }
    }
  },
  addUserToGroup: async (groupId, userId) => {
    try {
      return await usersGroup.create({
        userId: userId,
        groupId: groupId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  deleteUser: async (userId) => {
    try {
      const result = await usersHasPermission.findOne({
        where: {
          userId: userId,
        },
      });
      if(result!==null){
        await usersTable.destroy({
          where:{
            id:userId
          }
        })
        return {
          message:result.username+' has removed',
          statusCode:200
        }
      }
      return {
        message:'User with this id does not exist',
        statusCode:401
      }
    } catch (error) {
     return validationError(error)
    }
  },
  editUser: async (userId, body) => {
    try {
      return await usersTable.update(
        { ...body },
        {
          where: {
            id: userId,
          },
        }
      );
    } catch(error){
      return validationError(error)
    }
  },
  imageUpload: async (userId, pathImage) => {
    try {
      const resultUser = await usersTable.findOne({
        where: { id: userId },
      });
      const imageResult = await imagesTable.create({
        name: resultUser.username,
        path: pathImage,
      });
      const result= await usersTable.update(
        { imageId: imageResult.id },
        { where: { id: userId } }
      );
      return {
        message:result,
        statusCode:200
      }
    } catch (error) {
      const {message,statusCode,errors}=validationError(error)
      fs.unlinkSync(pathImage)
      return {
        message:message,
        statusCode:statusCode,
        errors:errors
      }
    }
  },
  deleteImage: async (imageId) => {
    try {
      return await imagesTable.destroy({
        where: {
          id: imageId,
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
