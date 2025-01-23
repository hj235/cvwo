package middleware

import (
	"os"

	"github.com/go-chi/cors"
)

var corsOptions = cors.Options{
	AllowedOrigins:   []string{os.Getenv("CLIENT_URL")},
	AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
	ExposedHeaders:   []string{"Link"},
	AllowCredentials: false,
}

var CorsMiddleware = cors.Handler(corsOptions)
