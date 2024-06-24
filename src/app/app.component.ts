import { Component } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OpeningSentenceComponent } from "./opening-sentence/opening-sentence.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, OpeningSentenceComponent],
})
export class AppComponent {
  constructor(private fb: FormBuilder) {}

  profileForm = this.fb.group({
    name: [""],
    phone: [""],
    agentName: [""],
    agentCompany: [""],
    sentence: [""],
  });

  updateSentence() {
    const { agentName, agentCompany } = this.profileForm.value;
    this.profileForm
      .get("sentence")
      ?.setValue(
        `Hi, this is ${agentName}, I’m calling from ${agentCompany}, do you have a few minutes to answer some questions?`,
      );
  }

  onSubmit() {
    const { agentName, agentCompany } = this.profileForm.value;
    if (!agentName || !agentCompany) {
      console.log("error");
    } else {
      console.table(this.profileForm.value);
    }
  }
}
