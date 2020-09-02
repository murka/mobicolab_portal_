docker = docker-compose run --rm
projects = pgadmin envoy db_files api_files api_subscriptions db_acts api_acts db_customers api_customers db_general_customers api_general_customers db_labs api_labs db_tos api_tos db_rules api_rules db_mongo server web api_gateway


init:
	$(foreach project,$(projects),${docker} ${project} npm install;)
	make proto_build

fix_permission:
	sudo chown -R ${USER}:${GROUP} ./
	# ${docker} generic		npm install
proto_build_customer:
	cd ~/Documents/code/mobicolab_portal/apps/proto \ 
	sh ./proto.sh