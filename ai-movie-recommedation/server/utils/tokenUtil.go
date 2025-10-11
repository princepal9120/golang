package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)


type SignedDetails struct {
	Email string
	FirstName string
	LastName string 
	Role string
	UserId string
	jwt.RegisteredClaims
}


var SECRET_KEY string=os.Getenv("SECRET_KEY")
var SECRET_REF_KEY string=os.Getenv("SECRET_REF_KEY")


func GenerateAllTolkens(email, firstName, lastName, role ,userId string) (string, string, error ){
	claims :=&SignedDetails{
		Email: email,
		FirstName: firstName,
		LastName: lastName,
		Role: role,
		UserId: userId,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:  "PopcornAI",
			IssuedAt: jwt.NewNumericDate(time.Now()),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24*time.Hour)),
		},
	}
	token:= jwt.NewWithClaims(jwt.SigningMethodES256,claims)
	signedToken, err := token.SignedString([]byte(SECRET_KEY))
	if err != nil {
		return "", "", err
	}
	refershclaims :=&SignedDetails{
		Email: email,
		FirstName: firstName,
		LastName: lastName,
		Role: role,
		UserId: userId,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:  "PopcornAI",
			IssuedAt: jwt.NewNumericDate(time.Now()),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24*time.Hour)),
		},
	}
	refershtoken:= jwt.NewWithClaims(jwt.SigningMethodES256,refershclaims)
	signedRefereshToken, err := refershtoken.SignedString([]byte(SECRET_REF_KEY))
	if err != nil {
		return "", "", err
	}
	return signedToken,signedRefereshToken ,nil;
}
