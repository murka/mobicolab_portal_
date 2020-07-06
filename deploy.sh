docker build -t mark600/mobicolab_portal_api_acts -f ./acts/Dockerfile ./acts
docker build -t mark600/mobicolab_portal_api_gateway -f ./api-gateway/Dockerfile ./api-gateway
docker build -t mark600/mobicolab_portal_api_bridge -f ./bridge/Dockerfile ./bridge
docker build -t mark600/mobicolab_portal_client -f ./client/Dockerfile ./client
docker build -t mark600/mobicolab_portal_customers -f ./customers/Dockerfile ./customers
docker build -t mark600/mobicolab_portal_api_files -f ./files/Dockerfile ./files
docker build -t mark600/mobicolab_portal_api_general_customers -f ./general-customers/Dockerfile ./general-customers
docker build -t mark600/mobicolab_portal_api_labs -f ./labs/Dockerfile ./labs
docker build -t mark600/mobicolat_portal_api_subscriptions -f ./api-subscriptions/Dockerfile ./api-subscriptions
docker push mark600/mobicolab_portal_api_acts
docker push mark600/mobicolab_portal_api_gateway
docker push mark600/mobicolab_portal_api_bridge
docker push mark600/mobicolab_portal_client
docker push mark600/mobicolab_portal_api_customers
docker push mark600/mobicolab_portal_api_general_customers
docker push mark600/mobicolab_portal_api_labs
docker push mark600/mobicolab_portal_api_subscriptions
# kubectl aplly -f k8s