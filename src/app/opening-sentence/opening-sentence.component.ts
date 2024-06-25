import { Component, forwardRef, Input, ViewEncapsulation } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "app-opening-sentence",
  templateUrl: "./opening-sentence.component.html",
  styleUrls: ["./opening-sentence.component.scss"],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OpeningSentenceComponent),
      multi: true,
    },
  ],
})
export class OpeningSentenceComponent implements ControlValueAccessor {
  @Input() sentence: SafeHtml;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private sanitizer: DomSanitizer) {
    const initialSentence = `Hi, this is <span class="placeholder">Agent Name</span>. I’m calling from <span class="placeholder">Company Name</span>, do you have a few minutes to answer some questions?`;
    this.sentence = this.sanitizer.bypassSecurityTrustHtml(initialSentence);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.sentence = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  onSentenceChange(event: any) {
    const target = event.target as HTMLTextAreaElement;
    this.sentence = this.sanitizer.bypassSecurityTrustHtml(target.value);
    this.onChange(this.sentence);
  }

  onBlur() {
    this.onTouched();
  }

  insertPlaceholder(placeholder: string) {
    const editableDiv = document.querySelector("div[contenteditable='true']");
    if (!editableDiv) return;

    const content = editableDiv.innerHTML;

    const placeholderRegex = /<span class="placeholder">[^<]+<\/span>/;
    const match = content.match(placeholderRegex);

    if (!match) return;

    const matchIndex = match.index!;
    const matchLength = match[0].length;

    const beforePlaceholder = content.substring(0, matchIndex);
    const afterPlaceholder = content.substring(matchIndex + matchLength);

    const newContent = beforePlaceholder + placeholder + afterPlaceholder;
    editableDiv.innerHTML = newContent;

    this.sentence = newContent;
    this.onChange(this.sentence);

    setTimeout(() => {
      const newRange = document.createRange();
      const newSelection = window.getSelection();
      if (!newSelection) return;

      if (editableDiv.firstChild) {
        newRange.setStart(
          editableDiv.firstChild,
          matchIndex + placeholder.length,
        );
        newRange.collapse(true);
        newSelection.removeAllRanges();
        newSelection.addRange(newRange);
      }
    }, 0);
  }
}
