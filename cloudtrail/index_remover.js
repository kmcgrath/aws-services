
exports.handler = function (event, context) {

  var AWSCloudTrail = require('../lib/cloudtrail.js');
  var aws_trail = new AWSCloudTrail();

  var fs = require("fs");
  data = fs.readFileSync(__dirname + '/data.json', {encoding:'utf8'});
  data_json = JSON.parse(data);

  var input = {
    profile: (event.profile === undefined) ? null : event.profile,
    region: event.region,
    trailName: data_json.trailName
  };

  var functionChain = [
    {func:aws_trail.findTrails, success:aws_trail.isLogging, failure:succeeded, error:context.fail},
    {func:aws_trail.isLogging, success:aws_trail.stopLogging, failure:aws_trail.deleteTrail, error:context.fail},
    {func:aws_trail.stopLogging, success:aws_trail.deleteTrail, failure:context.fail, error:context.fail},
    {func:aws_trail.deleteTrail, success:succeeded, failure:context.fail, error:context.fail},
  ]
  input.functionChain = functionChain;

  function succeeded(input) { context.done(null, true); }
  function failed(input) { context.done(null, false); }

  input.functionChain[0].func(input);
};
