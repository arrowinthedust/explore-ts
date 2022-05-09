//Project
enum ProjectStatus {
    'Active', 'Finished'
};
class Project{

    constructor(
        public id:string,
        public title:string,
        public description:string,
        public people:number,
        public status: ProjectStatus
    ){}
}
//end Project

type Listener = (items: Project[]) => void;

//Project state Management
class ProjectState {
    private projects: Project[] = [];
    private listeners: Listener[] = [];
    private static instance: ProjectState;

    private constructor(){}

    static getInstance(){
        if(this.instance){
            return this.instance;
        }

        this.instance = new ProjectState();
        return this.instance;
    }


    addListener(listenerFn: Listener){
        this.listeners.push(listenerFn);
    }

    addProject(title: string, description:string, numOfPeople: number){
        const newProject = new Project(Math.random().toString(), title, description,numOfPeople, ProjectStatus.Active );
        this.projects.push(newProject);

        for(const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

//End Project state Management

//validation
interface Validatable{
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable){
    let isValid = true;
    let inputLength = validatableInput.value.toString().trim().length;

    if(validatableInput.required) {
        isValid = isValid && inputLength !== 0; 
    }

    if(validatableInput.minLength != null && typeof validatableInput.value == 'string') {
        isValid = isValid && inputLength > validatableInput.minLength; 
    }

    if(validatableInput.maxLength != null && typeof validatableInput.value == 'string') {
        isValid = isValid && inputLength < validatableInput.maxLength; 
    }

    if(validatableInput.min != null && typeof validatableInput.value == 'number') {
        isValid = isValid && validatableInput.value > validatableInput.min; 
    }

    if(validatableInput.max != null && typeof validatableInput.value == 'number') {
        isValid = isValid && validatableInput.value > validatableInput.max; 
    }


    return isValid;
}

//end-validation

//autobind decorator
function autobind(_1: any, _2: string, descriptor: PropertyDescriptor) {

    const originalMethod = descriptor.value;
    const  adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;

}
//end autobind decorator

// Project List
class ProjectList{
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: Project[];

    constructor(private type: 'active' |'finished' ) {
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = `${this.type}-projects`;
        this.assignedProjects = [];

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj =>{

                if(this.type === 'active') {
                   return prj.status === ProjectStatus.Active
                }
                
                return prj.status ===ProjectStatus.Finished
            });

            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();

    }

    private renderProjects(){
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;

        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects){
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }

    }

    private attach() {
        this.hostElement.insertAdjacentElement("beforeend",this.element);
    }

    private renderContent(){
        const listId = `${this.type}-projects-list`
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }
}


// end project List

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title');
        this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description');
        this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people');

        this.configure();
        this.attach();

    }
    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
        const userInput = this.gatherUserInput();

        if(Array.isArray(userInput)){
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            console.log(title, desc, people);
        }

        this.clearInputs(); 

    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    private gatherUserInput():[string,string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
    
        const titleValidatable: Validatable = {
            value: enteredTitle, required:true
        };

        const descriptionValidatable: Validatable = {
            value: enteredDescription, required:true, minLength:5
        };


        const peopleValidatable: Validatable = {
            value: enteredPeople, required:true, min:1 , max:5
        };

        if(!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable))
        {
            alert('Error');
            console.log(enteredTitle, enteredDescription, enteredPeople);
        }else
        {
            console.log();

            return [enteredTitle, enteredDescription, +enteredPeople];
        }

    }


    private configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin',this.element);
    }
}
const projectState = ProjectState.getInstance();
const prjInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
