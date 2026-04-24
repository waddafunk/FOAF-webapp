# FOAF — Friends of a Friend

Static landing page for the FOAF Milano event waitlist.

## Architecture

Single `index.html` deployed on Netlify. No build step, no framework.

```
webapp/
├── index.html                      # Entire site
├── netlify.toml                    # Netlify publish config
├── emailjs-template.html           # Subscriber confirmation email (copy-paste into EmailJS)
└── emailjs-template-internal.html  # Internal notification email (copy-paste into EmailJS)
```

## Form flow

1. User fills the waitlist form and submits
2. **Netlify Forms** captures the submission (visible in the Netlify dashboard)
3. **EmailJS** fires two emails in parallel:
   - Confirmation email → subscriber
   - Notification email → FOAF inbox

## EmailJS setup

Service: Gmail connected via EmailJS dashboard (`service_g9zi3ve`)

| Template | ID | Purpose |
|---|---|---|
| Subscriber confirmation | `template_i8fnqao` | Sent to the person who signed up |
| Internal notification | `template_e941oi9` | Sent to the FOAF inbox |

The public key and service/template IDs are embedded in `index.html`. EmailJS restricts usage by domain so the public key being client-side is acceptable.

To update a template, edit the corresponding HTML file and re-paste it into the EmailJS dashboard.

## Deployment

Hosted on Netlify at `foaf.netlify.app`. Deploys automatically on every push to `main`.

To connect a custom domain: Netlify dashboard → Domain management → Add custom domain.
