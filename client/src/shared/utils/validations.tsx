type ErrorMessage = false | string;
type ErrorMessages = {
    [key: string]: ErrorMessage
}
type ValidationFunc = (...args: any[]) => ErrorMessage
type ValidationFuncs = {
    [key: string]: ValidationFunc[]
}
type InputData = {
    [key: string]: any
}

export const constraint = {
    required: (): ValidationFunc => (value: any) => isNullOrEmpty(value) && "This field is required",
    minLength: (min: number): ValidationFunc => (value: string) =>
        value.length < min && `This field required to be at least ${min} characters`, //use with input type='text' + constraint.required
    maxLength: (max: number): ValidationFunc => (value: string) =>
        value.length > max && `This field required to be at least ${max} characters`, //use with input type='text' + constraint.required
    email: (): ValidationFunc => (value: string) =>
        !/.+@.+\..+/.test(value) && 'Must be a valid email',
    url: (): ValidationFunc => (value: string) =>
        !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value) &&
        'Must be a valid URL',
    match: (fieldToMatch: string, message: string): ValidationFunc => (value, data) =>
        value !== data[fieldToMatch] && message

}

export const isNullOrEmpty = (value: any) => value == null || value == '';

export const validate = (data: InputData, validationFuncs: ValidationFuncs): ErrorMessages => {
    const errMessages: ErrorMessages = {};
    Object.entries(validationFuncs).forEach(([fieldName, validationFuncArr]) => {
        validationFuncArr.forEach((validationFunc) => {
            if (!errMessages[fieldName]) {
                const errMessage = validationFunc(data[fieldName], data);
                if (errMessage) errMessages[fieldName] = errMessage
            }
        })
    })
    return errMessages;
}