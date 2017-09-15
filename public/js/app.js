const app = angular.module('MyApp', []);
console.log('app.js');

app.controller('mainController', ['$http', function($http) {
  const controller = this;
  this.products = {};

  this.getProducts = () => {
    $http({
      method: 'GET',
      url: 'http://makeup-api.herokuapp.com/api/v1/products.json'
    }).then(response => {
      this.products = response.data;
    })
    .catch(err => console.log(err));
    console.log('error');
  }

  this.getProducts();

//  end of mainController
}]);
