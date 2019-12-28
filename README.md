# data-collector-server
Stateless NodeJS web-server implementation for scalable session management

Please follow the next installation & usage instructions:

Prerequisite:
Make sure to have Docker installed on your machine

Steps:
1. git clone https://github.com/ynevet/data-collector-server.git
2. cd data-collector-server
3. Run: docker-compose up OR docker-compose up --scale node-app=5 (to scale out with 5 instances)
4. If no errors reported, keep to the next step (otherwise, investigate or file an issue: https://github.com/ynevet/data-collector-server/issues/new)
5. Browse to: http://localhost:4000/
6. Submit some data and analyze the network traffic to the /collect route (cookie should be dropped in the browser for sessionID)
7. In addition, your session state should be displayed on the page after submitting the form