// package: template_preview
// file: template-preview.proto

var template_preview_pb = require("./template-preview_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var TemplatePreview = (function () {
  function TemplatePreview() {}
  TemplatePreview.serviceName = "template_preview.TemplatePreview";
  return TemplatePreview;
}());

TemplatePreview.GetAllFiles = {
  methodName: "GetAllFiles",
  service: TemplatePreview,
  requestStream: false,
  responseStream: false,
  requestType: template_preview_pb.Null,
  responseType: template_preview_pb.TemplateList
};

exports.TemplatePreview = TemplatePreview;

function TemplatePreviewClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TemplatePreviewClient.prototype.getAllFiles = function getAllFiles(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TemplatePreview.GetAllFiles, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.TemplatePreviewClient = TemplatePreviewClient;

