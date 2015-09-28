#angular-base
A simple project from which angular projects can be started.

##Install Dependencies
This project uses `gulp` and `jspm`, as well as `compass` to make your development life easier. So you will need to install the necessary dependencies. First, make sure you [have ruby installed](https://www.ruby-lang.org/en/documentation/installation/)  first, then use the following commands to install all other dependencies:
```shell
#Install compass
gem install compass

#Install global commands used by gulp
sudo npm install -g gulp jspm jspm-bower-endpoint

#Setup jspm bower endpoint
jspm registry create bower jspm-bower-endpoint

#Install local node modules
npm install
```


##Start Working
The gulp file can be modified *and is in need of updating* to fit your projects needs, here are some of the useful commands:
```shell
#build dist project
gulp

#compile dist and host it on port 5003 while watching for file updates
gulp host
```
