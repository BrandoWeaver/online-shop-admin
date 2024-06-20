import imageCompression from 'browser-image-compression';

async function CompressImage(imgFile: File) {
  // console.log('before compress', imgFile);
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    let compressedFile = await imageCompression(imgFile, options);
    compressedFile = new File([compressedFile], imgFile.name, {
      type: imgFile.type,
      lastModified: Date.now(),
    });
    // console.log('after compress', compressedFile);

    return compressedFile;
  } catch (error) {
    // console.log('CompressImage error:', error);
    return imgFile;
  }
}

export { CompressImage };
