angular.module('orderCloud')
    .controller('CreatePriceModalCtrl', CreatePriceModalController)
;

function CreatePriceModalController($exceptionHandler, $uibModalInstance, SelectPriceData, ocProductPricing, toastr) {
    var vm = this;
    vm.buyerName = SelectPriceData.Buyer.Name;
    vm.product = SelectPriceData.Product;
    vm.previousPriceSchedule = angular.copy(SelectPriceData.Product.SelectedPrice);
    vm.selectedBuyer = SelectPriceData.Buyer;
    vm.priceSchedule = {
        RestrictedQuantity: false,
        PriceBreaks: [],
        MinQuantity: 1,
        OrderType: 'Standard'
    };

    vm.addPriceBreak = addPriceBreak;
    vm.deletePriceBreak = deletePriceBreak;

    function addPriceBreak() {
        var numberExist = _.findWhere(vm.priceSchedule.PriceBreaks, {Quantity: vm.quantity});
        if (vm.quantity > vm.priceSchedule.MaxQuantity) {
            toastr.error('Max quantity exceeded', 'Error');
        } else {
            numberExist === undefined
                ? vm.priceSchedule.PriceBreaks.push({Price: vm.price, Quantity: vm.quantity})
                : toastr.error('Quantity already exists. Please delete and re-enter quantity and price to edit', 'Error');
        }
        ocProductPricing.PriceBreaks.DisplayQuantity(vm.priceSchedule);
        vm.priceSchedule = ocProductPricing.PriceBreaks.SetMinMax(vm.priceSchedule);
        vm.quantity = null;
        vm.price = null;
    }

    function deletePriceBreak(index) {
        vm.priceSchedule.PriceBreaks.splice(index, 1);
        vm.priceSchedule = ocProductPricing.PriceBreaks.SetMinMax(vm.priceSchedule);
    }

    vm.cancel = function () {
        $uibModalInstance.dismiss();
    };

    vm.submit = function() {
        ocProductPricing.CreatePrice(vm.product, vm.priceSchedule, vm.selectedBuyer)
            .then(function(data) {
                SelectPriceData.CurrentAssignments.push(data.Assignment);
                $uibModalInstance.close({SelectedPrice: data.NewPriceSchedule, UpdatedAssignments:SelectPriceData.CurrentAssignments});
            })
            .catch(function (ex) {
                $exceptionHandler(ex);
            });
    };
}