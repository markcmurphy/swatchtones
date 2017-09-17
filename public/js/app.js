const app = angular.module('MyApp', []);
console.log('app.js');

app.controller('mainController', ['$http', function($http) {
  const controller = this;
  this.products = {};
  this.swatches = {};

  this.getSwatches = () => {
    $http({
      method: 'GET',
      url: '/swatches'
    }).then(response => {
      console.log('get swatches ran');
      this.swatches = response.data;
    })
    .catch(err => console.log(err));
  }

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

// form submit for products
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

  // form submit for swatches
  this.processSwatch = () => {
    $http({
      method: 'POST',
      url: '/swatches',
      data: {
        Id: this._id,
        product: this.product,
        imageLink: this.imageLink,
        productColor: this.productColor,
        skinTone: this.skinTone
      }
    }).then(response => {
      console.log('post swatch ran');
      console.log(response.data);
    })
    .catch(err => console.log(err));
  }

this.getSwatches();


this.getProducts();

//  end of mainController
}]);
