
# AWSConfig

AWS Lambda functions to manage the AWSConfig Service


## How To Setup

    $ make \
      -e AWS_ACCESS_KEY_ID=<access_key> \
      -e AWS_SECRET_ACCESS_KEY=<secret_key> \
      -e AWS_SESSION_TOKEN=<session_token> \
      -e AWS_REGION=<region>


## How To Update Lambda Function Codes

    $ make buildlambda \
      -e AWS_ACCESS_KEY_ID=<access_key> \
      -e AWS_SECRET_ACCESS_KEY=<secret_key> \
      -e AWS_SESSION_TOKEN=<session_token> \
      -e AWS_REGION=<region>


## How To Remove Service

    $ make clean \
      -e AWS_ACCESS_KEY_ID=<access_key> \
      -e AWS_SECRET_ACCESS_KEY=<secret_key> \
      -e AWS_SESSION_TOKEN=<session_token> \
      -e AWS_REGION=<region>


## How To Test Lambda Functions

    $ cd test
    $ node run_lambda <function_name>
      where
        <function_name> is 'one of 'index_checker', 'index_enabler' or 'index_remover'
