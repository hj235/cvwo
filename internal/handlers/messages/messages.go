package messages

const (
	SuccessfulListUsersMessage = "Successfully listed users"
	SuccessfulSignupMessage    = "Successfully signed up"
	SuccessfulLoginMessage     = "Successfully logged in"

	ErrSignupFailure = "Failed to signup user in %s"
	ErrLoginFailure  = "Failed to login user in %s"

	ErrParseForm        = "Failed to parse signup form in %s"
	ErrRetrieveDatabase = "Failed to retrieve database in %s"
	ErrRetrieveUser     = "Failed to retrieve user in %s"
	ErrRetrieveUsers    = "Failed to retrieve users in %s"
	ErrEncodeView       = "Failed to encode user into JSON format in %s"
)
