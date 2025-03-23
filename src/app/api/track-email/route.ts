import { getReceiver, updateReceiver } from "@/db/server-env/recivers";
import { getTemplate, updateTemplate } from "@/db/server-env/templates";
import { Timestamp } from "firebase-admin/firestore";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest) {
    const { searchParams } = new URL(req.url);
    console.log("called");
    const reciverId = searchParams.get('reciverId');
  
    if (!reciverId) {
      return new Response('Missing reciverId', { status: 400 });
    }
  
    console.log(`✅ Email with ID ${reciverId} was opened at ${new Date().toISOString()}`);
    const reciver = await getReceiver(reciverId);

    if(!reciver){
        return Response.json({message:"Reciver Not found"}, {status: 404});
    }
    const template = await getTemplate(reciver.templateId);

    if(!template){
        return Response.json({message:"Template Not found"}, {status: 404});
    }

    await updateReceiver(reciverId, { openedAt: Timestamp.now().toDate() , openedCount: reciver.openedCount + 1 });
    await updateTemplate((template.id || ""), { openedCount: template.openedCount + 1 });
    // Optionally store tracking data in a database like Supabase
    // await saveEmailOpen(emailId);
  
    // Send a transparent 1x1 pixel
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
  