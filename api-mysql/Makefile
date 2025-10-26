.PHONY: build start test down

# Determine which compose file to use
COMPOSE_FILE := $(if $(CI),docker-compose.ci.yml,docker-compose.yml)

# Build Docker images
build:
	@echo "Building Docker images..."
	docker compose -f $(COMPOSE_FILE) build

# Start services
start:
	@echo "Starting services..."
	docker compose -f $(COMPOSE_FILE) up -d

# Wait for database to be ready
db\:wait:
	@echo "Waiting for database to be ready..."
	@max_attempts=30; \
	attempt=0; \
	while [ $$attempt -lt $$max_attempts ]; do \
		if docker compose -f $(COMPOSE_FILE) exec -T db mysqladmin ping -h localhost -u root -p$${DB_PASSWORD:-rootpassword} --silent 2>&1 | grep -q "alive"; then \
			echo "Database is ready!"; \
			exit 0; \
		fi; \
		attempt=$$((attempt + 1)); \
		echo "Waiting for MySQL... ($$attempt/$$max_attempts)"; \
		sleep 2; \
	done; \
	echo "Database failed to start within timeout"; \
	exit 1

# Run tests
test:
	@echo "Running tests..."
	docker compose -f $(COMPOSE_FILE) exec -T api npm test

# Stop and remove containers
down:
	@echo "Stopping services..."
	docker compose -f $(COMPOSE_FILE) down
