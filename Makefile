image = $(shell docker images --quiet trivia:test)
FOLDER := AppFiles

help: # Información de ayuda
	@egrep -h '\s#\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?# "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'


build: # Build docker images
	docker build -f Docker/MicroPython/DockerFile -t trivia:test .

run: build # Start MicroPython trivia server
	@echo Server running on port 5000
	@echo http://localhost:5000/
	docker run --rm --network=host trivia:test

copylocal: build # Copy all files to a local folder se FOLDER=AppFiles
	docker run -d --rm --name trivia trivia:test
	docker cp trivia:/usr/src/app ${FOLDER}
	docker stop trivia 
	
clean: # Cleaning cache
	rm -rf ui-app/dist
	@echo "docker image rm trivia:test"  

	@if test ${image}; then \
		docker image rm ${image} ; \
	fi