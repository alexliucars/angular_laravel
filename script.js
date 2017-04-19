var app = angular.module('myapp', ['ngRoute']).run(function ($rootScope) {
  $rootScope.isShow1 = false;
  $rootScope.isShow2 = false;
  $rootScope.isShow3 = true;

});
var valuestore;
app.config(function ($routeProvider) {
  $routeProvider.when('/home', {
    template: 'This is my home page!',
    controller: 'HomeController'
  })
    .when('/Moniter', {
      templateUrl: 'profile.html',
      controller: 'pController'
    })
    .when('/Add_student', {
      templateUrl: 'message.html',
      controller: 'msController'

    })
    .when('/logout', {
      templateUrl: 'index.html',
      controller: 'logoutController'
    })
    .when('/details', {
      templateUrl: 'Details.html',
      controller: 'dController'
    })
    .when('/sendmessage', {
      templateUrl: 'sendmessage.html',
    })
    .when('/signup', {
      templateUrl: 'signup.html',
      controller: 'signupController'
    })
});


//home controller
app.controller('HomeController', ['HS', function (HS) {
  HS.main();
}]);

//log in controller
app.controller('logController', ['$scope', 'HS', 'storeuser', '$location', '$http', function ($scope, HS, storeuser, $location, $http) {
  $scope.LOGIN = function () {
    var request = $http({
      method: "post",
      url: "login.php",
      data: {
        'username': this.username,
        'password': this.password
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    request.success(function (data) {
      if (data) {
        HS.main();
        storeuser.setuser(data);
        $location.path('/home');
      }
      else {
        alert('Please input the valid username and password');
      }
    })
      .error(function () {
        $scope.data = "error in fetching data";
        console.log($scope.data);
      });
  }
  $scope.signup = function () {
    HS.detail();
    $location.path('/signup');
  }
  $scope.logout = function () {
    storeuser.setuser('');
  }
}]);
app.controller('logoutController', ['$scope', 'HS', '$http', function ($scope, HS, $http) {
  HS.login();
  $http.get("logout.php").then(function (response) {
    console.log(response.data);
  });
}]);
app.controller('SendController', ['$scope', '$location', 'HS', '$http', function ($scope, $location, HS, $http) {
  HS.detail();
  // $scope.names = ["history", "math", "mandarin", "biochemical"];
  $http.get("getclass.php").then(function (response) {
    if (response.data == 'not') {
      HS.login();
      $http.get("logout.php").then(function (response) {
        console.log(response.data);
      });
    }
    else {
      $scope.cname = response.data;
    }
  });
  $http.get("getsubject.php").then(function (response) {
    if (response.data == 'not') {
      HS.login();
      $http.get("logout.php").then(function (response) {
        console.log(response.data);
      });
    }
    else {
      $scope.subname = response.data;
    }
  });
  $scope.atdata = function () {
    if (!$scope.sname || !$scope.score1 || !$scope.pinfo || !$scope.score || !$scope.class|| !$scope.score2|| !$scope.score3) {
      alert("Please input all spaces please!");
    }
    else {

      var request = $http({
        method: "post",
        url: "insertinfo.php",
        data: {
          'sname': $scope.sname,
          // 'subject': $scope.subject,
          'pinfo': $scope.pinfo,
          'score': $scope.score,
          'class': $scope.class,
          'score1':$scope.score1,
          'score2':$scope.score2,
          'score3':$scope.score3,
          'subject':$scope.subname[0],
          'subject1':$scope.subname[1],
          'subject2':$scope.subname[2],
          'subject3':$scope.subname[3],
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      request.success(function (data) {
        if (data == 'not') {
          HS.login();
          $http.get("logout.php").then(function (response) {
            console.log(response.data);
          });
        }
        else {
          console.log(data);
          alert("Insert successful!");
        }
      }).error(function () {
        $scope.data = "error in fetching data";
      });
    }
  };
  $scope.back = function () {
    $location.path('/Add_student');
    HS.main();
  }
}]);

app.controller('pController', ['$scope', '$location', 'HS', '$http', 'ClassStudent', function ($scope, $location, HS, $http, ClassStudent) {
  // $scope.cname = ["Class1", "Class2", "Class3", "Class4"];
  $http.get("getclass.php").then(function (response) {
    if (response.data == 'not') {
      HS.login();
      $http.get("logout.php").then(function (response) {
        console.log(response.data);
      });
    }
    else {
      $scope.cname = response.data;
    }
  });
  $http.get("getstudent.php").then(function (response) {
    if (response.data == 'not') {
      HS.login();
      $http.get("logout.php").then(function (response) {
        console.log(response.data);
      });
    }
    else {
      $scope.sname = response.data;
    }
  });
  $scope.find = function () {
    ClassStudent.setC($scope.class);
    ClassStudent.setS($scope.student);
    if (!$scope.class || !$scope.student) {
      alert("Please select option");
    }
    else {
      
      $location.path('/details');

    }
  }
}]);
app.controller('dController', ['$scope', '$http', 'ClassStudent', 'HS', '$location', function ($scope, $http, ClassStudent, HS, $location) {
  var request = $http({
    method: "post",
    url: "showdetails.php",
    data: {
      'sname': ClassStudent.getS(),
      'cname': ClassStudent.getC()
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  request.success(function (data) {
    if (data == 'not') {
      HS.login();
      $http.get("logout.php").then(function (response) {
        console.log(response.data);
      });
    }
    else {
      if (data != 'no_such_records') {
        HS.detail();
        $scope.data = data;
        console.log(data);
      }
      else {
        alert("Data not exist!");
        HS.main();
        $location.path('/Moniter');
      }
    }
  }).error(function () {
    $scope.data = "error in fetching data";
  });
  $scope.CAverage = function (data) { //calculate average
    var sum = 0;
    if (data) {
      for (var i = 0; i < data.length; i++) {
        sum += parseInt(data[i].score, 10);
      }

      var avg = sum / data.length;
      return avg;
    }
  };

  $scope.back = function () {
    $location.path('/Moniter');
    HS.main();
  }
}]);
app.controller('msController', ['$scope', '$location', function ($scope, $location) {
  $scope.sendMS = function () {
    $location.path('/sendmessage');
  };

}]);
app.controller('signupController', ['$scope', 'HS', '$location', '$http', function ($scope, HS, $location, $http) {
  $scope.sub = function () {
    if (!$scope.username || !$scope.password) {
      alert('You should type username or the password!');
    }
    else {
      var request = $http({
        method: "post",
        url: "signup.php",
        data: {
          'username': $scope.username,
          'password': $scope.password
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      request.success(function (data) {


        if (data == 'insert successfull!') {
          alert('Signup successful!');
          HS.login();
          $location.path('/');
        }
        else {
          alert('error');
        }
        // alert("Insert successful!");
        // HS.detail();
        // $location.path('/details');

      }).error(function () {
        $scope.data = "error in fetching data";
      });
    }
  }
  $scope.back = function () {
    HS.login();
    $location.path('/');
  }
}])


app.factory('HS', ['$rootScope', function ($rootScope) {//hide and show
  return {
    login: function () {
      $rootScope.isShow1 = false;
      $rootScope.isShow2 = false;
      $rootScope.isShow3 = true;
    },
    main: function () {
      $rootScope.isShow1 = true;
      $rootScope.isShow2 = true;
      $rootScope.isShow3 = false;
    },
    detail: function () {
      $rootScope.isShow1 = false;
      $rootScope.isShow2 = true;
      $rootScope.isShow3 = false;
    }
  }
}]);
app.factory('storeuser', function () {//get the login user name factory
  var storeusername;
  return {
    setuser: function (value) {
      storeusername = value;
    },
    getuser: function () {
      return storeusername;
    }
  }
})
app.factory('ClassStudent', function () {//store the selected students information in Moniter
  var Class;
  var Student;
  return {
    setS: function (value) {
      Student = value;
    },
    setC: function (value) {
      Class = value;
    },
    getS: function () {
      return Student;
    },
    getC: function () {
      return Class;
    }

  }
})
















// app.controller('getdetailController', ['$scope', 'HS', function ($scope, HS) {
//   if (valuestore) {
//     console.log(valuestore);
//     $scope.output = valuestore.details;
//     HS.detail();
//   }
// }]);
// app.controller('backController', ['$scope', '$location', 'HS', function ($scope, $location, HS) {
//   $scope.backhome = function () {
//     $location.path('/message');
//     HS.main();
//   }
// }]);


// app.factory('locals', ['$window', function ($window) {//get and set localstorage factory
//   return {
//     set: function (key, value) {
//       $window.localStorage[key] = value;
//     },
//     get: function (key, defaultValue) {
//       return $window.localStorage[key] || defaultValue;
//     },
//     setObject: function (key, value) {
//       $window.localStorage[key] = JSON.stringify(value);
//     },
//     getObject: function (key) {
//       return JSON.parse($window.localStorage[key] || '{}');
//     }
//   }
// }]);
// app.factory('transvalue', ['$window', function ($window) {//send message factory
//   return {
//     trans: function (title, sender, receiver, details, imp) {
//       var key = 'app' + (title.length + sender.length) + receiver.length * (details.length - title.length) + details.length;
//       var value = '{ "title":"' + title + '","sender":"' + sender + '","receiver":"' + receiver + '","details":"' + details + '","important":"' + imp + '" }';
//       $window.localStorage[key] = value;
//     },
//     important: function (title, sender, receiver, details, imp, key) {
//       var value = '{ "title":"' + title + '","sender":"' + sender + '","receiver":"' + receiver + '","details":"' + details + '","important":"' + imp + '" }';
//       $window.localStorage[key] = value;
//     }
//   }
// }]);
