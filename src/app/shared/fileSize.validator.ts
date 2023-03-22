import { FormControl } from '@angular/forms';
export function fileSizeValidator(control: FormControl) {
    const file = control.value as File;
    if (file) {
        const fileSize = file.size;
        const fileSizeInKB = Math.round(fileSize / 1024);
        if (fileSizeInKB > 20) {
            return {
                fileSizeValidator: 'File must be smaller than 20KB or smaller.',
            };
        } else {
            return null;
        }
    }
    return null;
}
