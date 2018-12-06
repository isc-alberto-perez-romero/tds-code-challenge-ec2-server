'use strict';

const fs = require('fs');
const sharp = require ('sharp');
const path = require('path');

/**
* Function that resizes an image and pipes it into a Sharp transform object.
*
* As described, this makes use of the sharp module, which is
* platform-dependent. A Linux version was used in this project because the
* servers and Lambda function that will host this service are expected to
* be Linux machines.
*
* @author Alberto Pérez Romero.
* @param {string} imagePath The image path for the file to be resized.
* @param {string} format The image format. Expected formats would be: png,
*													jpg, jpeg, and gif.
* @param {number} width The width at which the image will be resized.
* @param {number} height The height at which the image will be resized.
* @param {function} callback A function to be called once the resizing is done.
* @returns The callback function with null as the first parameter, and the
*						resized image's data as the second.
*/
const resizeImage = (imagePath, format, width, height, callback) => {
	//console.log('path='+path.resolve(__dirname, imagePath));
	//console.log('imagePath upon resizing='+imagePath);
	const readStream = fs.createReadStream(path.resolve(__dirname, imagePath));
	let transform = sharp();

	if(format){
		transform = transform.toFormat(format);
	}

	if(width || height){
		transform = transform.resize(width, height);
	}

	return callback(null, readStream.pipe(transform));
};

/**
* Function that resizes an image and saves it into a file.
*
* This makes use of the sharp module, which is platform-dependent. A Linux
* version was used in this project because the servers and Lambda function
* that will host this service are expected to be (or behave like) Linux
* machines.
*
* @author Alberto Pérez Romero.
* @param {string} srcPath The image path for the file to be resized.
* @param {number} width The width at which the image will be resized.
* @param {number} height The height at which the image will be resized.
* @param {string} dstPath The destination path where the resized image will
*														be saved.
* @param {function} callback A function to be called once the resizing is done.
* @returns The callback function with null as the first parameter, and the
*						resized image's path location as a String, as the second. Or, if
*						an error happens, the callback receives the error as the first
*						parameter.
*/
const resizeAndSaveImage = (srcPath, width, height, dstPath, callback) => {
	sharp(srcPath)
		.resize(width, height)
		.toFile(dstPath, (err)=>{
			if(err){
				callback(err);
			}
			//console.log('Image resized!');
			return callback(null, dstPath);
		});
};

module.exports = {
	resizeImage,
	resizeAndSaveImage
};
