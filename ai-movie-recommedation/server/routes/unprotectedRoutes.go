package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/princepal9120/ai-movie-recommedation/server/controllers"
)

func SetupUnProtectedRoutes(router *gin.Engine) {

	router.POST("/register", controllers.RegisterUser())
	router.POST("/login", controllers.LoginUser())

}
