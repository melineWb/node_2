const users = [];
import User from './user.mjs';

export function update(newData, data) {
    if (data?.user) {
        const updatedUSer = { ...data.user, ...newData };
        users[data.index] = updatedUSer;
        return updatedUSer;
    }
    return create(newData);
}

export function create(data, index) {
    const newIndex = index || (users.length + 1).toString();
    const user = new User(newIndex, data);
    users.push(user);
    return user;
}

export function remove(user) {
    if (user) {
        user.isDeleted = true;
        return user;
    }
}

export function getAutoSuggestUsers(loginSubstring, limit = 1) {
    return users
        .filter((element) => element.login.includes(loginSubstring))
        .sort((el1, el2) => el1.login.localeCompare(el2.login))
        .slice(0, limit);
}

create({
    login: 'Hanna',
    password: 'hnsdfkoe123',
    age: 15
});

export default users;
