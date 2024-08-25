const cron = require('node-cron');
const { exec } = require('child_process');
const batFilePath = `C:\\Project\\koreanair-front-guide\\docs\\bat\\css-start.bat`;

// * * 1 * * * : 1시간
// 30 * * * * * : 30초

cron.schedule('* * 1 * * *', () => {
  exec(`start cmd /c ${batFilePath}`, (err, stdout) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
});
