class Validator {
    validate(value) {
        throw new Error("validate method must be implemented");
    }
}

// Type Validator
class TypeValidator extends Validator {
    constructor(expectedType) {
        super();
        this.expectedType = expectedType;
    }

    validate(value) {
        return typeof value === this.expectedType
            ? { valid: true }
            : { valid: false, message: `Expected type ${this.expectedType}, but got ${typeof value}` };
    }
}

// Required Validator
class RequiredValidator extends Validator {
    validate(value) {
        return value !== null && value !== undefined
            ? { valid: true }
            : { valid: false, message: 'Value is required' };
    }
}

// Range Validator
class RangeValidator extends Validator {
    constructor(min, max) {
        super();
        this.min = min;
        this.max = max;
    }

    validate(value) {
        return typeof value === 'number' && value >= this.min && value <= this.max
            ? { valid: true }
            : { valid: false, message: `Value must be between ${this.min} and ${this.max}` };
    }
}

// String length validator
class StringLengthValidator extends Validator {
	constructor(min, max) {
		super();
		this.min = min;
		this.max = max;
	}
	
	validate(value) {
		return typeof value === 'string' && value.length >= this.min && value.length <= this.max
		? {valid : true}
		: {valid : false, message: `String length must be between ${this.min} and ${this.max} characters`};
	}
}


// Array of Strings Validator
class ArrayOfStringsValidator extends Validator {
    validate(value) {
        if (!Array.isArray(value)) {
            return { valid: false, message: 'Value must be an array' };
        }

        for (const item of value) {
            if (typeof item !== 'string' || item.trim() === '') {
                return { valid: false, message: 'Array must contain non-empty strings only' };
            }
        }

        return { valid: true };
    }
}

// Pattern Validator
class PatternValidator extends Validator {
	constructor(pattern) {
		super();
		this.pattern = pattern;
	}
	
	validate(value) {
		return this.pattern.test(value)
		? {valid : true}
		: {valid: false, message: 'Date must follow ISODate pattern'}
	}
}

// Composite Validator
class CompositeValidator extends Validator {
    constructor(validators) {
        super();
        this.validators = validators;
    }

    validate(value) {
        for (const validator of this.validators) {
            const result = validator.validate(value);
            if (!result.valid) {
                return result;
            }
        }
        return { valid: true };
    }
}

// Export the validators
module.exports = {
    Validator,
    TypeValidator,
    RequiredValidator,
    RangeValidator,
    ArrayOfStringsValidator,
	StringLengthValidator,
	PatternValidator,
    CompositeValidator
};