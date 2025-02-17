export const validateLength = (value) => Boolean(value) && value.length > 5;

export const validateNameAndSurname = (name) => Boolean(name) && validateLength(name) && /^[a-zA-Z\s-]+$/i.test(name);

export const validatePhoneNumber = (number) => isNaN(number) && /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(number);

export const validatePassword = (pass) => Boolean(pass) && validateLength(pass) && /^[a-zA-Z0-9!@#$%^&*]{6,16}$/i.test(pass);

export const validateUsernames = (username) => Boolean(username) && /^[a-zA-Z0-9_\-]+$/i.test(username);

export const validationSchema = {
    'name': {
        validate: validateLength,
        errorText: 'El nombre debe tener mas de 5 caracteres'
    },
    'username': {
        validate: validateUsernames,
        errorText: 'Contraseña y/o nombre de usuario incorrecto'
    },
    'password': {
        validate: validatePassword,
        errorText: 'Contraseña y/o nombre de usuario incorrecto'
    },
    'phone': {
        validate: validatePhoneNumber,
        errorText: 'Numero de telefono invalido. ej: 261 222 1111'
    },
    'empty': {
        validate: (value) => Boolean(value),
        errorText: 'El campo no puede estar vacio'
    },
    'captcha':{
        validate: (value) => Boolean(value),
        errorText: 'El campo no puede estar vacio'
    },
    'tipo': {
        validate: (value) => Boolean(value),
        errorText: 'El campo no puede estar vacio'
    },
    'fecha': {
        validate: (value) => Boolean(value),
        errorText: 'El campo no puede estar vacio'
    },
    'tecnico': {
        validate: (value) => Boolean(value),
        errorText: 'El campo no puede estar vacio'
    },
    'observaciones': {
        validate: (value) => Boolean(value),
        errorText: 'El campo no puede estar vacio'
    }
};
