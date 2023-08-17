const postsTable = require('../../models/index').posts
const imagesTable = require('../../models/index').images
module.exports = {
    addPostBindMenu: async (req, pathName) => {
        try {
            const {post} = req.body
            const imageResult = await imagesTable.create({
                name: post.title,
                path: pathName
            })
            return await postsTable.create({
                title: post.title,
                content: post.content,
                imageId: imageResult.id,
                postOtherImages: []
            })
        } catch (e) {
            console.log(e)
            return e
        }
    }
}