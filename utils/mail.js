const nodemailer = require("nodemailer");

class MailUtils {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      pool: true,
      port: 2525,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: "thinh221201@gmail.com",
        pass: "6ADA59F88449B1CC7CF64CD188E8116AA522",
      },
    });
  }

  static getInstance() {
    if (!MailUtils.instance) {
      MailUtils.instance = new MailUtils();
    }
    return MailUtils.instance;
  }

  async sendMail(options) {
    const mailOptions = {
      from: "thinh.reply.local@gmail.com",
      to: options.to,
      subject: options.subject,
      html: options.html,
    };
    await this.transporter.sendMail(mailOptions);
  }

  async sendMailInfor(email, subjectContact, message) {
    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <!--[if gte mso 9]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG />
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <title></title>
    
        <style type="text/css">
          @media only screen and (min-width: 720px) {
            .u-row {
              width: 700px !important;
            }
            .u-row .u-col {
              vertical-align: top;
            }
    
            .u-row .u-col-100 {
              width: 700px !important;
            }
          }
    
          @media (max-width: 720px) {
            .u-row-container {
              max-width: 100% !important;
              padding-left: 0px !important;
              padding-right: 0px !important;
            }
            .u-row .u-col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
            }
            .u-row {
              width: 100% !important;
            }
            .u-col {
              width: 100% !important;
            }
            .u-col > div {
              margin: 0 auto;
            }
          }
          body {
            margin: 0;
            padding: 0;
          }
    
          table,
          tr,
          td {
            vertical-align: top;
            border-collapse: collapse;
          }
    
          p {
            margin: 0;
          }
    
          .ie-container table,
          .mso-container table {
            table-layout: fixed;
          }
    
          * {
            line-height: inherit;
          }
    
          a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
          }
    
          table,
          td {
            color: #ffffff;
          }
          @media (max-width: 480px) {
            #u_content_image_1 .v-src-width {
              width: auto !important;
            }
            #u_content_image_1 .v-src-max-width {
              max-width: 20% !important;
            }
            #u_content_heading_1 .v-font-size {
              font-size: 45px !important;
            }
            #u_content_text_4 .v-font-size {
              font-size: 18px !important;
            }
            #u_content_text_4 .v-line-height {
              line-height: 140% !important;
            }
            #u_content_text_7 .v-font-size {
              font-size: 18px !important;
            }
            #u_content_text_6 .v-font-size {
              font-size: 18px !important;
            }
          }
        </style>
      </head>
    
      <body
        class="clean-body u_body"
        style="
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          background-color: #000000;
          color: #ffffff;
        "
      >
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table
          style="
            border-collapse: collapse;
            table-layout: fixed;
            border-spacing: 0;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            vertical-align: top;
            min-width: 320px;
            margin: 0 auto;
            background-color: #000000;
            width: 100%;
          "
          cellpadding="0"
          cellspacing="0"
        >
          <tbody>
            <tr style="vertical-align: top">
              <td
                style="
                  word-break: break-word;
                  border-collapse: collapse !important;
                  vertical-align: top;
                "
              >
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #000000;"><![endif]-->
    
                <div class="u-row-container" style="padding: 0px; background-color: transparent">
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 700px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: transparent;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        height: 100%;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px;"><tr style="background-color: transparent;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="700" style="width: 700px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 700px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="height: 100%; width: 100% !important">
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              box-sizing: border-box;
                              height: 100%;
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          ><!--<![endif]-->
                            <table
                              id="u_content_image_1"
                              style="font-family: helvetica, sans-serif"
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
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 10px 10px 0px;
                                      font-family: helvetica, sans-serif;
                                    "
                                    align="left"
                                  >
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td
                                          style="padding-right: 0px; padding-left: 0px"
                                          align="center"
                                        >
                                          <img
                                            align="center"
                                            border="0"
                                            src="https://assets.unlayer.com/stock-templates1683693165037-logo.png"
                                            alt=""
                                            title=""
                                            style="
                                              outline: none;
                                              text-decoration: none;
                                              -ms-interpolation-mode: bicubic;
                                              clear: both;
                                              display: inline-block !important;
                                              border: none;
                                              height: auto;
                                              float: none;
                                              width: 15%;
                                              max-width: 102px;
                                            "
                                            width="102"
                                            class="v-src-width v-src-max-width"
                                          />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <table
                              id="u_content_heading_1"
                              style="font-family: helvetica, sans-serif"
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
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 0px;
                                      font-family: helvetica, sans-serif;
                                    "
                                    align="left"
                                  >
                                    <h1
                                      class="v-line-height v-font-size"
                                      style="
                                        margin: 0px;
                                        color: #ffffff;
                                        line-height: 140%;
                                        text-align: center;
                                        word-wrap: break-word;
                                        font-size: 48px;
                                        font-weight: 400;
                                      "
                                    >
                                      Contact Mail
                                    </h1>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 15px 15px 70px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 700px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: transparent;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        height: 100%;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 15px 15px 70px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px;"><tr style="background-color: transparent;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="700" style="width: 700px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 700px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div
                          style="
                            height: 100%;
                            width: 100% !important;
                            border-radius: 0px;
                            -webkit-border-radius: 0px;
                            -moz-border-radius: 0px;
                          "
                        >
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              box-sizing: border-box;
                              height: 100%;
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                              border-radius: 0px;
                              -webkit-border-radius: 0px;
                              -moz-border-radius: 0px;
                            "
                          ><!--<![endif]-->
                            <table
                              id="u_content_text_4"
                              style="font-family: helvetica, sans-serif"
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
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 10px;
                                      font-family: helvetica, sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      class="v-line-height v-font-size"
                                      style="
                                        font-size: 21px;
                                        font-weight: 700;
                                        color: #9d9d9d;
                                        line-height: 140%;
                                        text-align: center;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p style="line-height: 140%">
                                        Email: ${email}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <table
                              id="u_content_text_7"
                              style="font-family: helvetica, sans-serif"
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
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 10px;
                                      font-family: helvetica, sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      class="v-line-height v-font-size"
                                      style="
                                        font-size: 21px;
                                        font-weight: 700;
                                        color: #9d9d9d;
                                        line-height: 140%;
                                        text-align: center;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p style="line-height: 140%">
                                        subject: ${subjectContact}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <table
                              id="u_content_text_6"
                              style="font-family: helvetica, sans-serif"
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
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 10px;
                                      font-family: helvetica, sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      class="v-line-height v-font-size"
                                      style="
                                        font-size: 21px;
                                        font-weight: 700;
                                        color: #9d9d9d;
                                        line-height: 140%;
                                        text-align: center;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p style="line-height: 140%">
                                        Message: ${message}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
      </body>
    </html>`;
    const subject = "New contact";

    const mailer = await this.sendMail({
      to: "thinh221201@gmail.com",
      subject,
      html,
    });
    return mailer;
  }
}

module.exports = MailUtils;
