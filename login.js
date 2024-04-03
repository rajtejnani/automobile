const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

function checkPassword() {
    let password = document.getElementById
        ("password").value;
    let cnfrmPassword = document.getElementById
        ("cnfrm-password").value;
    console.log(password, cnfrmPassword);
    let message = document.getElementById
        ("message");

    if (password.length != 0) {
        if (password == cnfrmPassword) {
            message.textContent = "Passwords match";
            message.style.backgroundColor = "#3ae374";
        }
        else {
            message.textContent = "Password don't match";
            message.style.backgroundColor = "#ff4d4d";
        }
    }
}