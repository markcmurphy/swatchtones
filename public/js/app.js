const app = angular.module('MyApp', []);
console.log('app.js');

app.controller('mainController', ['$http', function($http) {
  const controller = this;
  this.products = {};

  this.getProducts = () => {
    $http({
      method: 'GET',
      url: '/products'
    }).then(response => {
      this.products = response.data;
    })
    .catch(err => console.log(err));
  }

  // this.searchForm = () => {
  //   $http({
  //     method: 'POST',
  //     url: 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=' + this.formdata.brand
  //   }).then(response => {
  //     console.log('search');
  //     console.log(response.data);
  //   })
  //   .catch(err => console.log(err));
  // }

// form submit
  this.processForm = function() {
    $http({
      method: 'POST',
      url: '/products',
      data: {
        Id: this._id,
        productName: this.productName,
        productBrand: this.productBrand
      }
    }).then(response => {
      console.log(response.data);
    })
    .catch(err => console.log(err));
  }


this.getProducts();

//  end of mainController
}]);
