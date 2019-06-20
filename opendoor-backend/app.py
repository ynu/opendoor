# coding=utf8

from flask import Flask, request
from flask_restful import Resource, Api
from socket import socket, AF_INET, SOCK_DGRAM
import os
import traceback

app = Flask(__name__)
api = Api(app)

def trans(s):
    return "b'%s'" % ''.join('\\x%.2x' % x for x in s)

dataDict={
    '1': b'\x20\x40\x7e\x00\x29\x00\x00\x00\x00\x00\x00\x00\x9e\x4a\x4c\x0d\x00\x00\x02\x00\x01\x00\x00\x00\xff\xff\xff\xff\xff\xff\xff\xff\x01\x00\x00\x00',
    '2': b'\x20\x40\x26\xd4\x8f\x00\x00\x00\x00\x00\x00\x00\x9e\x4a\x4c\x0d\x00\x00\x02\x00\x01\x00\x00\x00\xff\xff\xff\xff\xff\xff\xff\xff\x00\x00\x00\x00',
    '3': b'\x20\x40\x0f\x45\x0a\x00\x00\x00\x00\x00\x00\x00\x74\xc8\x4c\x0d\x00\x00\x02\x00\x01\x00\x00\x00\xff\xff\xff\xff\xff\xff\xff\xff\x00\x00\x00\x00',
    '4': b'\x20\x40\x0d\x91\x0c\x00\x00\x00\x00\x00\x00\x00\x74\xc8\x4c\x0d\x00\x00\x02\x00\x01\x00\x00\x00\xff\xff\xff\xff\xff\xff\xff\xff\x01\x00\x00\x00',
}

doorHostMapping = {
    '1': 'BACKEND_HOST_1',
    '2': 'BACKEND_HOST_1',
    '3': 'BACKEND_HOST_2',
    '4': 'BACKEND_HOST_2',
}

class OpenDoor(Resource):
    def get(self):
        try:
            args = request.args
            if ('door' in args) and (args['door'] in dataDict):
                data = dataDict[args['door']]
                print("opening door {door}, using udp data {data}".format(door=args['door'], data=data))
                clientSocket = socket(AF_INET, SOCK_DGRAM)
                clientSocket.sendto(data, (os.environ[doorHostMapping[args['door']]], int(os.environ['BACKEND_PORT'])))
                return {'message': 'successful', 'data': trans(clientSocket.recv(1024)), 'host': (os.environ[doorHostMapping[args['door']]], int(os.environ['BACKEND_PORT']))}
            else:
                return {'message': 'failed, door not specified or not support!'}
        except BaseException as e:
            return {'message': traceback.format_exc()}

api.add_resource(OpenDoor, '/opendoor')

if __name__ == '__main__':
    if 'BACKEND_HOST_1' in os.environ and 'BACKEND_HOST_2' in os.environ and 'BACKEND_PORT' in os.environ:
        app.run(host='0.0.0.0', debug=True)
    else:
        print("BACKEND_HOST or BACKEND_PORT not set in environment, exit now!")
