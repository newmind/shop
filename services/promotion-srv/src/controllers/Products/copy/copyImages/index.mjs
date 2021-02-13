
import request from "@sys.packages/request";


export default async function saveImages(files) {
  return new Promise(async (resolve) => {
    const fileIDs = [];

    if ( ! Object.keys(files).length) {
      resolve(fileIDs);
    }

    for (let key in files) {
      if (files.hasOwnProperty(key)) {
        const file = files[key];

        const { data } = await request({
          url: process.env['GALLERY_API_SRV'] + '/images/' + file['uuid'] + '/copy',
          method: 'post',
        });

        fileIDs.push({ uuid: data, order: file['order'] });
      }
    }

    resolve(fileIDs);
  });
};
