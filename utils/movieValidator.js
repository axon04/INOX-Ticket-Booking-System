const {
    RequiredValidator,
    TypeValidator,
    RangeValidator,
	StringLengthValidator,
    ArrayOfStringsValidator,
	PatternValidator,
    CompositeValidator
} = require('./coreValidator');

const ISODateRegex = /^(?:\d{4})-(?:\d{2})-(?:\d{2})(?:T(?:\d{2}):(?:\d{2}):(?:\d{2}(?:\.\d+)?)?(?:(?:Z)|(?:[+-](?:\d{2}):(?:\d{2})))?)?$/

const movieNameValidator = new CompositeValidator([new RequiredValidator(), new TypeValidator('string')]);
const movieLanguageValidator = new ArrayOfStringsValidator(); // Use the new validator
const movieDurationValidator = new RangeValidator(1, 36000); // Assuming max duration is 10 hours
const movieGenreValidator = new CompositeValidator([new RequiredValidator(), new TypeValidator('string'), new StringLengthValidator(1, 20)]);
const movieCastValidator = new ArrayOfStringsValidator(); // Use the new validator
const movieDirectorValidator = new CompositeValidator([new RequiredValidator(), new TypeValidator('string'), new StringLengthValidator(1, 20)]);
const movieReleaseDateValidator = new CompositeValidator([new RequiredValidator(), new PatternValidator(ISODateRegex)]);
const movieDescriptionValidator = new CompositeValidator([new RequiredValidator(), new TypeValidator('string'), new StringLengthValidator(50,300)]);
const movieImageValidator = new TypeValidator('string'); // Optional field

class MovieValidator {
    constructor() {
        this.validators = {
            name: movieNameValidator,
            language: movieLanguageValidator,
            duration: movieDurationValidator,
            genre: movieGenreValidator,
            cast: movieCastValidator,
            director: movieDirectorValidator,
            release_date: movieReleaseDateValidator,
            description: movieDescriptionValidator,
            image: movieImageValidator // Optional field
        };
    }

    validate(movie, requestType = 'PUT') {
        const invalidProperties = [];

        for (const key in this.validators) {
            const validator = this.validators[key];
            const value = movie[key];
            // For PUT and POST requests, validate all properties
            if (requestType === 'PUT' || requestType === 'POST') {
                const result = validator.validate(value);
                if (!result.valid) {
                    invalidProperties.push({ property: key, message: result.message });
                }
            } 
            // For PATCH requests, validate only if the property exists
            else if (requestType === 'PATCH' && value !== undefined) {
                const result = validator.validate(value);
                if (!result.valid) {
                    invalidProperties.push({ property: key, message: result.message });
                }
            }
        }

        return invalidProperties.length === 0
            ? { valid: true }
            : { valid: false, invalidProperties };
    }
}

// Export the MovieValidator
module.exports = MovieValidator;