var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope, $sce) {
	$scope.names = [{id:"12345", name:"Jean-Daniel Pearson", name_other:"JDownloader", city:"Alma, Qc", phone:"416 555-1212", faxphone:"416 555-1212", cellphone:"", email:"fake@yopmail.com"},
					{id:"12346", name:"Jean-Paul Houde", name_other:"1234-5678 QUÉBEC INC.", city:"Québec, QC", phone:"416 555-0100", faxphone:"", cellphone:"416 555-0199", email:"fake@yopmail.com"},
					{id:"12347", name:"Aperture science", name_other:"", city:"Québec, QC", phone:"416 555-0199", faxphone:"", cellphone:"416 555-0199", email:""}];
	
	function escapeRegExp(string){
		return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	
	var regex;
	var iOS_isUsed = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
	$scope.search = '';
	$scope.$watch('search', function (value) {
		regex = new RegExp('\\b' + escapeRegExp(value), 'i');
	});
	
	$scope.filterBySearch = function(contact) {
		if (!$scope.search) return false;
		value = (regex.test(contact.name) || regex.test(contact.name_other));
		return value;
	};

    $scope.deliberatelyTrustDangerousSnippet = function(value) {
    	if (iOS_isUsed){
			return $sce.trustAsHtml("<a href=googlegmail:///co?subject=&body=&to="+value+">"+value+"</a>");
    	} else {
			return $sce.trustAsHtml("<a href=mailto:"+value+">"+value+"</a>");
    	}
    };
});