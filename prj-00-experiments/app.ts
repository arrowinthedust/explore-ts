console.log("Testing Typescript Setup");


interface Person {
    name: string;
    age: number;

    greet(phrase: string): void;
}


let user1: Person;
user1 = {
    name: 'Max',
    age: 30,
    greet(phrase:string){
        console.log(phrase +' '+this.name);
    }
};


user1.greet('Hi There I am ');

console.log("End Testing Typescript Setup");