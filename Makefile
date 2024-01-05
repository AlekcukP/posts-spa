#!make

.PHONY: up
up:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: restart
restart:
	docker-compose restart

.PHONY: bash
bash:
	docker-compose exec react-app bash

.PHONY: build
build:
	docker-compose up -d --build
