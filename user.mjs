class User {
    constructor(id, data) {
        this.id = id || 1;
        this.login = data?.login;
        this.password = data?.password;
        this.age = +data?.age || null;
        this.isDeleted = false;
    }
}

export default User;
