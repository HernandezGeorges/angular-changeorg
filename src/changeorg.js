
/**
 * Changeorg service that uses the change.org api to retrieve datas on petitions
 */
(function() {
  'use strict';

  var changeorg = function ($http) {


    /**
     * url de l'api de change.org
     */
    var api_url = "/api/v1/petitions/";


    /**
     * Clé publique de l'api
     */
    var api_key = "0e519463fb549bd2f713d11098841d946660d2fb428024b24a596f7a0d624353";


    /**
     * getPetitionId - recupère l'id de la pétition avec l'url encodé passé en paramètrue
     *
     * @param  {string} petition_url url encodé dans le controller
     * @return {object}              chaîne json contenant l'id de la petition
     */
    var getPetitionId = function (petition_url) {
      return $http.get(api_url + "get_id?petition_url=" + petition_url + "&api_key=" + api_key)
                  .then(function (response){
                    return response.data;
                  });
    };


    /**
     * getPetitionById - recupère les infos une pétition avec l'id de la pétition
     *
     * @param  {int} petition_id id de la pétition
     * @return {object}          objet json avec toutes les infos sur la pétition recherchée
     */
    var getPetitionById = function (petition_id) {
      return $http.get(api_url + petition_id + "?api_key=" + api_key)
                  .then(function (response){
                    return response.data;
                  });
    };


    /**
     * anonymous function - recupère les infos d'une pétition avec l'url de la pétition
     *
     * @param  {string} petition_url url encodé de la pétition
     * @return {object}               objet json avec les infos de la pétition recherchée
     */
    var getPetitionByUrl = function (petition_url) {
      return getPetitionId(petition_url).then(function (response) {
        return getPetitionById(response.petition_id);
      });
    };


    return { getPetition: getPetitionByUrl };
  };


  var module = angular.module("changeOrg");
  module.factory("changeorg", changeorg);

}());
