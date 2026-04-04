const CONTACT_EMAIL = "hadrianrangga8@gmail.com"

// This can be overridden with an obfuscated FormSubmit endpoint in production if needed.
const CONTACT_FORM_ENDPOINT =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
  `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

const buildPayload = ({ name, email, message, formUrl }) => ({
  name: name.trim(),
  email: email.trim(),
  message: message.trim(),
  _subject: `Portfolio message from ${name.trim()}`,
  _template: "table",
  _captcha: "false",
  _replyto: email.trim(),
  _url: formUrl,
})

export const contactEmail = CONTACT_EMAIL

export const sendContactMessage = async ({ name, email, message, formUrl }) => {
  const response = await fetch(CONTACT_FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(buildPayload({ name, email, message, formUrl })),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Failed to send message.")
  }

  return data
}
