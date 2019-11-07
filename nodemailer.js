const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'infinite.lancer.jobs@gmail.com',
        pass: 'localhost3000'
    }
});

const mailOptions = {
    from: 'infinite.lancer.jobs@gmail.com', // sender address
    to: 'anggabanny@email.com', // list of receivers
    subject: 'InfiniteLancer Confirmation', // Subject line
    text: 'test nih gan'
    // html: '<p>Your html here</p>'// plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
    if (err)
        console.log('gagal kirim')
    else
        console.log('berhasil kirim!');
});