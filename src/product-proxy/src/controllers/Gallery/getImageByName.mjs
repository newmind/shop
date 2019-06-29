'use strict';

import path from "path";
import fs from "fs";

export default () => async (ctx) => {

  const { fileName } = ctx['params'];
  const filePath = path.resolve('files', fileName);

  ctx.res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Content-Disposition": "attachment; filename=" + fileName,
  });

  if (fs.existsSync(filePath)) {
    ctx.body = fs.createReadStream(filePath);
  } else {
    ctx.throw(404, 'Not found');
    ctx.body = null;
  }
};
