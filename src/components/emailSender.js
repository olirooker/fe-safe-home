import { emailjs, init } from 'emailjs-com'

const sendEmail = () => {
    init('user_woEvxk93zUEkrcs7jCTzE')

    const templateParams = {
        from_name: 'safe home test',
        to_name: 'alan',
        message: 'test message',
        to_email: 'adfharrison@icloud.com',
    }

    emailjs
        .sendForm('default_service', 'template_u667pzk', templateParams)
        .then(
            function (response) {
                console.log('SUCCESS!', response.status, response.text)
            },
            function (error) {
                console.log('FAILED...', error)
            }
        )
}

export default sendEmail
