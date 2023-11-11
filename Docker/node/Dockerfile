FROM node:19-alpine3.16

WORKDIR /home/node/node_hobbys/src

RUN apk add neovim curl git

#RUN apk update && \
   # apk add unzip curl && \
   # curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
   # unzip awscliv2.zip && \
    #./aws/install

#RUN curl -L https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip -o aws-sam-cli.zip && \
 #   unzip aws-sam-cli.zip -d sam-installation && \
  #  ./sam-installation/install

CMD [ "npm", "run", "watch" ]
