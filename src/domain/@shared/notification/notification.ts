export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private _errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps): void {
        this._errors.push(error);
    }

    getErrors(): NotificationErrorProps[] {
        return this._errors;
    }

    messages(context?: string): string {
        return this._errors
           .filter(error => context ? error.context === context : true)
           .map(error => error.context + ": " + error.message)
           .join(',');
    }

    hasErrors(): boolean {
        return this._errors.length > 0;
    }
}