package routes

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/hj235/cvwo/internal/handlers/users"
	"github.com/hj235/cvwo/internal/middleware"
)

func GetUserRoutes() func(router chi.Router) {
	return func(router chi.Router) {
		router.Use(middleware.DefaultMiddleware)

		router.Get("/", func(w http.ResponseWriter, req *http.Request) {
			response, _ := users.HandleListAll(w, req)
			json.NewEncoder(w).Encode(response)
		})

		router.Post("/signup", func(w http.ResponseWriter, req *http.Request) {
			response, _ := users.HandleSignup(w, req)
			json.NewEncoder(w).Encode(response)
		})

		router.Post("/login", func(w http.ResponseWriter, req *http.Request) {
			response, _ := users.HandleLogin(w, req)
			json.NewEncoder(w).Encode(response)
		})

		router.Patch("/edit/{username}-{password}", func(w http.ResponseWriter, req *http.Request) {
			response, _ := users.HandleEdit(w, req)
			json.NewEncoder(w).Encode(response)
		})

		router.Delete("/delete", func(w http.ResponseWriter, req *http.Request) {
			response, _ := users.HandleDelete(w, req)
			json.NewEncoder(w).Encode(response)
		})
	}
}
