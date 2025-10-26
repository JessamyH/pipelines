# Simple automation for local ops

IMAGE_NAME ?= static-site
IMAGE_TAG  ?= v1.0.0

.PHONY: build run stop logs clean

build: ## Build the container image
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .

run: ## Start the container in the background on port 8080
	docker run -d --name static-web -p 8080:80 $(IMAGE_NAME):$(IMAGE_TAG)
	curl -s http://localhost:8080/ | grep -q "Hello from Jessamy's Nginx"

stop: ## Stop and remove container
	docker stop static-web || true
	docker rm static-web || true
