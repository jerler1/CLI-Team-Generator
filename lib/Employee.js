// TODO: Write code to define and export the Employee class

class Employee {
  constructor(name, id, email) {
    this.role = "Employee";
    this.name = name;
    this.email = email;
    this.id = id;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return this.role;
  }
}

module.exports = Employee;
// The jest testing requirements.

// Expecting a Employee object that has a name, email, id, and three methods: getName(), getId(), and getEmail();

// Might have a getrole() method as well.
