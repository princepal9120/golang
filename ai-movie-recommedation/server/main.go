package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	// fmt.Println("hello world")
	router := gin.Default()

	router.GET("/hello", func(c *gin.Context) {
		c.String(200, "hello, aimovies!")
	})

	if err := router.Run(":8080"); err != nil {
		fmt.Println("Fialed to start server", err)
	}
}
