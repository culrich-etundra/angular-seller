angular.module('orderCloud')
    .controller('ProductSpecEditModalCtrl', ProductSpecEditModalController)
;

function ProductSpecEditModalController($uibModalInstance, SelectedSpec, OrderCloud) {
    var vm = this;
    vm.spec = angular.copy(SelectedSpec);
    vm.specName = SelectedSpec.Name;

    vm.submit = function() {
        if (vm.spec.DefaultValue === "") vm.spec.DefaultValue = null; //Prevent blank strings in the DefaultValue
        vm.loading = OrderCloud.Specs.Update(SelectedSpec.ID, vm.spec)
            .then(function(updatedSpec) {
                $uibModalInstance.close(updatedSpec);
            })
    };

    vm.cancel = function() {
        $uibModalInstance.dismiss();
    };
}