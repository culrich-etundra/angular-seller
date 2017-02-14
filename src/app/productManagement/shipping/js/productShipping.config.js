angular.module('orderCloud')
    .config(ProductShippingConfig)
;

function ProductShippingConfig($stateProvider) {
    $stateProvider
        .state('productDetail.shipping', {
            url: '/shipping',
            templateUrl: 'productManagement/shipping/templates/productShipping.html',
            controller: 'ProductShippingCtrl',
            controllerAs: 'productShipping',
            resolve: {
                AdminAddresses: function(OrderCloud) {
                    return OrderCloud.AdminAddresses.List();
                }
            }
        })
    ;
}