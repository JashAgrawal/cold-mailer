import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'MailMaster - Email Marketing & Cold Outreach Platform';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom, #ffffff, #f5f5f5)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: 16 }}
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #000000, #333333)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            MailMaster
          </h1>
        </div>
        <p
          style={{
            fontSize: 32,
            textAlign: 'center',
            maxWidth: 800,
            color: '#333',
            marginBottom: 32,
          }}
        >
          Email Marketing & Cold Outreach Platform
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            marginTop: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              borderRadius: 8,
              background: '#000',
              color: '#fff',
            }}
          >
            <span style={{ marginRight: 8 }}>✓</span>
            <span>Personalized Templates</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              borderRadius: 8,
              background: '#000',
              color: '#fff',
            }}
          >
            <span style={{ marginRight: 8 }}>✓</span>
            <span>Email Tracking</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              borderRadius: 8,
              background: '#000',
              color: '#fff',
            }}
          >
            <span style={{ marginRight: 8 }}>✓</span>
            <span>Campaign Analytics</span>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            fontSize: 24,
            color: '#666',
          }}
        >
          mailer.jashagrawal.in
        </div>
      </div>
    ),
    { ...size }
  );
}
