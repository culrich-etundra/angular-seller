angular.module('orderCloud')
    .config(BuyerConfig)
;

function BuyerConfig($stateProvider) {
    $stateProvider
        .state('buyer', {
            parent: 'base',
            url: '/buyers/:buyerid',
            templateUrl: 'buyerManagement/buyer/templates/buyer.html',
            controller: 'BuyerCtrl',
            controllerAs: 'buyer',
            data: {
                pageTitle: 'Buyer Settings'
            },
            resolve: {
                SelectedBuyer: function ($stateParams, sdkOrderCloud) {
                    return sdkOrderCloud.Buyers.Get($stateParams.buyerid);
                }
            }
        })
}