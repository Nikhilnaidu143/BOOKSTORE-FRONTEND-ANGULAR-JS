export class User {
    first_name: string;
    last_name: string;
    kyc: string;
    dob: string;
    registered_date: string;
    updated_date: string;
    email: string;
    password: string;

    constructor(first_name: string, last_name: string, kyc: string, dob: string, registered_date: string, updated_date: string, email: string, password: string) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.kyc = kyc;
        this.dob = dob;
        this.registered_date = registered_date;
        this.updated_date = updated_date;
        this.email = email;
        this.password = password;
    }
}
