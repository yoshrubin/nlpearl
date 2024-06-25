import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { OpeningSentenceComponent } from "./opening-sentence/opening-sentence.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [ReactiveFormsModule, OpeningSentenceComponent],
})
export class AppComponent {
  constructor(private fb: FormBuilder) {}

  profileForm = this.fb.group({
    name: [""],
    phone: [""],
    sentence: [
      `Hi, this is <span class="placeholder">Agent Name</span>. I’m calling from <span class="placeholder">Company Name</span>, do you have a few minutes to answer some questions?`,
    ],
  });

  updateSentence() {}

  onSubmit() {
    console.table(this.profileForm.value);
  }
}
