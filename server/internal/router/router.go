package router

import (
	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/hj235/cvwo/internal/auth"
	"github.com/hj235/cvwo/internal/routes"
)

func Setup() chi.Router {
	auth.InitAuth()
	router := chi.NewRouter()
	setUpMiddleware(router)
	setUpRoutes(router)
	return router
}

func setUpRoutes(router chi.Router) {
	// router.Use(cors.Handler(cors.Options{
	// 	AllowedOrigins:   []string{"http://localhost:5173"},
	// 	AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	// 	AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
	// 	ExposedHeaders:   []string{"Link"},
	// 	AllowCredentials: true,
	// 	MaxAge:           300,
	// }))
	// router.Use(middleware.GetCorsMiddleware())
	router.Group(routes.GetRoutes())
	router.Route("/user", routes.GetUserRoutes())
	router.Route("/thread", routes.GetThreadRoutes())
	router.Route("/comment", routes.GetCommentRoutes())
	router.Route("/tag", routes.GetTagRoutes())
}

func setUpMiddleware(router chi.Router) {
	router.Use(chiMiddleware.Logger)
	router.Use(chiMiddleware.Recoverer)
}
