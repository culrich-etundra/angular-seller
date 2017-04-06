angular.module('orderCloud')
    .controller('AdminUserGroupCtrl', AdminUserGroupController)
;

function AdminUserGroupController($state, toastr, OrderCloudSDK, ocAdminUserGroups, SelectedAdminUserGroup) {
    var vm = this;
    vm.group = SelectedAdminUserGroup;
    vm.model = angular.copy(SelectedAdminUserGroup);

    vm.update = function() {
        OrderCloudSDK.AdminUserGroups.Update(vm.group.ID, vm.model)
            .then(function(updatedUserGroup) {
                if (updatedUserGroup.ID != vm.group.ID) $state.go('.', {adminusergroupid:updatedUserGroup.ID}, {notify:false});
                vm.group = updatedUserGroup;
                vm.model = angular.copy(updatedUserGroup);
                SelectedAdminUserGroup = angular.copy(updatedUserGroup);
                toastr.success(vm.group.Name + ' was updated.');
            });
    };

    vm.delete = function() {
        ocAdminUserGroups.Delete(vm.group)
            .then(function() {
                toastr.success(vm.group.Name + ' was deleted.');
                $state.go('adminUserGroups');
            });
    };
}