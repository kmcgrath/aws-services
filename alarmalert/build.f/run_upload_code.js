
var argv = require('minimist')(process.argv.slice(2));
var inputFile = argv._[0];
if (!inputFile) {
  console.log(inputFile);
  console.log("node run_upload_code <input json file name without '.json'>");
  return;
}
console.log('input = ' + inputFile);

var fs = require("fs");
var data = fs.readFileSync(__dirname + '/' + inputFile + ".json", {encoding:'utf8'});
var input = JSON.parse(data);

// change the region with the env value if defined
// and add region name to the bucket -- this is needed because lambda code bucket must be in the same region
console.log('process.env.AWS_REGION : ' + process.env.AWS_REGION)
if (process.env.AWS_REGION)  input.region = process.env.AWS_REGION;
input.bucketName += input.region;
console.log(input);

var uploader = new (require('../../lib/file_uploader'))();
uploader.upload(input, function(err, data) {
  if(err) {
    console.log("Error occurred during uploading codes : " + err);
    process.exit(1);
  }
  else if(data) {
    console.log("Successfully uploaded codes");
    process.exit(0);
  }
  else {
    console.log("Failed to upload codes");
    process.exit(1);
  }
});
