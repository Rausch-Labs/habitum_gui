
import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

var PROTO_PATH = __dirname + '/src/assets/gRPC/main.proto';

var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });

const GRPC_CLIENT = grpc.loadPackageDefinition(packageDefinition);

export default GRPC_CLIENT;