export class User{
    constructor(userID, name, email, passwordHash, role){
        this.userID = userID;
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
    }

    register(){}
    logIn(){}
    logOut(){}
    updateProfile(){}
}