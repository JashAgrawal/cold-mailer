// export const subject = `Empowering Local Stores - Let's Build Dukaan Pe Together`
// export const emailTemplate = `Hi [Investor Name],

// I hope you're well. I'm Jash Agrawal, the founder of Dukaan Pe—a platform born out of genuine passion to transform how local businesses connect with their communities. I've seen firsthand the struggles local stores face in reaching their customers, and I believe Dukaan Pe can change that narrative.

// Here's what makes us different:

// • A Purpose-Driven Vision: We're not just another marketplace. Dukaan Pe is designed to empower local entrepreneurs, preserving the charm of neighborhood shops while boosting their digital presence.
// • Real Market Opportunity: With consumers increasingly valuing authentic, hyperlocal experiences, our platform is perfectly positioned to capture this growing demand.
// • A Genuine Connection: We focus on crafting a simple, distraction-free digital space where every local business can tell its unique story—something I believe resonates deeply with communities.

// I'm incredibly passionate about supporting local commerce and would love to share more about how Dukaan Pe is set to reshape the landscape for neighborhood stores. Could we schedule a call next week to discuss how you can be part of this exciting journey?

// Thank you for considering this opportunity.

// Warm regards,

// Jash Agrawal
// Founder & CEO, Dukaan Pe
// +91 7021280686 | agrawaljash99@gmail.com
// https://jashagrawal.in/linkedin | https://jashagrawal.in`

export function extractVariables(str: string) {
    const regex = /\[([^\]]+)\]/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(str)) !== null) {
      matches.push(match[1]);
    }
    
    return matches;
}
// export const emailVariables = extractVariables(emailTemplate);

export const getEmailContent = (content: string,variables: string) => {
    let emailContent = content;
    if(variables === ""){
        return emailContent;
    }
    
    const variablesObj: Record<string, string> = JSON.parse(variables);

   Object.entries(variablesObj).forEach(([key, value]) => {
    emailContent = emailContent.replace(`[${key}]`, value);
   });
   
   console.log(emailContent);

   return emailContent; 
}