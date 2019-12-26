# data-collector-server
Stateless NodeJS web-server implementation for scalable session management

Please follow the next installation & usage instructions:

Prerequisite:
Make sure to have Docker installed on your machine

Steps:
1. Clone this repo
2. CD into data-collector-server directory
3. Run the following command: docker-compose up
4. If no errors reported, keep to the next step (otherwise, please contact me)
5. Browse to: http://localhost:4001/
6. Send some data and analyze the network traffic to the /collect route (cookie should be dropped in the browser for sessionID)
7. In addition, your session data should be displayed on the page after submitting the data