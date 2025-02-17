class PersonsBuilder {
  constructor() {
    this.person = {
      nombre: '',
      apellido: '',
      email: ''
    };
  }

  setName(name) {
    this.person.nombre = name;
    return this;
  }

  setSurname(surname) {
    this.person.apellido = surname;
    return this;
  }

  setEmail(email) { 
    this.person.email = email;
    return this;
  }

  build() {
    return this.person;
  }
}

export { PersonsBuilder }