package main

import (
	"fmt"

	"github.com/gin-gonic/gin"

	"github.com/princepal9120/ai-movie-recommedation/server/routes"
)

func main() {
	// fmt.Println("hello world")
	router := gin.Default()

	router.GET("/health", func(c *gin.Context) {
		c.String(200, "health is good")
	})
	routes.SetupUnProtectedRoutes(router)
	routes.SetupProtectedRoutes(router)
	

	if err := router.Run(":8081"); err != nil {
		fmt.Println("Fialed to start server", err)
	}
}
