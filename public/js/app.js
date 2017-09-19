const app = angular.module('MyApp', []);
console.log('app.js');

app.controller('mainController', ['$http', function($http) {
  const controller = this;
  this.products = {};
  this.swatches = {};
  this.formdata = {};


// get swatches
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
        productName: this.formdata.productName,
        productBrand: this.formdata.productBrand
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
      this.getSwatches();
    })
    .catch(err => console.log(err));
  }

this.getSwatches();
this.getProducts();

//  end of mainController
}]);
