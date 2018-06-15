# Course Instructions 11-Deployment

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
9.  Click the blue button `Launch Instances` then click [View Instances](https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2)


**Note** Remember where the .pem key is, or safe a backup somewhere.  You loose it, you loose access to the instance (server).

## Now we are done setting up the instances, let's ssh into it
1.  [View Instances](https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2)
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

## Now we are in our server
#### What are needed in our instance for our backend server to run?
[Week 8 Slide, page 9](https://docs.google.com/presentation/d/1FHtnNt2D-y9bvDC4mYqBAir5LytVxC4XompRgWNjtpA/edit#slide=id.g3c64275ecd_0_98)

We need at least
  - Web Server (Nginx)
  - Server environment which runs JS (Node.js)

Optional
  - mongodb
