const nodemailer = require('nodemailer')
module.exports = (email,pesan) =>{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'infinite.lancer.jobs@gmail.com',
            pass: 'localhost3000'
        }
    });

    const mailOptions = {
        from: 'infinite.lancer.jobs@gmail.com', // sender address
        to: `${email}`, // list of receivers
        subject: 'InfiniteLancer Confirmation', // Subject line
        text: `${pesan}`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log('gagal kirim')
        else
            console.log('berhasil kirim!');
    });
}