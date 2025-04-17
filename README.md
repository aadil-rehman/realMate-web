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
