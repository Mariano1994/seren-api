export class MaxNumbetrOfCheckError extends Error {
	constructor() {
		super('Max number of check-ins reached');
	}
}
