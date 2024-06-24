class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.age = user.age;
    this.city = user.city;
    this.zipCode = user.zipCode;
    this.role = user.role;
    this.deleted = user.deleted;
  }
}

module.exports = UserDTO;
