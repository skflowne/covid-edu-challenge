FROM gitpod/workspace-full

RUN sudo touch /workspace/covid-edu-challenge/dc-services-sdk-credentials.test.json
RUN sudo echo $DC_SERVICES_CREDENTIALS >> /workspace/covid-edu-challenge/dc-services-sdk-credentials.test.json
RUN sudo echo $DC_SERVICES_PRIVATE_KEY >> /workspace/covid-edu-challenge/private.test.key 

# Install custom tools, runtimes, etc.
# For example "bastet", a command-line tetris clone:
# RUN brew install bastet
#
# More information: https://www.gitpod.io/docs/config-docker/
