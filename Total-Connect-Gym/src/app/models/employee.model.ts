export class Employee {
    id: number;
    name: string;
    clockedIn: boolean;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.clockedIn = false;
    }
}