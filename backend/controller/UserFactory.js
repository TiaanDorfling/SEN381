import { Student } from "../model/Student.js";
import {Admin} from "../model/Admin.js";
import {Tutor} from "../model/Tutor.js";

export class UserFactory{
    static createUser(type, userInfo){
        const {userID, name, email, passwordHash} = userInfo;
        switch(type)
        {
            case 'admin':
                return new Admin(userID,name,email,passwordHash);
            case 'tutor':
                return new Tutor(userID,name,email,passwordHash);
            case 'student':
                return new Student(userID,name,email,passwordHash);
            default:
                console.log('wrong type');
                return null;
        }
    }
}