import { AbstractControl, FormControl } from '@angular/forms';

export function requiredFileTypes(types: string[]) {
    // lowercase all types
    types = types.map((extType) => extType.toLowerCase());

    // Validate that current file's extension is a matching file type
    return function (control: FormControl) {
        const file = control.value;
        if (file) {
            const extension = file.name.split('.').slice(-1)[0].toLowerCase();

            if (!types.includes(extension)) {
                return {
                    requiredFileType: 'File type must be of jpg, jpeg, or png.',
                };
            }

            return null;
        }

        return null;
    };
}
