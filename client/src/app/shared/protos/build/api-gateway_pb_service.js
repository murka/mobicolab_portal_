// package: api_gateway_service
// file: api-gateway.proto

var api_gateway_pb = require("./api-gateway_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ApiGatewayService = (function () {
  function ApiGatewayService() {}
  ApiGatewayService.serviceName = "api_gateway_service.ApiGatewayService";
  return ApiGatewayService;
}());

ApiGatewayService.SavingDoc = {
  methodName: "SavingDoc",
  service: ApiGatewayService,
  requestStream: false,
  responseStream: false,
  requestType: api_gateway_pb.SavingData,
  responseType: google_protobuf_empty_pb.Empty
};

ApiGatewayService.downloadDoc = {
  methodName: "downloadDoc",
  service: ApiGatewayService,
  requestStream: false,
  responseStream: false,
  requestType: api_gateway_pb.docId,
  responseType: api_gateway_pb.File
};

exports.ApiGatewayService = ApiGatewayService;

function ApiGatewayServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ApiGatewayServiceClient.prototype.savingDoc = function savingDoc(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ApiGatewayService.SavingDoc, {
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

ApiGatewayServiceClient.prototype.downloadDoc = function downloadDoc(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ApiGatewayService.downloadDoc, {
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

exports.ApiGatewayServiceClient = ApiGatewayServiceClient;

