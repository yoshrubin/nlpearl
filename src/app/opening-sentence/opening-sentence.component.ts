import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-opening-sentence",
  templateUrl: "./opening-sentence.component.html",
  styleUrls: ["./opening-sentence.component.scss"],
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
  @Input() sentence: string = "";

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

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
    this.sentence = event.target.value;
    this.onChange(this.sentence);
  }

  onBlur() {
    this.onTouched();
  }

  insertPlaceholder(placeholder: string) {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      const cursorPos = textarea.selectionStart;
      const textBeforeCursor = this.sentence.substring(0, cursorPos);
      const textAfterCursor = this.sentence.substring(cursorPos);

      const placeholderRegex = /\[[^\]]+\]/g;
      let match;
      let lastMatchIndex = -1;
      let lastMatchLength = 0;
      while ((match = placeholderRegex.exec(textBeforeCursor)) !== null) {
        lastMatchIndex = match.index;
        lastMatchLength = match[0].length;
      }

      if (lastMatchIndex !== -1) {
        const beforePlaceholder = this.sentence.substring(0, lastMatchIndex);
        const afterPlaceholder = this.sentence.substring(
          lastMatchIndex + lastMatchLength,
        );
        this.sentence = beforePlaceholder + placeholder + afterPlaceholder;
        this.onChange(this.sentence); // Notify Angular forms that the value has changed

        // Update cursor position to be after the newly inserted placeholder
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd =
            lastMatchIndex + placeholder.length;
          textarea.focus();
        }, 0);
      } else {
        // If no placeholder is found, insert at the cursor position
        this.sentence = textBeforeCursor + placeholder + textAfterCursor;
        this.onChange(this.sentence); // Notify Angular forms that the value has changed

        // Update cursor position to be after the newly inserted placeholder
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd =
            cursorPos + placeholder.length;
          textarea.focus();
        }, 0);
      }
    }
  }
}
