#!/usr/bin/env bash
migrate () {
    echo "Starting Migrate"
    python manage.py migrate
}

run_server() {
  echo "Starting server"
  python manage.py runserver 0.0.0.0:8000
}

migrate;
run_server;