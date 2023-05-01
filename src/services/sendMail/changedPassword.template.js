export const changePassword = ({name,userinfo,userInternetData}={})=>{
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
                   Your password changed successfully!
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
                               You have successfully changed your password. You will need to use your new password from now on
                             </p>
                             <p>
                             If this wasn't done by you, please immediately reset the password to your account following the steps in this link: <a style="color:#3B76D6;font-weight:700" target="_blank" href="https://codepen.io/develekko/full/oNPpzRb">Reset Password</a>
                             </p>
                           </div>
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
                             <p>
                               For security, this request was received from a
                               <b
                                 >${userinfo.other?userinfo.other:userinfo.osName
                                 + userinfo.osVersion +
                                 userinfo.device?userinfo.device:null} </b
                               >
                               <br>
                                ${userInternetData?
                                 '<b>ip_address :</b>'+userInternetData.ip_address + '<br>' +
                                 '<b>region :</b>'+userInternetData.city+'/'+userInternetData.country + ' &nbsp; ' + ' <img width = 25 src='+userInternetData?.flag?.png+'>' + '<br>'+
                                 '<b>ISP :</b>'+userInternetData.connection.isp_name
                                 :null}
                               <br>
                               at <b>${userinfo.Time}</b>.
                             </p>
                             <h4>Thanks,<br>
                             <a style="color:#1A548F;text-decoration-line: none;font-weight:700" target="_blank" href="https://www.facebook.com/Routelearning">Route Academy</a></h4>
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