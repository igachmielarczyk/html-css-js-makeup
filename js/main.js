document.getElementsByClassName('nav-hamburger')[0].addEventListener('click', function(){
    document.getElementsByClassName('open-menu-holder')[0].classList.toggle('open');
})

document.getElementsByClassName('menu-close')[0].addEventListener('click', function(){
    document.getElementsByClassName('open-menu-holder')[0].classList.toggle('open');
})


let appointmentForm = document.getElementById('appointment-form');


const createAppointment = (appointment) => {

    const appointmentMessage = document.querySelector('.appointment-message');

    fetch('https://akademia108.pl/api/ajax/post-appointment.php', {
        headers: {
            'Content-Type': 'application/json', 
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(appointment)
    })
        .then(res => res.json())
        .then(resJSON => {
            console.log(resJSON);
            appointmentMessage.classList.add('send');
            appointmentMessage.innerText = `Thanks ${resJSON.appointment.name}, you have been saved`;
        });

}


const checkForm = (e) => {

    e.preventDefault();

    let formFields = document.getElementsByClassName('form-field');
    let allFields = false;
    const appointmentMessage = document.querySelector('.appointment-message');
    let appointment = {
        name: document.getElementById('appointment-name').value, 
        email: document.getElementById('appointment-email').value,
        service: document.getElementById('appointment-service').value,
        phone: document.getElementById('appointment-phone').value,
        date: document.getElementById('appointment-date').value,
        time: document.getElementById('appointment-time').value,
        message: document.getElementById('appointment-message').value
    }


    for(let i = 0; i < formFields.length; i++){
        if (formFields[i].value.trim() === '') {
            allFields = false;
            formFields[i].classList.add('error');
        } else {
            allFields = true;
            formFields[i].classList.remove('error');
            // formFields.reset(); 
        }
    }

    if(allFields) {
        createAppointment(appointment);
    } else {
        appointmentMessage.classList.add('error');
        appointmentMessage.innerText = `Fill form fields`;
    }
}

appointmentForm.addEventListener('submit', checkForm);