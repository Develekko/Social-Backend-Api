import axios from 'axios';
import moment from 'moment';
import UAParser from 'ua-parser-js';

  const userInfo = async (req, res, next) => {
    let parser = new UAParser(req.headers["user-agent"]).getResult();
    const userInfo = {
      device: parser.device.type,
      browser: parser.browser.name,
      osName: parser.os.name,
      osVersion: parser.os.version,
      Time:moment().format('MMMM Do YYYY, h:mm:ss a'),
      other: parser.ua,
    };
  
    if (
      (parser.os.name == "Windows" ||
        parser.os.name == "macOS" ||
        parser.os.name == "Linux") &&
      !userInfo.device
    ) {
      userInfo.device = "Pc";
    }
    if (!parser.os.version) {
      userInfo.device = undefined;
      userInfo.browser = undefined;
      userInfo.osName = undefined;
    } else {
      userInfo.other = undefined;
    }
    req.userInfo = JSON.parse(JSON.stringify(userInfo));
    req.userInternetData = await axios.get(process.env.INTERNET_INFO).then(res=>res.data)
    return next()
  };
  export default userInfo;
