import Component from "./base-component.js";
import { Validation, validate } from "../utils/validation.js";
import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

/* Project Input Class
-------------------------------------------------- */
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleElement: HTMLInputElement;
  descriptionElement: HTMLInputElement;
  peopleElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private clearInputs() {
    this.titleElement.value = "";
    this.descriptionElement.value = "";
    this.peopleElement.value = "";
  }

  private gatherUserInput(): [string, string, number] | void {
    const inputTitle = this.titleElement.value;
    const inputDescription = this.descriptionElement.value;
    const inputPeople = this.peopleElement.value;

    const titleValidation: Validation = {
      value: inputTitle,
      required: true,
    };

    const descriptionValidation: Validation = {
      value: inputDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidation: Validation = {
      value: +inputPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidation) ||
      !validate(descriptionValidation) ||
      !validate(peopleValidation)
    ) {
      alert("Invalid input, try again");
      return;
    } else {
      return [inputTitle, inputDescription, +inputPeople];
    }
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }
}
