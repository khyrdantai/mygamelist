const {SENDGRID_API_KEY, express, app} = require("../db");
const sgMail = require('@sendgrid/mail');
const email_router = express.Router();

sgMail.setApiKey(SENDGRID_API_KEY);

email_router.post('/sendVerification', (req, res) =>
{
    const msg = {
        to: req.body.email,
        from: 'shafferj2019@knights.ucf.edu',
        templateId: 'd-ca92eef5f9e643a684dd04bf78448148',
    }

    sgMail.send(msg, (error, result) => 
    {
        if(error) 
        {
            res.status(404).send('Email not found');
        }
        else
        {
            res.status(200).send('Email sent');
        }
    });
})

module.exports = email_router

