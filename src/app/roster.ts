export class Roster {
    id: number;
    submitDate: Date;
    hasTheHatDecided: boolean;
    students: Student[];
}

export class Student {
    id : number;
    firstName: string;
    lastName: string;
    nameSuffix: string;
    gender: string;
    dob: Date;
    netWorth: number;
    hairColor: string;
    elvesOwned: number;
    dementorsBattled: number;
    house: string;
    rulesFired: string[];
}
