
ROOT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

ifdef AWS_REGION
else
	AWS_REGION := us-east-1
endif

build: upload setup
	# no more tasks

buildlambda: upload update
	# no more tasks

buildnpm:
	npm install;
	cd build.f/particles-alarmalert; npm install;

upload:
	echo $(ROOT_DIR)
	npm install
	cd build.f; node run_upload_code index_saver;

update:
	cd build.f; node run_update_code index_saver;

setup:
	cd build.f/particles-alarmalert; npm install; ./node_modules/.bin/gulp condensation:build;
	cd build.f; node run_stack launch --region $(AWS_REGION) --name AlarmAlertSetup --particles alarmalert;

clean:
	cd build.f; node run_stack drop --region $(AWS_REGION) --name AlarmAlertSetup;
