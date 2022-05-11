import { ProjectList } from "./component/project-list";
import { ProjectInput } from "./component/project-input";

//npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader

//  const projectState = ProjectState.getInstance();
new ProjectInput();
new ProjectList("active");
new ProjectList("finished") ;
console.log('Hi') ;
