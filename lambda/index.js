const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
exports.handler = async function(event, context) {
    console.log(JSON.stringify(event));
    let data
    try {
        if(event.isBase64Encoded) {
            event.body = atob(event.body)
        }
        data = JSON.parse(event.body);
    } catch (error) {
        data = {}
    }
    
    if(!data.name || !data.email || !data.message) {
        return {
            statusCode: '400',
            body: 'Bad data',
        }
    }
    const msg = {
        to: 'info@gorilly.digital',
        from: 'website@gorilly.digital',
        subject: 'Website Inquiry',
        // text: '',
        html: `name: ${data.name}<br />
email: ${data.email}<br />
message: ${data.message}<br />
        `,
    }
    await sgMail.send(msg)
    return JSON.stringify({message: "success", success: true})
  }