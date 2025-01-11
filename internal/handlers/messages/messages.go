package messages

const (
	SuccessfulListUsersMessage = "Successfully listed users"
	SuccessfulSignupMessage    = "Successfully signed up"
	SuccessfulLoginMessage     = "Successfully logged in"

	ErrParseForm        = "Failed to parse signup form in %s"
	ErrRetrieveDatabase = "Failed to retrieve database in %s"
	ErrRetrieveUser     = "Failed to retrieve user in %s"
	ErrRetrieveUsers    = "Failed to retrieve user in %s"
	ErrEncodeView       = "Failed to encode user into JSON format in %s"
)
