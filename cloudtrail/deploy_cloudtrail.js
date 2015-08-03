
var argv = require('minimist')(process.argv.slice(2));
var profile = process.env.aws_profile;
var region = process.env.aws_region;
var account = process.env.aws_account;
var action = argv._[0];
var func = argv.f;
console.log('profile = ' + profile);
console.log('region = ' + region);
console.log('account = ' + account);
console.log('action = ' + action);
console.log('func = ' + func);

var LambdaDeployer = require('../lib/lambda_deployer.js');
var deployer = new LambdaDeployer();

var bucketName = account + '.sgas.cto.lambda-files';
var roleName = 'lambda_cloudtrail_execution';
var assumeRolePolicyName = 'lambda_assume_role_policy';
var inlinePolicyName = 'lambda_cloudtrail_execution_policy';
var fileName = 'aws_services.zip';

var functionName = 'cloudtrail-' + func;
var handler = 'cloudtrail/index_' + func + '.handler';
var memorySize = argv.m;
var timeout = argv.t;

input = {
  profile : profile,
  region: region,
  bucketName: bucketName,
  roleName: roleName,
  assumeRolePolicyName: assumeRolePolicyName,
  inlinePolicyName: inlinePolicyName,
  keyName: 'nodejs/' + fileName,
  functionName: functionName,
  handler: handler,
  roleARN : null,
  memorySize: memorySize,
  timeout: timeout,
  zipFile : '../files/' + fileName
};

console.log("\n>>>Starting to " + action + " ...\n");
console.log(input);

deployer[action](input);
