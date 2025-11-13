const formData = require("form-data");
const Mailgun = require("mailgun.js");
const fs = require("fs");
const Handlebars = require("handlebars");
const path = require("path");

const MAILGUN_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;

const mailgun = new Mailgun(formData);

// Solo crear cliente si hay clave válida
let mg = null;
if (MAILGUN_KEY) {
  mg = mailgun.client({
    username: "api",
    key: MAILGUN_KEY,
  });
} else {
  console.warn("⚠️ Mailgun desactivado: falta MAILGUN_API_KEY en el entorno.");
}

const sendWelcomeEmail = async (user) => {
  if (!mg || !MAILGUN_DOMAIN) {
    console.log("📨 Email simulado (Mailgun inactivo):", {
      to: user.email,
      subject: "Bienvenido a Glotón!",
    });
    return;
  }

  const emailData = {
    from: "Glotón <no-reply@gloton.com>",
    to: user.email,
    subject: "Bienvenido a Glotón!",
  };

  try {
    const templatePath = path.resolve(
      __dirname,
      "email-service/templates/welcome.handlebars"
    );

    const templateContent = fs.readFileSync(templatePath, "utf-8");
    const template = Handlebars.compile(templateContent);

    emailData.html = template({ user });

    await mg.messages.create(MAILGUN_DOMAIN, emailData);
    console.log("📨 Email enviado correctamente a:", user.email);
  } catch (error) {
    console.error("❌ Error enviando email:", error);
  }
};

module.exports = {
  sendWelcomeEmail,
};
