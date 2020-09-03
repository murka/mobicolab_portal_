docker build -t mark600/mobicolab_portal_api_acts -f ./acts/Dockerfile ./acts
docker build -t mark600/mobicolab_portal_api_gateway -f ./api-gateway/Dockerfile ./api-gateway
docker build -t mark600/mobicolab_portal_api_bridge -f ./bridge/Dockerfile ./bridge
docker build -t mark600/mobicolab_portal_client -f ./client/Dockerfile ./client
docker build -t mark600/mobicolab_portal_api_customers -f ./customers/Dockerfile ./customers
docker build -t mark600/mobicolab_portal_api_files -f ./files/Dockerfile ./files
docker build -t mark600/mobicolab_portal_api_general_customers -f ./general-customers/Dockerfile ./general-customers
docker build -t mark600/mobicolab_portal_api_labs -f ./labs/Dockerfile ./labs
docker build -t mark600/mobicolab_portal_api_subscriptions -f ./api-subscriptions/Dockerfile ./api-subscriptions
docker build -t mark600/mobicolab_portal_api_templater -f ./templater/Dockerfile ./templater
docker build -t mark600/mobicolab_portal_api_tos -f ./type-of-sample/Dockerfile ./type-of-sample
docker build -t mark600/mobicolab_portal_api_server -f ./server/Dockerfile ./server
docker build -t mark600/mobicolab_portal_api_rules -f ./rules/Dockerfile ./rules
docker push mark600/mobicolab_portal_api_acts
docker push mark600/mobicolab_portal_api_gateway
docker push mark600/mobicolab_portal_api_bridge
docker push mark600/mobicolab_portal_client
docker push mark600/mobicolab_portal_api_customers
docker push mark600/mobicolab_portal_api_files
docker push mark600/mobicolab_portal_api_general_customers
docker push mark600/mobicolab_portal_api_labs
docker push mark600/mobicolab_portal_api_subscriptions
docker push mark600/mobicolab_portal_api_templater
docker push mark600/mobicolab_portal_api_tos
docker push mark600/mobicolab_portal_api_server
docker push mark600/mobicolab_portal_api_rules
# kubectl aplly -f k8s