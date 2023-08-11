const dotenv = require("dotenv");
const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs").promises; // Use fs.promises for Promise-based operations
const nodemailer = require("nodemailer");
const { ProdMailerTransport } = require("./mailer.config");

dotenv.config();

class Mailer {
  constructor() {
    this.transporter = null;
  }

  async setTransporter() {
    const transport = await ProdMailerTransport();
    this.transporter = nodemailer.createTransport(transport);
  }

  async sendEmail(mail) {
    if (!this.transporter) {
      await this.setTransporter();
    }
    const response = await this.transporter.sendMail(mail);
    console.log(response);
    return response;
  }

  async renderHtml(data, templateName) {
    const pathName = path.join(
      __dirname,
      `../../templates/emails/${templateName}`
    );
    try {
      const html = await this.handleReadFile(pathName);
      const template = handlebars.compile(html);
      const htmlToSend = template(data);

      if (!htmlToSend) {
        throw new Error("Unable to render data to template");
      }

      return htmlToSend;
    } catch (error) {
      throw error;
    }
  }

  async handleReadFile(path) {
    try {
      const html = await fs.readFile(path, { encoding: "utf-8" });
      return html;
    } catch (error) {
      throw error;
    }
  }
}

const mail = new Mailer();

module.exports = mail;
