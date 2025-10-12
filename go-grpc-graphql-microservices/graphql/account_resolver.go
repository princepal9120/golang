package main

import "context"


type accountResolver struct {
	server *Server
}

func (r *accountResolver) Proudcts(ctx context.Context, obj *Account)([]Order, error){

} 
