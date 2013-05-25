/**
 * Created with JetBrains WebStorm.
 * User: agurha
 * Date: 24/05/2013
 * Time: 16:23
 * To change this template use File | Settings | File Templates.
 */

module.exports = function (redis) {

  console.log('we created user model module');

  var user = {

    createUser: function (usermodel, cb) {

      console.log('username: ' + usermodel.username);
      console.log('email:' + usermodel.email);
      console.log('password:' + usermodel.password);

      redis.incr('user:id', function (error, id) {
        if (error) {
          cb(error)
        }

        redis.multi()
          .hset('users:', usermodel.username, id)
          .hmset('user:' + usermodel.username, {
            id : id,
            username: usermodel.username,
            email: usermodel.email,
            password: usermodel.password

          })
          .exec(function (err, results) {
            if (err)
              cb(err, false);

            console.log('user inserted successfully');

            cb(null, true);

          });
      })
    },

    getUserByUserName: function (username, cb) {

      console.log('username passed to us is :' + username);

      redis.multi()
        .hgetall('user:' + username)
        .exec(function (err, result) {

          if (err)
            cb(err, null)


          console.log('we got the result out where email is : ' + result[0].email);

          cb(null, {
            id: result[0].id,
            email: result[0].email,
            password: result[0].password,
            username: result[0].username
          })

        });
    },

    deleteUser: function () {

    },

    validateUser: function () {

    },

    updateUserPassword: function () {

    },

    getAllUsers: function () {


    }


  };

  return user;


}