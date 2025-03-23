import { getReceiver, updateReceiver } from '@/db/server-env/recivers';
import { getTemplate, updateTemplate } from '@/db/server-env/templates';
import { Timestamp } from 'firebase-admin/firestore';
import { NextRequest } from 'next/server';

// Bot detection regex
const botUserAgents = /googlebot|bingbot|yandex|baidu|mail\.ru|outlook|apple|bot|crawler|spider|robot/i;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reciverId = searchParams.get('reciverId');

    if (!reciverId) {
      return new Response('Missing reciverId', { status: 400 });
    }

    const userAgent = req.headers.get('user-agent') || '';
    const isBot = botUserAgents.test(userAgent);

    if (isBot) {
      console.log(`🤖 Bot detected for emailId: ${reciverId}, skipping tracking.`);
      return sendTransparentPixel();
    }

    console.log(`✅ Email with ID ${reciverId} was opened at ${new Date().toISOString()}`);

    const receiver = await getReceiver(reciverId);
    if (!receiver) {
      return new Response(JSON.stringify({ message: 'Receiver not found' }), { status: 404 });
    }

    const template = await getTemplate(receiver.templateId);
    if (!template) {
      return new Response(JSON.stringify({ message: 'Template not found' }), { status: 404 });
    }

    // Update receiver and template data
    await updateReceiver(reciverId, { 
      openedAt: Timestamp.now().toDate(),
      openedCount: (receiver.openedCount || 0) + 1 
    });

    await updateTemplate(template.id || '', { 
      openedCount: (template.openedCount || 0) + 1 
    });

    return sendTransparentPixel();
  } catch (error) {
    console.error('Error in email tracking:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

// Utility to send a transparent 1x1 pixel
function sendTransparentPixel() {
  const transparentPixel = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
    'base64'
  );

  return new Response(transparentPixel, {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Content-Length': transparentPixel.length.toString(),
    },
  });
}
