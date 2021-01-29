
import request from "@sys.packages/request";


export default async function saveImages(files) {
  return new Promise(async (resolve) => {
    const fileIDs = [];

    if ( ! Object.keys(files).length) {
      resolve(fileIDs);
    }

    for (let key in files) {
      if (files.hasOwnProperty(key)) {
        const fileBuffer = files[key]['buffer'];

        const { data } = await request({
          url: process.env['GALLERY_API_SRV'] + '/images',
          method: 'post',
          headers: {
            'Content-type': 'application/octet-stream',
          },
          data: fileBuffer,
        });

        fileIDs.push(data);
      }
    }

    resolve(fileIDs);
  });
};
