const app = angular.module('MyApp', ['angular.filter', 'angularFileUpload', 'ui.router']);

app.controller('AppController', function($scope, FileUploader) {
  $scope.uploader = new FileUploader({
      url: 'https://api.imgur.com/3/image',
      alias: 'image',
      headers: {
        'Authorization': 'Client-ID dbae59ffd91b31d'
      },
      autoUpload: true
    }),
    $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
    };
});

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: './partials/main.html'
    })

    .state('home.paragraph', {
      url: '/paragraph',
      template: 'I could sure use a drink right now.'
    })

    .state('products', {
      url: '/products',
      templateUrl: './partials/products.html',
      controller: 'mainController'
    })

    .state('singleProduct', {
      url: '/products/:id',
      templateUrl: './partials/product.html',
      controller: 'mainController',
      resolve: {
      product: ['$stateParams',
            function($stateParams) {
              console.log($stateParams.id);
              return $stateParams.id;
            }
          ]
      }
    })

    .state('users', {
      url: '/users/:id',
      templateUrl: './partials/userProfile.html',
      controller: 'LoginModalCtrl',
      controllerAs: 'auth',
      resolve: {
        user: ['$stateParams',
          function($stateParams) {
            console.log($stateParams.id);
            return $stateParams.id;
          }
        ]
    }
  })

  //end of app.config
});

app.controller('mainController', ['$http', '$stateParams', function($http, $stateParams, $routeProvider, $urlRouterProvider) {
  const controller = this;
  this.products = {};
  this.product = {};
  this.activeProduct = $stateParams;
  this.swatches = {};
  this.formdata = {};
  this.colors = {};
  this.values = {};
  this.rgb = {};


  // get swatches
  this.getSwatches = () => {
    $http({
        method: 'GET',
        url: '/swatches'
      }).then(response => {
        this.swatches = response.data;

      })
      .catch(err => console.log(err));
  }

  this.getSwatchColor = (swatch) => {
    $http({
        method: 'GET',
        url: '/swatches/' + swatch._id
      }).then(response => {
        res.json(response);
      })
      .catch(err => console.log(err));
  }

  // get products
  this.getProducts = () => {
    $http({
        method: 'GET',
        url: '/products'
      }).then(response => {
        this.products = response.data;
      })
      .catch(err => console.log(err));
  }

  this.getProduct = (activeProduct) => {
    $http({
        method: 'GET',
        url: '/products/' + activeProduct.id
      }).then(response => {
        console.log('getProduct ran');
        this.product = response.data;

      })
      .catch(err => console.log(err));
  }

  // edit product
  this.editProduct = function(product) {
      $http({
        method: 'PUT',
        url: '/products/' + product._id,
        data: {
          Id: this._id,
          productName: this.productName,
          productBrand: this.productBrand
        }
      }).then(
        function(res) {
          controller.getProducts();
          controller.getSwatches();
        },
        function(err) {
          console.log(err);
        }
      );
    },

    // delete swatch
    this.deleteSwatch = (swatch) => {
      $http({
        method: 'DELETE',
        url: '/swatches/' + swatch._id
      }).then(
        function(res) {
          controller.getSwatches();
        },
        function(err) {
          console.log(err);
        }
      );
    },

    // delete product
    this.deleteProduct = (product) => {
      $http({
        method: 'DELETE',
        url: '/products/' + product._id
      }).then(
        function(res) {
          controller.getProducts();
          controller.getSwatches();
        },
        function(err) {
          console.log(err);
        }
      );
    },

    // form submit for products
    this.processForm = function() {
      $http({
          method: 'POST',
          url: '/products',
          data: {
            Id: this._id,
            name: this.formdata.name,
            brand: this.formdata.brand
          }
        }).then(response => {
          console.log(response.data);
          controller.formdata = {};
          this.getProducts();
        })
        .catch(err => console.log(err));
    }

  // form submit for swatches
  this.processSwatch = () => {
    $http({
        method: 'POST',
        url: '/swatches',
        data: {
          Id: this._id,
          product: this.product,
          imageLink: this.formdata.imageLink,
          productColor: this.productColor,
          skinTone: this.formdata.skinTone,
          productId: this.formdata.productId
        }
      }).then(response => {
        console.log(response.data);
        controller.formdata = {};
        this.getProducts();
        this.getSwatches();
      })
      .catch(err => console.log(err));
  }
  this.getSwatches();
  this.getProducts();

  //  end of mainController
}]);

app.controller('LoginModalCtrl', ['$http','$stateParams', function($http, $stateParams) {
  const controller = this;
  this.user = {};
  this.isLoggedIn = false;
  this.activeUser = $stateParams;

  this.loginRequired = function(req, res, next) {
    if (req.user) {
      next();
    } else {
      return res.status(401).json({
        message: 'Unauthorized user!'
      });
    }
  };

  this.create = function() {
      $http({
        method: 'POST',
        url: '/sessions/register',
        data: {
          email: this.email,
          password: this.password
        }
      })
    },

    this.login = function() {
      $http({
        method: 'POST',
        url: '/sessions/login',
        data: {
          email: this.email,
          password: this.password
        }
      }).then(
        function(response) {
          console.log(response.data.foundUser);
          this.isLoggedIn = true;
          this.user = response.data.foundUser;
          localStorage.setItem('token', JSON.stringify(response.data.token));
        }.bind(this))
    },

    this.logout = function() {
      localStorage.clear('token');
      location.reload();
    }

  this.getUsers = function() {
    $http({
      method: 'POST',
      url: '/users',
      headers: {
        token: JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(response) {
      this.user = response.data;
      this.error = "Unauthorized";
    }.bind(this));
  }

  this.getSingleUser = function(activeUser) {
    $http({
      method: 'GET',
      url: '/users/' + activeUser.id,
      headers: {
        token: JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(response) {
      console.log('get single user ran');
      this.user = response.data;
      this.error = "Unauthorized";
    }.bind(this));
  }

// to run on page load
  this.getUsers();
  // end of LoginModalCtrl
}]);
