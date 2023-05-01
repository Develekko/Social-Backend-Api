export const recoverAccount = ({name,recoverLink}={})=>{
  return `  
  <head>
  <title></title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link
    href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700"
    rel="stylesheet"
    type="text/css"
  />
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
    html,
    body,
    * {
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    }
    a {
      color: #1eb0f4;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    #outlook a {
      padding: 0;
    }
    .ReadMsgBody {
      width: 100%;
    }
    .ExternalClass {
      width: 100%;
    }
    .ExternalClass * {
      line-height: 100%;
    }
    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table,
    td {
      border-collapse: collapse;
    }
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    p {
      display: block;
      margin: 13px 0;
    }
    @media only screen and (max-width: 600px) {
      @-ms-viewport {
        width: 400px;
      }
      @viewport {
        width: 400px;
      }
    }
    .fixPadding
    {
      padding:40px 10px!important
    }
     @media screen and (max-width: 600px) {
                .otpCode {
                    font-size: 30px!important;
                }
                .fixPadding
                {
                  padding:40px 10px!important
                }
              }
           @media screen and (max-width: 480px) {
                .otpCode {
                    font-size: 25px!important;
                }
              }
                 @media screen and (max-width: 440px) {
                .otpCode {
                    font-size: 20px!important;
                }
              }
                       @media screen and (max-width: 420px) {
                .otpCode {
                    font-size: 15px!important;
                }
              }
                 @media screen and (max-width: 395px) {
                .otpCode {
                    font-size: 10px!important;
                }
                .fixPadding
                {
                  padding:40px 10px!important
                }
              }
    @media only screen and (min-width: 480px) {
      .mj-column-per-100,
      * [aria-labelledby="mj-column-per-100"] {
        width: 100% !important;
      }
    }
  </style>
  </head>
  <body style="background: #f9f9f9">
  <div style="background-color: #f9f9f9">
    <div
      style="
        max-width: 640px;
        margin: 0 auto;
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
      "
    >
      <div
        style="
          margin: 0px auto;
          max-width: 640px;
          background: #7289da
            url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png)
            top center / cover no-repeat;
        "
      >
        <table
          role="presentation"
          cellpadding="0"
          cellspacing="0"
          style="
            font-size: 0px;
            width: 100%;
            background: #7289da
              url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png)
              top center / cover no-repeat;
          "
          align="center"
          border="0"
          background="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png"
        >
          <tbody>
            <tr>
              <td
                style="
                  text-align: center;
                  vertical-align: top;
                  direction: ltr;
                  font-size: 0px;
                  padding: 57px;
                "
              >
                <div
                  style="
                    cursor: auto;
                    color: white;
                    font-family: Whitney, Helvetica Neue, Helvetica, Arial,
                      Lucida Grande, sans-serif;
                    font-size: 30px;
                    font-weight: 600;
                    line-height: 36px;
                    text-align: center;
                  "
                >
                  Account Recovery
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="margin: 0px auto; max-width: 640px; background: #ffffff">
        <table
          role="presentation"
          cellpadding="0"
          cellspacing="0"
          style="font-size: 0px; width: 100%; background: #ffffff"
          align="center"
          border="0"
        >
          <tbody>
            <tr>
              <td
                class="fixPadding"
                style="
                  text-align: center;
                  vertical-align: top;
                  direction: ltr;
                  font-size: 0px;
                  padding: 40px 70px;
                "
              >
                <div
                  aria-labelledby="mj-column-per-100"
                  class="mj-column-per-100 outlook-group-fix"
                  style="
                    vertical-align: top;
                    display: inline-block;
                    direction: ltr;
                    font-size: 13px;
                    text-align: left;
                    width: 100%;
                  "
                >
                  <table
                    role="presentation"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    border="0"
                  >
                    <tbody>
                      <tr>
                        <td
                          style="
                            word-break: break-word;
                            font-size: 0px;
                            padding: 0px 0px 20px;
                          "
                          align="left"
                        >
                          <div
                            style="
                              cursor: auto;
                              color: #737f8d;
                              font-family: Whitney, Helvetica Neue, Helvetica,
                                Arial, Lucida Grande, sans-serif;
                              font-size: 16px;
                              line-height: 24px;
                              text-align: left;
                            "
                          >
                          <h2
                          style="
                            font-family: Whitney, Helvetica Neue,
                              Helvetica, Arial, Lucida Grande, sans-serif;
                            font-weight: 500;
                            font-size: 20px;
                            color: #4f545c;
                            letter-spacing: 0.27px;
                          "
                        >
                          Hey ${name},
                        </h2>
                            <p>
                              You recently requested to recover your account.
                            </p>
                            <p>
                              This Link in button below is only valid for 30 Day , after this period The account
                              will be permanently deleted
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            word-break: break-word;
                            font-size: 0px;
                            padding: 10px 0px;
                          "
                          align="center"
                        >
                          <table
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            style="border-collapse: separate"
                            align="center"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    border: none;
                                    border-radius: 3px;
                                    color: white;
                                    cursor: auto;
                                    padding: 15px 19px;
                                  "
                                  align="center"
                                  valign="middle"
                                  bgcolor="#7289DA"
                                >
                                  <a
                                    class="otpCode"
                                    style="
                                      text-decoration: none;
                                      line-height: 100%;
                                      background: #7289da;
                                      color: white;
                                      font-family: Ubuntu, Helvetica, Arial,
                                        sans-serif;
                                      font-size: 20px;
                                      font-weight: 700;
                                      text-transform: none;
                                      margin: 0px;
                                    "
                                    target="_blank"
                                    href=${recoverLink}
                                  >
                                    Recover Account
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <td
                          style="
                            word-break: break-word;
                            font-size: 0px;
                            padding: 0px 0px 20px;
                          "
                          align="left"
                        >
                          <div
                            style="
                              cursor: auto;
                              color: #737f8d;
                              font-family: Whitney, Helvetica Neue, Helvetica,
                                Arial, Lucida Grande, sans-serif;
                              font-size: 16px;
                              line-height: 24px;
                              text-align: left;
                            "
                          >
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </body>
  `
}