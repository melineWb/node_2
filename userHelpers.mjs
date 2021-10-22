const users = [];
import User from './user.mjs';

users.push(
    new User(users.length + 1, {
        login: 'Hanna',
        password: 'hnsdfkoe123',
        age: 15,
    }),
);

export function update() {
    console.log(update);
}

export function create() {
    console.log(create);
}

export default users;
