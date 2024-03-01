const validateUsername = (value) => {
    if (!value) return "This field must not be empty.";

    const regex = /^[a-zA-Z0-9_]+$/;
    if (!regex.test(value)) {
        return "Username can contain letters (a-z), numbers (0-9), and underscores (_). No other special characters or symbols are allowed."
    }
}

const validateFullName = (value) => {
    if (!value) return "This field must not be empty.";

    const regex = /^[a-zA-Z ]+$/;
    if (!regex.test(value)) {
        return "Invalid full name";
    }
};

function validatePassword(password) {
    if (!password) return "This field must not be empty.";

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!regex.test(password)) {
        return "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one symbol.";
    }
}

const validateEmail = (value) => {
    if (!value) return "This field must not be empty.";

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
        return "Invalid email";
    }
};

const validateMobileNumber = (value) => {
    if (!value) return "This field must not be empty.";

    const regex = /^\d{10}$/;
    if (!regex.test(value)) {
        return "Invalid mobile number";
    }
};

const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return "This field must not be empty.";

    if (password !== confirmPassword) {
        return "Passwords do not match";
    }
};

const validateGitHubLink = (link) => {
    if(!link) return undefined;

    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+$/i;
    if (!githubRegex.test(link)) {
        return "Invalid link";
    }
}

const validateTwitterLink = (link) => {
    if(!link) return undefined;

    const twitterRegex = /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_]+$/i;
    if (!twitterRegex.test(link)) {
        return "Invalid link";
    }
}

function validateLinkedInLink(link) {
    if(!link) return undefined;

    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9\-_]+(\/[a-zA-Z0-9\-_]+\/?)?$/;
    if(!regex.test(link)) {
        return "Invalid link";
    }
  }

const validatePortfolioLink = (link) => {
    if(!link) return undefined;
    
    const portfolioRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/i;
    if(!portfolioRegex.test(link)) {
        return "Invalid link";
    }
}

const ensureHttpsUrl = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    return url;
  }

export {
    validateUsername,
    validateFullName,
    validateEmail,
    validateMobileNumber,
    validatePassword,
    validateConfirmPassword,
    validateGitHubLink,
    validateTwitterLink,
    validateLinkedInLink,
    validatePortfolioLink,
    ensureHttpsUrl
};