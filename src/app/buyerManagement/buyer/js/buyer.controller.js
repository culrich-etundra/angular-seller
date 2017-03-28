angular.module('orderCloud')
    .controller('BuyerCtrl', BuyerController)
;

function BuyerController($state, $exceptionHandler, toastr, sdkOrderCloud, ocBuyers, SelectedBuyer){
    var vm = this;
    vm.selectedBuyer = SelectedBuyer;
    vm.settings = angular.copy(SelectedBuyer);

    vm.updateValidity = function() {
        if (vm.settingsForm.buyerIDinput.$error['Buyer.UnavailableID']) vm.settingsForm.buyerIDinput.$setValidity('Buyer.UnavailableID', true);
    };

    vm.updateBuyer = function() {
        vm.updateLoading = sdkOrderCloud.Buyers.Update(SelectedBuyer.ID, vm.settings)
            .then(function(data) {
                vm.selectedBuyer = data;
                vm.settings = angular.copy(data);
                toastr.success(data.Name + ' was updated');
                vm.settingsForm.$setPristine();
            })
            .catch(function(ex) {
                if (ex.status == 409) {
                    vm.settingsForm.buyerIDinput.$setValidity(ex.data.Errors[0].ErrorCode, false);
                    vm.settingsForm.buyerIDinput.$$element[0].focus();
                } else {
                    $exceptionHandler(ex);
                }
            });
    };

    vm.deleteBuyer = function() {
        ocBuyers.Delete(vm.selectedBuyer)
            .then(function() {
                toastr.success(vm.selectedBuyer.Name + ' was deleted.');
                $state.go('buyers');
            });
    };
}