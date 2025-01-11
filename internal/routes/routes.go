package routes

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/hj235/go-app/internal/handlers/login"
	"github.com/hj235/go-app/internal/handlers/signup"
	"github.com/hj235/go-app/internal/handlers/users"
)

func GetRoutes() func(r chi.Router) {
	return func(r chi.Router) {
		r.Get("/users", func(w http.ResponseWriter, req *http.Request) {
			response, _ := users.HandleList(w, req)

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		})

		r.Post("/signup", func(w http.ResponseWriter, req *http.Request) {
			response, _ := signup.HandleSignup(w, req)

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		})

		r.Post("/login", func(w http.ResponseWriter, req *http.Request) {
			response, _ := login.HandleLogin(w, req)

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		})
	}
}
