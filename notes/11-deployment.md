# Course Instructions 11-Deployment

## **IMPORTANT**
Anything done on server cannot be undone, please have a habit of making a copy when changing files / settings / or any kind of back up first.

### Contents
- [Setting Up AWS EC2 instance](#ec2-setup)
- [SSH into instance](#ssh)
- [What are needed in our instance for our backend server to run?](#our-needs)
- [Install nginx](#install-nginx)
- [Install nodejs](#install-nodejs)
- [Test nodejs](#test-nodejs)
- [Clone repo](#clone-repo)
- [Install mongodb in instance](#install-mongodb)
- [Run node application](#run-node-app)
- [PM2](#pm2)
- [Nginx Proxy](#nginx-proxy)
- [DNS setup with domain provider](#dns-setup1)
- [DNS setup with instance](#dns-setup2)
- [Disable IP access](#ip-access)
- [HTTPS with certbot](https://certbot.eff.org/)
- [Debug Reminder](#debug-reminder)
- [Extra](#extra)

## Setting Up AWS EC2 instance
1.  [Login to your aws management console](https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Fconsole%2Fhome%3Fstate%3DhashArgs%2523%26isauthcode%3Dtrue&client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fhomepage&forceMobileApp=0)
2.  Find and select [EC2 services](https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2) (use the search bar or click on the services at the top left of the nav)

3.  Now you are in EC2 Dashboard, the left nav choose [Instances](https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2#Instances:)
4.  You'll see a list of your instances here, click on [Launch Instance](https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2#LaunchInstanceWizard:) blue button
5.  Go through the list and find `Ubuntu Server 16.04 LTS`, then click the `select` button to the left.
6.  You will see a list of instance type here, choose whichever fits your need.  This can be changed in the future.  Click `Review and Launch` blue button to the bottom right
    - [On Demand Pricing](https://aws.amazon.com/ec2/pricing/on-demand/)
    - [On Spot Pricing](https://aws.amazon.com/ec2/spot/pricing/)
7.  Click `Launch` blue button to the bottom right.
8.  You will be asked to `create` or chose an `existing` key pair.  This is used to ssh into your instance (server)
    - `!IMPORTANT DO NO LOSE THE KEY` as it can be downloaded once only without changes in the future.
    - `create` -> enter a name for the key (filename), NO SPECIAL CHARACTERS `**DOWNLOAD IT!**`
    - `existing` -> just select a key created from before
9.  Click the blue button `Launch Instances` then click [View Instances](https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2#Instances:sort=instanceState)


**Note** Remember where the .pem key is, or safe a backup somewhere.  You loose it, you loose access to the instance (server).

## Now we are done setting up the instances, let's ssh into it <a name='ssh'></a>
1.  [View Instances](https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2#Instances:sort=instanceState)
2.  Find the column name `IPv4 Public IP` this is your `instance public ip`.  Copy it.
3.  SSH into server using terminal (windows, use git-bash terminal)
	- `ssh -i <location of .pem> ubuntu@<instance public ip>`
  - e.g.
    - `ssh -i /home/my/key.pem ubuntu@32.238.283.283`
    - `ssh -i c:\where\my\key\is.pem ubuntu@32.238.283.283` (for windows)
4.  See something like this? Don't pantic, computer want your file to be more secure since this is an important file.
```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
```
5.  Run command below in `terminal`
  - `sudo chmod 400 <location of .pem>`
6.  Try step 3 again then you will see something like this in your terminal,
```
Welcome to Ubuntu 16.04.4 LTS (GNU/Linux 4.4.0-1060-aws x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  Get cloud support with Ubuntu Advantage Cloud Guest:
    http://www.ubuntu.com/business/services/cloud

0 packages can be updated.
0 updates are security updates.



The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.


ubuntu@ip-172-31-39-27:~$ 
```
7.  `ubuntu@ip-172-31-39-27:~$` this means you are logged in as user name `ubuntu`

## What are needed in our instance for our backend server to run? <a name='our-needs'></a>
[Week 8 Slide, page 9](https://docs.google.com/presentation/d/1FHtnNt2D-y9bvDC4mYqBAir5LytVxC4XompRgWNjtpA/edit#slide=id.g3c64275ecd_0_98)

We need at least
  - Web Server (Nginx)
  - Server environment which runs JS (Node.js)

Optional
  - mongodb

## Now we are in our server, let's install nginx first. <a name='install-nginx'></a>
1.  [Install nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)  Run these two commands in terminal
    - `sudo apt-get update -y` [What does this do?](https://askubuntu.com/questions/222348/what-does-sudo-apt-get-update-do)
    - `sudo apt-get install nginx`
2.  Open any web browser input your `instance_public_ip` instead of an url.  See what shows up.
3.  Anything such as a message saying `Welcome to nginx!` showed up? [Why not](#debug-reminder)?
4.  Now we have a simple static page running online.

<a name='notes-nginx'></a>**Notes**
```
Commands usually used
  - sudo service nginx <options>
    - <options>: start|stop|restart|reload|status
  - nginx -t  # checks if nginx setting have wrong syntax or look weird

Where are static files usually stored 
	- /var/www/html/  (by default)
	- can be defined anywhere you want it to be located
```

## Since we got the web server running, let's install nodejs. <a name='install-nodejs'></a>
1.  [Install nodejs](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)  Run these two commands in terminal
  - `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - `
  - `sudo apt-get install nodejs -y`
2.  Run these two commands in terminal to see if `node` and `npm` are installed
  - `node -v` and `npm -v`

## Test if nodejs works <a name='test-nodejs'></a>
-  inside the instance create a file named `hello.js`
-  use `vim` or `nano` to open editor then paste the following code inside `hello.js`
```
#!/usr/bin/env nodejs
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8080, 'localhost');
console.log('Server running at http://localhost:8080/');
```
-  save `hello.js` then exit the editor
-  run this command saying this file is excutable `chmod +x ./hello.js`
-  run this command `node hello.js` (looks familiar when you are developing locally?)

-  open a new terminal, ssh into the cloud server `ssh -i <location of .pem> ubuntu@<instance public ip>`
-  run this in the new terminal after you are in `curl http://localhost:8080`
-  What do you see?  Now close this terminal if you see what is expected.  [Why not](#security-group)?


## Clone repo <a name='clone-repo'></a>
1.  in server terminal enter `cd` to make sure you are in user root directory
2.  go to your [repo](https://github.com/webdxd/web-tweet-express)
3.  Find the green `Clone or download` button. Click on it then copy the url
    -  make sure it starts with `https` not `git` because we did not setup any ssh key to access `git` directly which is prefered and more secure, instructions below for yourself to read.
    -  [Generate SSH Key and add to ssh agent](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)
    -  [Add SSH key to github](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)
4.  in server termainl enter `pwd` and you should see `/home/ubuntu` as return saying you are in root directory of this user
5.  now enter `git clone https://github.com/webdxd/web-tweet-express.git` which will ask your `github` account's usernamd and password
6.  in server terminal enter `cd web-tweet-express/` which bring us into the directory
7.  enter `git checkout 11-deployment` to change to the branch we are to deploy with
8.  enter `npm i` when you are in the directory to install `node_modules` needed
9.  enter `node app.js`, what are you expecting?

## Setup mongodb locally in the instance <a name='install-mongodb'></a>
1.  [Install MongoDB](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)  Run these two commands in terminal
  - `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927`
  - `echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list`
  - `sudo apt-get update -y`
  - `sudo apt-get install -y mongodb-org`
2.  This should install mongodb correctly, let's run `mongod` and see what happens. [Why not](#debug-mongodb)?
3.  When `mongod` is running without errors, exit `mongod` by using `ctrl + c`
4.  Run `sudo service mongod status`, if not running then run `sudo service mongod start`
5.  Run `sudo systemctl enable mongod`  // this will automatically start mongod on boot up
6.  Run `mongo`, now we are inside the `mongo shell` which you were taught how to use command line to `show dbs;` and do others
7.  Run `show dbs;`, if you see some dbs then you have set this up correctly~ Hooray~

<a name='notes-mongod'></a>**Notes**
```
Commands usually used
  - sudo service mongod <options>
    - <options>: start|stop|restart|status
```

## Run node application <a name='run-node-app'></a>
1.  `cd ~/web-tweet-express`  // go into your repo
2.  `node app.js`, what are you expecting this time?
3.  go to your browser type in `instance_public_ip:3000`, what is happening and why?

## Use pm2 <a name='pm2'></a>
#### Why using pm2? this will keep node application running even if your terminal is closed
1.  [npm pm2](https://www.npmjs.com/package/pm2) `sudo npm install -g pm2`
2.  `cd ~/web-tweet-express`  // go into your repo
3.  `pm2 start app.js`
4.  `pm2 startup systemd`  // this will generate a script which makes pm2 auto start on boot
  - script will look like
  - `sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u <username> --hp /home/<username>`

<a name='notes-pm2'><a/>**Notes**
```
Commands often use
  - pm2 <options> appName
    - <options>: start|delete|stop|restart
  - pm2 save  # this will save the application list to start up on boot
  - pm2 logs  # shows the log real time
```

## Nginx Proxy <a name='nginx-proxy'></a>
#### Doesn't the url with port look ugly and weird? Let's change it with proxy setting
1.  `cd /etc/nginx/sites-available/`
2.  `ls`  // what do you see in here? by default there is only one file named default
3.  let's make a cp of this original file so we can reverse anytime if there is error
4.  `sudo cp default default.bak`  // cp file `default` into a new file named `default.bak`
5.  use either `vim` or `nano` editor of your choices and run `sudo nano default`
6.  lots of things here are commented out, delete those lines if you wish
7.  change the scripts in `location` block
```
Originally looks like
location / {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        try_files $uri $uri/ =404;
}

Change to
    location / {
        proxy_pass http://localhost:8080;  # match your application port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
8.  Change the port number as suggested above
9.  After the change, run `sudo nginx -t` to check if there is errors with the configuration files
10.  `sudo service nginx reload`, now go to your browser and only enter the `instance_public_ip`.  What is expected here?


## DNS setup Part 1 <a name='dns-setup1'></a>
#### Since domain provider's page are all different so this is just a brief on how to setup
1.  Login into your domain provider such as godaddy, hostgator and so on.
2.  Find where the dns setting is, or google somethign like godaddy dns setup
3.  When you are at the dns setting, there will be a few fields such as
  - type  (the type of dns you want to create)
  - name | host ( the name / subdomain )
  - ttl ( cache refresh )
  - address | value | points to ( where you want the record to direct to )
4.  We will be using
  - type -> A
  - name -> api (this means the `subdomain` so the url will look like `api.domain.com`)
  - ttl -> (as low as you can go)
  - address -> `instance_public_ip`
5.  The above setting means, when we enter `api.domain.com` on browser, it'll redirect to this instance `32.238.283.283`

## DNS setup Part 2 <a name='dns-setup2'></a>
#### After we are done with the settings in domain provider, we should make changes to our instance settings too
1.  SSH into server using terminal (windows, use git-bash terminal)
    - `ssh -i <location of .pem> ubuntu@<instance public ip>`
2.  go to the `site-available` directory
    - `cd /etc/nginx/site-available`
3.  to be more organized, I would suggest one domain one setting file
4.  go to `site-enable` directory where is linked with `site-available` to enable the config
5.  `sudo rm default`  // to delete the file default which will disable the setting
6.  Let's make a copy of this file and clean up the file too
    - `sudo cp default <full domain name>`
7.  remove all the lines that has comments
8.  remove these too
```
  listen 80 default_server;
  listen [::]:80 default_server;

  root /var/www/html;

  # Add index.php to the list if you are using PHP
  index index.html index.htm index.nginx-debian.html;

```
9.  replace
```
  # replace
  listen 80 default_server;
  listen [::]:80 default_server;
  # with
  listen 80;
```
10.  The whole file should look something similiar to
```
server {
        listen 80;

        server_name <full domain name>;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
}
```
11.  Symbolic to `site-enable`
    - `sudo ln -s /etc/nginx/site-avaiable/<full domain name> /etc/nginx/site-enable/<full domain name>`
12.  `sudo nginx -t` // check if config is good without errors
13.  `sudo service nginx reload`  // reload the service

## Disable IP access <a name='ip-access'></a>
1.  SSH into server using terminal (windows, use git-bash terminal)
    - `ssh -i <location of .pem> ubuntu@<instance public ip>`
2.  go to the `site-available` directory
    - `cd /etc/nginx/site-available`
3.  make a new file here `sudo nano <filename>`  // filename of your choice
4.  add these into it
```
server {  
    listen      80;
    listen      443; # add this to block HTTPS access
    server_name <server_ip>;
    return      404;
}
```
5.  Symbolic to `site-enable`
    - `sudo ln -s /etc/nginx/site-avaiable/<filename> /etc/nginx/site-enable/<filename>`
6.  `sudo nginx -t` // check if config is good without errors
7.  `sudo service nginx reload`  // reload the service


## <a name="debug-reminder"></a>Debug reminder
1.  Make sure aws port is opened by using <a name='security-group'></a>[Security Group](https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2#SecurityGroups:sort=groupId)
  - make sure the ports needed are open, especially `port 80`
  - click on the security group your instance is using
  - click on the `inbound` tab choose `edit`, then `Add Rule`
  - enter your type, protocol, port range and source (HTTP and HTTPS are already predefined, just choose the one you need)

2.  If you are connecting to mongodb locally, is it installed? <a name='debug-mongodb'></a>
  - if yes, what does the error message say?
    - [/data/db not found](https://stackoverflow.com/questions/7948789/mongodb-mongod-complains-that-there-is-no-data-db-folder)?
      - basically need a folder where stores the db info and usually by default it's in `/data/db` which does not exist yet
      - enter `sudo mkdir -p /data/db`
    - [/data/db/mongod.lock errno:13 Permission denied](https://stackoverflow.com/questions/7948789/mongodb-mongod-complains-that-there-is-no-data-db-folder)?
      - permission of `/data/db` is not set correctly
      - run these two commands
        - `sudo chown -R $USER /data/db`  // changes ownership to current user
        - `sudo chmod -R go+w /data/db`  // changes mode to writable

3.  Any modification to nginx's file, remember to restart / reload nginx for settings to load


## <a name="extra"></a>Extra
1.  Few commands to remember which would help 
  - [nginx](#notes-nginx)
  - [mongod](#notes-mongod)
  - [pm2](#notes-pm2)

2.  Reference urls
  - [Login to your aws management console](https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Fconsole%2Fhome%3Fstate%3DhashArgs%2523%26isauthcode%3Dtrue&client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fhomepage&forceMobileApp=0)
  - [EC2 services](https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2)
  - [Instances List](https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2#Instances:)
  - [Launch Instance](https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2#LaunchInstanceWizard:)
  - [Install nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)
  - [Install nodejs](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)
  - [Generate SSH Key and add to ssh agent](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)
  - [Add SSH key to github](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)
  - [Install MongoDB](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)
