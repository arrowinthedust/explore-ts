import { ProjectList } from "./component/project-list.js";
import { ProjectInput } from "./component/project-input.js";

//npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader

//  const projectState = ProjectState.getInstance();
new ProjectInput();
new ProjectList("active");
new ProjectList("finished") ;
