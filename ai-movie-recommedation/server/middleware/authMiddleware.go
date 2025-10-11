package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/princepal9120/ai-movie-recommedation/server/utils"
)

func AuthMiddleWare() gin.HandlerFunc{
	return func (c *gin.Context)  {
		token ,err  :=utils.GetAccesstoken(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
		}
		if token =="" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "not token provided"})
			return
		}
		claims , err := utils.ValidateToken(token)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return 
		}
		c.Set("userId",claims.UserId)
		c.Set("role", claims.Role)
		c.Next()

	}
}