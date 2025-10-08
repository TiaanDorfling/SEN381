import { User } from './User.js';

export class Admin extends User{
    constructor(userID, name, email, passwordHash){
        super(userID, name, email, passwordHash, 'admin');
        this.moderationLog = [];
    }

    moderateForum() {} //Katryn?
    manageUsers() {}
    overseeContent() {}
}