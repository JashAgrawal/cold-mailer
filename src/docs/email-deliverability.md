# Email Deliverability Guide

This document provides guidance on how to maximize email deliverability and avoid spam filters with MailMaster.

## Technical Setup (DNS Configuration)

For optimal deliverability, configure these DNS records for your sending domain:

### SPF (Sender Policy Framework)

SPF specifies which mail servers are authorized to send email on behalf of your domain.

```
v=spf1 include:_spf.google.com ~all
```

### DKIM (DomainKeys Identified Mail)

DKIM adds a digital signature to your emails that verifies they haven't been tampered with.

1. Generate a public/private key pair
2. Add the public key to your DNS records
3. Configure your email service to sign emails with the private key

Example DKIM record:
```
v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrLHiExVd55zd/IQ/J/mRwSRMAocV/hMB3jXwaHH36d9NaVynQFYV8NaWi69c1veUtRzGt7yAioXqLj7Z4TeEUoOLgrKsn8YnckGs9i3B3tVFB+Ch/4mPhXWiNfNdynHWBcPcbJ8kjEQ2U8y78dHZj1YeRXXVvWob2OaKynO8/lQIDAQAB;
```

### DMARC (Domain-based Message Authentication, Reporting & Conformance)

DMARC builds on SPF and DKIM to provide clear instructions on how to handle authentication failures.

Example DMARC record:
```
v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc@yourdomain.com
```

## Email Content Best Practices

### Subject Lines

- Keep subject lines under 50 characters
- Avoid ALL CAPS and excessive punctuation (!!!)
- Avoid spam trigger words like "free", "guarantee", "no obligation", etc.
- Be specific and relevant to the content
- Personalize when possible (but don't overdo it)

### Email Body

- Maintain a good text-to-HTML ratio (aim for at least 60% text)
- Avoid excessive images or large images
- Don't use URL shorteners in links
- Limit the number of links (ideally fewer than 10)
- Include a plain text version of your email
- Use a clear, recognizable sender name
- Include a physical address and unsubscribe link
- Avoid excessive formatting, colors, or fonts
- Test your emails with spam checkers before sending

### Technical Considerations

- Send from a consistent IP address
- Warm up new IP addresses gradually
- Authenticate your emails with SPF, DKIM, and DMARC
- Use a reputable email service provider
- Monitor your sender reputation
- Clean your email list regularly
- Handle bounces and complaints promptly

## Avoiding Common Spam Triggers

### Words to Avoid in Subject Lines

- "Free"
- "Guarantee"
- "No obligation"
- "Winner"
- "Congratulations"
- "Urgent"
- "Act now"
- "Limited time"
- "Cash"
- "Credit"
- "Discount"
- "Save"
- "Money"
- "Price"
- "No cost"
- "Risk free"
- "100%"
- "Affordable"
- "Bargain"
- "Best price"
- "Bonus"
- "Cheap"
- "Deal"
- "Double your"
- "Earn"
- "Eliminate debt"
- "Extra cash"
- "Fast cash"
- "Financial freedom"
- "Free gift"
- "Free trial"
- "Full refund"
- "Get out of debt"
- "Guaranteed"
- "Increase sales"
- "Investment"
- "Lowest price"
- "Money back"
- "No catch"
- "No fees"
- "No hidden costs"
- "No purchase necessary"
- "Opportunity"
- "Order now"
- "Prize"
- "Promise"
- "Sale"
- "Save big money"
- "Unlimited"
- "Win"
- "Winner"

### Formatting to Avoid

- Excessive exclamation marks (!!!)
- ALL CAPS TEXT
- Bright red or green text
- Very large font sizes
- Excessive bold or italics
- Too many images
- Image-only emails
- Misleading subject lines
- Attachments (especially .zip, .exe, or .bat files)
- Excessive HTML code
- Invisible text (text the same color as background)
- Excessive use of symbols ($, %, &, etc.)

## Monitoring Deliverability

- Track open rates and click rates
- Monitor bounce rates
- Check spam complaint rates
- Use email deliverability testing tools
- Set up DMARC reporting
- Monitor sender reputation

## Resources

- [Google Postmaster Tools](https://postmaster.google.com/)
- [Microsoft SNDS](https://sendersupport.olc.protection.outlook.com/snds/)
- [Mail-Tester](https://www.mail-tester.com/)
- [MXToolbox](https://mxtoolbox.com/)
- [DMARC Analyzer](https://www.dmarcanalyzer.com/)
