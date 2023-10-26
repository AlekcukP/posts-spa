#!make

APP_URL=http://127.0.0.1:3001/

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
	docker-compose build

