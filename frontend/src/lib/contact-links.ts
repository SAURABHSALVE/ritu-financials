export const UPI_ID = '9021357314@ptaxis';
export const WHATSAPP_PHONE = '919284223699';
export const TELEGRAM_USERNAME = 'rithuusalve';

export const ENROLL_MESSAGES = {
  reserve:
    "Hi Rithuu! 🙌 I've paid ₹2,000 to RESERVE my seat for the JUNE FX:Rich Forex Mastery batch (starts 8 June 2026).\n\nUPI paid to: 9021357314@ptaxis\n\nSending my payment screenshot now — please confirm my enrollment! 🚀",
  info:
    "Hi Rithuu! 👋 I want FULL DETAILS on the JUNE Online Forex Mastery batch (starts 8 June 2026).\n\nPlease share fees, schedule & what's included. Only 10 seats — I'm serious about joining! 📈",
  question:
    'Hi Rithuu! I have a question about the June 2026 FX:Rich mentorship batch before I enroll. 🤝',
} as const;

export type EnrollMessageKey = keyof typeof ENROLL_MESSAGES;

export function whatsappUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export function telegramUrl(text: string): string {
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(text)}`;
}

export function enrollLinks(key: EnrollMessageKey) {
  const text = ENROLL_MESSAGES[key];
  return { whatsapp: whatsappUrl(text), telegram: telegramUrl(text) };
}

/** Default CTA — course info */
export const WHATSAPP_DEFAULT = enrollLinks('info').whatsapp;
export const TELEGRAM_DEFAULT = enrollLinks('info').telegram;
