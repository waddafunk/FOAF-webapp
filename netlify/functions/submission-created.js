exports.handler = async (event) => {
  const { RESEND_API_KEY, FROM_EMAIL } = process.env;
  const payload = JSON.parse(event.body).payload;
  const data = payload.data;

  const nome = data.nome || '';
  const email = data.email;
  if (!email) return { statusCode: 400, body: 'No email' };

  const amicoNome = data['amico-nome'];
  const amicoLine = amicoNome
    ? `<p>Abbiamo preso nota anche del tuo +1 <strong>${amicoNome} ${data['amico-cognome'] || ''}</strong> — li contatteremo insieme a te.</p>`
    : '';

  const html = `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#1a0a0a;font-family:Georgia,serif;color:#f5efe0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a0a0a;padding:48px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#231010;border-radius:12px;padding:48px 40px;">
        <tr><td>
          <p style="font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#c8a96e;margin:0 0 24px;">Friends of a Friend</p>
          <h1 style="font-size:28px;margin:0 0 24px;color:#f5efe0;">Ci vediamo presto${nome ? `, ${nome}` : ''}.</h1>
          <p style="font-size:16px;line-height:1.7;color:#d4c5a9;">
            Sei nella lista FOAF. Ti scriveremo appena apriamo i posti per il prossimo evento a Milano.
          </p>
          ${amicoLine}
          <p style="font-size:16px;line-height:1.7;color:#d4c5a9;">
            Nel frattempo, porta già in mente il tuo +1. I tavoli FOAF sono pensati per incontrarsi davvero — niente networking, solo persone genuine.
          </p>
          <p style="font-size:13px;color:#8a7a6a;margin-top:40px;border-top:1px solid #3a2020;padding-top:24px;">
            FOAF · Milano · <a href="https://foaf.it" style="color:#c8a96e;">foaf.it</a><br/>
            Hai ricevuto questa email perché ti sei iscritto alla lista d'attesa FOAF.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL || 'FOAF <noreply@foaf.it>',
      to: email,
      subject: 'Sei nella lista FOAF ✦',
      html,
    }),
  });

  return { statusCode: 200, body: 'ok' };
};
