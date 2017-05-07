// Import modules used by both client and server through a single index entry point
// e.g. useraccounts configuration file.

AccountsTemplates.configure({
    defaultLayout: 'App_body',
    defaultLayoutRegions: {},
    defaultContentRegion: 'main',
    defaultTemplate: 'login',
    texts: {
        button: {
            signUp: "Register Now",
            signIn: "Login"
        }
    },
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: false,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,
})