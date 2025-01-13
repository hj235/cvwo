package router

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/hj235/go-app/internal/routes"
)

func Setup() chi.Router {
	r := chi.NewRouter()

	corsOptions := cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowCredentials: true,
	}
	r.Use(cors.Handler(corsOptions))

	setUpRoutes(r)
	return r
}

func setUpRoutes(r chi.Router) {
	r.Group(routes.GetRoutes())
}
