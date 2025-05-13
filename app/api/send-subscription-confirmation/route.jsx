import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { email, selectedPlan } = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'AIQuestify <noreply@resend.dev>',
      to: [email],
      subject: 'Your Subscription is Confirmed',
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4F46E5;">🎉 Subscription Confirmed</h2>
        <p>Hi there,</p>
        <p>We're excited to let you know that your subscription to the <strong>${selectedPlan}</strong> plan has been successfully activated.</p>
        <p>You now have access to all premium features. Dive in and make the most of your experience with AIQuestify.</p>
        <p>If you have any questions or need support, feel free to reach out to us anytime.</p>
        <p style="margin-top: 2rem;">Best regards,<br><strong>The AIQuestify Team.J</strong></p>
      </div>
    `,    
    });

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Email failed to send.' }), { status: 500 });
  }
}
