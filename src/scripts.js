(function () {


  var app = angular.module('changeOrg', ['angular-loading-bar'])
                    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
                      cfpLoadingBarProvider.includeSpinner = false;
                    }]);


  /**
   * anonymous function - Controller principal
   *
   * @param  {object} $scope    application model object
   * @param  {type} changeorg   service that fetches change.org's api
   * @param  {type} $log        log service
   * @return {}
   */
  var MainController = function ($scope, changeorg, $log){


    /**
     * anonymous function -     called when a search is completed
     *
     * @param  {object} data    data to be injected inside the scope
     * @return {}
     */
    var onPetitionComplete = function (data) {
      $scope.petition = data;
      $scope.error = "";
      $scope.showError = false;
    };


    /**
     * anonymous function -       invoked when a search has returned and error
     *
     * @param  {object} reason    description
     * @return {type}
     */
    var onError = function (reason) {
      $scope.error = "Données non trouvées !";
      $scope.showError = true;
    };


    /**
     * anonymous function -           add a search function to the scope
     *
     * @param  {sring} petition_url   url of a petition
     * @return {}
     */
    $scope.search = function (petition_url) {
      var url = encodeURIComponent(petition_url);
      changeorg.getPetition(url).then(onPetitionComplete, onError);
    };


    /**
     * Set the title of the page
     */
    $scope.bigTitle = "Pétition sur Change.org";

  };



  /**
   * Set the controller for the entire application
   */
  app.controller("MainController", MainController);

}());
