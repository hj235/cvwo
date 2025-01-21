package router

import (
	"github.com/go-chi/chi/v5"

	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/hj235/cvwo/internal/routes"
)

func Setup() chi.Router {
	router := chi.NewRouter()
	setUpMiddleware(router)
	setUpRoutes(router)
	return router
}

func setUpRoutes(router chi.Router) {
	router.Group(routes.GetRoutes())
	router.Route("/user", routes.GetUserRoutes())
}

func setUpMiddleware(router chi.Router) {
	router.Use(chiMiddleware.Logger)
	router.Use(chiMiddleware.Recoverer)
}
