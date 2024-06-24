import { Component, Input } from "@angular/core";

@Component({
  selector: "app-opening-sentence",
  standalone: true,
  imports: [],
  templateUrl: "./opening-sentence.component.html",
  styleUrl: "./opening-sentence.component.scss",
})
export class OpeningSentenceComponent {
  @Input() sentence = "";
}
