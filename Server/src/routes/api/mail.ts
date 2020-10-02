import nodemailer from 'nodemailer'

// sends email for user to activate account based on params
async function sendMail(id: string, mail: string): Promise<void> {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'piap70872@gmail.com',
            pass: 'POPUSImiKURAC',
        }
    })
    let info = await transporter.sendMail({
        from: '"Nik" <piap70872@gmail.com>',
        to: `${mail}`,
        subject: 'acc auth',
        html: `<p>Please follow this link to activate account:</p><br><a href='http://localhost:5000/API/users/${id}' target="_blank"> Click here to activate account </a>`
    })
    transporter.sendMail(info, function (err, info) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(info)
        }
    })
}

export default sendMail