
import { PureComponent } from 'react';


interface IComponent {
    readonly className?: string;
    readonly mode?: string;
    readonly disabled?: boolean;
}

interface IButton extends IComponent {
    readonly type?: string;
    readonly size?: string;
    readonly caption?: string;
}


declare module '@ui.packages/ui' {

    export class Input {}
    export class FileInput {}
    export class Textarea {}
    export class Button extends PureComponent<IButton> {}
    export class Evaluation {}
    export class Table {}
    export class CheckBox {}
    export class Image {}
    export class Spinner {}
    export class Select {}
    export class RadioBox {}
    export class Radio {}
    export class DatePicker {}
    export class Gallery {}
    export class Breadcrumbs {}

    export class BaseField {}
    export class FileField {}
    export class InputField {}
    export class TextareaField {}
    export class EvaluationField {}
    export class SelectField {}
    export class CheckBoxField {}
    export class RadioBoxField {}
    export class DatePickerField {}

    export class Container {}
    export class Col {}
    export class Row {}
    export class Hr {}

}