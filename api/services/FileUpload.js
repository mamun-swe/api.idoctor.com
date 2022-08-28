// let cloudinary = require('cloudinary').v2

// cloudinary.config({
//     cloud_name: 'colour-bangla',
//     api_key: '684927273367872',
//     api_secret: 'GDQhFIJhHXabuF0jOPqkMijkSkk'
// })

// Single File Upload function
const fileUpload = (file, uploadPath) => {
    // Get file extension from filename
    const extension = file.name.split('.')[1]
    // Rename file with datetime format
    const filename = 'profile_' + Date.now() + '.' + extension
    // Upload path
    path = uploadPath + filename
    // Move file to path
    const moveFile = file.mv(path)
    // const moveFile = cloudinary.uploader.upload(`http://res.cloudinary.com/demo/image/upload/${filename}`, function (error, result) {
    //     console.log(result, error)
    // });

    if (!moveFile) {
        return res.status(501).json({ message: 'file upload error' })
    }

    console.log(moveFile);
    return filename
}

module.exports = {
    fileUpload
}