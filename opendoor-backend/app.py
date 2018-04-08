# coding=utf8

from flask import Flask, request
from flask_restful import Resource, Api
from socket import socket, AF_INET, SOCK_DGRAM
import os

app = Flask(__name__)
api = Api(app)

def trans(s):
    return "b'%s'" % ''.join('\\x%.2x' % x for x in s)

class OpenDoor(Resource):
    def get(self):
        try:
            data_1 = b'\x20\x40\x7e\x00\x29\x00\x00\x00\x00\x00\x00\x00\x9e\x4a\x4c\x0d\x00\x00\x02\x00\x01\x00\x00\x00\xff\xff\xff\xff\xff\xff\xff\xff\x01\x00\x00\x00'
            data_2 = b'\x20\x40\x26\xd4\x8f\x00\x00\x00\x00\x00\x00\x00\x9e\x4a\x4c\x0d\x00\x00\x02\x00\x01\x00\x00\x00\xff\xff\xff\xff\xff\xff\xff\xff\x00\x00\x00\x00'
            args = request.args
            if ('door' in args) and (args['door'] == '1' or args['door'] == '2'):
                data = data_1 if args['door'] == '1' else data_2
                clientSocket = socket(AF_INET, SOCK_DGRAM)
                clientSocket.sendto(data, (os.environ['BACKEND_HOST'], int(os.environ['BACKEND_PORT'])))
                return {'message': 'successful', 'data': trans(clientSocket.recv(1024))}
            else:
                return {'message': 'failed, door not specified!'}
        except BaseException as e:
            return {'message': str(e)}
    
api.add_resource(OpenDoor, '/opendoor')

if __name__ == '__main__':
    if 'BACKEND_HOST' in os.environ and 'BACKEND_PORT' in os.environ:
        app.run(host='0.0.0.0', debug=True)
    else:
        print("BACKEND_HOST or BACKEND_PORT not set in environment, exit now!")