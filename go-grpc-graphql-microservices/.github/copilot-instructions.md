# Go gRPC-GraphQL Microservices Project Instructions

## Architecture Overview

This is a microservices architecture using Go with GraphQL as the API gateway and gRPC for inter-service communication:

- **GraphQL Gateway** (`graphql/`) - Unified API layer exposing schema in `schema.graphql`
- **Account Service** (`account/`) - User/account management microservice
- **Catalog Service** (`catalog/`) - Product catalog microservice  
- **Order Service** (`order/`) - Order processing microservice
- **Protocol Buffers** (`graphql/pb/`) - gRPC service definitions for inter-service communication

## Key Project Structure

- `graphql/schema.graphql` - Single source of truth for GraphQL API schema
- `graphql/gqlgen.yml` - GraphQL code generation configuration
- `graphql/models_gen.go` - Auto-generated GraphQL models (DO NOT edit manually)
- `graphql/*_resolver.go` - GraphQL resolvers that call backend microservices via gRPC
- `docker-compose.yaml` - Service orchestration with dedicated databases per service

## Development Workflows

### GraphQL Code Generation
```bash
# Generate GraphQL resolvers and models after schema changes
cd graphql && go run github.com/99designs/gqlgen generate
```

### gRPC Integration Pattern
- Each microservice exposes gRPC endpoints for internal communication
- GraphQL resolvers act as gRPC clients to backend services
- Protocol buffer definitions in `pb/` directory define service contracts

### Service Communication Flow
1. Client sends GraphQL queries/mutations to gateway (`graphql/`)
2. GraphQL resolvers make gRPC calls to appropriate microservices
3. Microservices handle business logic and database operations
4. Response flows back through GraphQL layer

## Current Implementation Status

**Note**: This appears to be an early-stage project with skeleton structure:
- Most resolver files contain only function names, not implementations
- Microservice directories (`account/`, `catalog/`, `order/`) are empty
- Docker services are defined but not configured

## Schema Conventions

- Use `PaginationInput` for list queries with `skip` and `take` fields
- Follow naming pattern: `createX` for mutations, `xs` for queries
- Time fields use custom `Time` scalar type
- All IDs are strings for consistency across services

## Known Schema Issues to Fix

- `prince` field should be `price` in Product type
- `crateAccount` and `createProdcut` have typos in Mutation type
- `totalPrice` should be Float! not String! for calculations

## Testing Strategy

Run tests across all services:
```bash
go test ./...
```

For individual service testing, use Docker Compose to spin up dependencies.