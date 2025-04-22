## Notes

- # Deployement :
- Signup on AWS
- Launch Instance
- chmod 400 <secret>.pem
- run the command ssh -i <pem file> <ec2 url>
- install the node (exact version as in local m/c)
- install project code from github repo

- Frontend :
  - npm i (install dependencies)
  - npm run build
  - sudo apt update (update the VM)
  - sudo apt install nginx
  - sudo systemctl start nginx (start the nginx http server)
  - sudo systemctl enable nginx (enable ngnix)
  - copy code from /dist folder to /var/www/html/
  - copy command for above (sudo scp -r dist/\* /var/www/html/) //here -r means recursively with nested folder structure
  - Enable port :80 in aws console
-
- Backend :

  - npm i
  - allowed ec2 instance public ip on mongodb network access list
  - npm install pm2 -g
  - pm2 start npm -- start
  - pm2 logs (to check pm2 logs)
  - more pm2 command to explore - pm2 list, pm2 stop <name>, pm2 delete <name>
  - config nginx (port to /api) - "sudo nano /etc/nginx/sites-available/default"
  - open this file and edit it, give server name and below srcipt to bypass :3000 to /api
  - restart nginx after editing - "sudo systemctl restart nginx"
  - modify the BASE_URL in frontend project to /api

  Frontend : http://13.60.245.225
  Backend : http://13.60.245.225/api/

  nginx config :

  server_name : 13.60.245.225

  location /api/ {
  proxy_pass http://127.0.0.1:3000/;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection keep-alive;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_cache_bypass $http_upgrade;
  }

  # Adding a custom domain

  - Purchased domain name from domain provider like godaddy, gynadot
  - signup on cloudfare and add a new domain name
  - change the nameserver on godaddy (or from where you purchased domain) and point it to cloudfare
  - DNS record : A realMate.cdf 13.60.245.225
  - Enable SSL for website domain in cloudfare

  # Sending Emails via AWS SES

  - Create a IAM user
  - Give Access to AmazonSESFullAccess
  - Amazon SES : Create an identity
  - Verify your domain name
  - Verify your email address
  - Install AWS SDK -v3
  - Code Example : https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/ses/src/ses_sendemail.js
  - set up sesClient
  - Access credential should be created in IAM under security credentials tab
  - Add the credentials to .env file
  - Write code for SES client
  - Write code for sending email address
  - Make email dynamic by passing more params to run functions
