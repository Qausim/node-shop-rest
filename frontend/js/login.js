(function() {
    const baseUrl = 'http://localhost:3000/users';
    const emailInput = document.querySelector("input[name='email']");
    const passwordInput = document.querySelector("input[name='password']");
    const loginButton = document.querySelector("input[value='log in']");
    const signUpButton = document.querySelector("input[value='sign up']");
    
    const showError = (type, msg) => {
        const errorMsg = document.querySelector(`p#${type}-error-msg`);
        errorMsg.textContent = msg;
        errorMsg.style.display = 'block';
    }

    const validInputs = (email, password) => {
        if (!email) {
            showError('email', 'Email cannot be blank');
            return false;
        }
        if (!password) {
            showError('password', 'Password cannot be blank');
            return false;
        }
        if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const clearError = () => {
        Array.from(document.querySelectorAll('.error-msg')).forEach(el =>
            el.style.display = 'none');
    };

    const logTokenAndRedirect = data => {
        const token = data.token;
        sessionStorage.setItem('token', token);
        window.location.replace('/');
    };

    const logIn = () => {
        const email = emailInput.value;
        const password = passwordInput.value;

        if(validInputs(email, password)) {
            const url = `${baseUrl}/login`;
            const params = {
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
                method: 'POST'
            };
            fetch(url, params)
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                    
                    throw new Error('Authentication failed!');
                })
                .then(data => {
                    logTokenAndRedirect(data);
                })
                .catch(error => {
                    showError('email', error.message);
                });
        }
    };

    const signUp = () => {
        const email = emailInput.value;
        const password = passwordInput.value;

        if(validInputs(email, password)) {
            const url = `${baseUrl}/signup`;
            const params = {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
                method: 'POST'
            };
            fetch(url, params)
                .then(res => {
                    if (res.status === 201) {
                        return res.json();
                    }
                    throw new Error('Signup failed!');
                })
                .then(data => {
                    logIn();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    loginButton.addEventListener('click', logIn);
    signUpButton.addEventListener('click', signUp);
    emailInput.addEventListener('input', clearError);
    passwordInput.addEventListener('input', clearError);
})();