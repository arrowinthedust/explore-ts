import {Project, ProjectStatus} from '../model/project.js';

// TODO: need context here...
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected Listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.Listeners.push(listenerFn);
  }
}

//Project state Management - Manage state of a Project
export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);

    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus): void {
    const project = this.projects.find((prj) => prj.id === projectId);

    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners(): void {
    for (const listenerFn of this.Listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

//End Project state Management
