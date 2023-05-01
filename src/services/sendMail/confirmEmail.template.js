export const confirmEmail = ({name,confirmLink,requestNewLink}={})=>{
    return `
    <head>
    <title></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
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
      @media only screen and (max-width: 480px) {
        @-ms-viewport {
          width: 320px;
        }
        @viewport {
          width: 320px;
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
                      font-size: 36px;
                      font-weight: 600;
                      line-height: 36px;
                      text-align: center;
                    "
                  >
                    Welcome to the Board!
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
                                  font-family: Whitney, Helvetica Neue, Helvetica,
                                    Arial, Lucida Grande, sans-serif;
                                  font-weight: 500;
                                  font-size: 20px;
                                  color: #4f545c;
                                  letter-spacing: 0.27px;
                                "
                              >
                                Hey ${name},
                              </h2>
                              <p>
                                Wowwee! Thanks for registering an account with
                                Us! You're the coolest person in all the land
                                (and I've met a lot of really cool people).
                              </p>
                              <p>
                                Before we get started, we'll need to verify your
                                email.
                              </p>
                              <p>
                                This Link only valid for the next 24
                                hours.
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
                                      href="${confirmLink}"
                                      style="
                                        text-decoration: none;
                                        line-height: 100%;
                                        background: #7289da;
                                        color: white;
                                        font-family: Ubuntu, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 15px;
                                        font-weight: normal;
                                        text-transform: none;
                                        margin: 0px;
                                      "
                                      target="_blank"
                                    >
                                      Verify Email
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <br>
    
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
                                      href="${requestNewLink}"
                                      style="
                                        text-decoration: none;
                                        line-height: 100%;
                                        background: #7289da;
                                        color: white;
                                        font-family: Ubuntu, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 15px;
                                        font-weight: normal;
                                        text-transform: none;
                                        margin: 0px;
                                      "
                                      target="_blank"
                                    >
                                      Request New Email
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
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