/**
 * Created with JetBrains WebStorm.
 * User: agurha
 * Date: 25/05/2013
 * Time: 07:16
 * To change this template use File | Settings | File Templates.
 */
var should = require('should');

var redis = require('redis');
var redisClient;

describe('usermodel', function () {

  before(function (done) {

    redisClient = redis.createClient();
    done();

  });

  it('should create user', function (done) {

    var user = require('../models/user')(redisClient);

    var email = 'ankur.gurha@gmail.com';
    var password = 123456;

    var usermodel = {};
    usermodel.email = 'ankur.gurha@gmail.com';
    usermodel.password = '123456';
    usermodel.username = 'agurha';


    user.createUser(usermodel, function (err, result) {

      console.log('result we got is : ' + result);

      result.should.be.true;

      done();

    });

  });

  it('should get user by username', function(done){

    var user = require('../models/user')(redisClient);

    var username = 'agurha';

    user.getUserByUserName(username, function(err, result){

      result.should.have.property('email');
      result.should.have.property('id');

      done();

    })

  });
})