import React, {useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import Alert from 'react-bootstrap/Alert';

const Result = () => {
    return (
        <Alert variant="success" className="success-msg">
        Your Message has been successfully sent.
        </Alert>
    )
}

const FormThree = () => {

    const form = useRef();

    const [ result, showresult ] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_yj5dgzp', 'template_hfduayo', form.current, 'WLENsTkBytC0yvItS')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          form.current.reset();
          showresult(true);
      };
        setTimeout(() => {
            showresult(false);
        }, 3000);

    return (
        <form ref={form} onSubmit={sendEmail} className="axil-contact-form">
            <div className="form-group text-end">
                <button type="submit" className="axil-btn btn-fill-primary w-auto btn-primary" name="submit-btn">생성하기</button>
            </div>
            <div className="form-group">
                {result ? <Result /> : null}
            </div>
        </form>
    )
}

export default FormThree;