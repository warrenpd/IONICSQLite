var db = null;
 
var example = angular.module('starter', ['ionic', 'ngCordova'])
    .run(function($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
            db = $cordovaSQLite.openDB("my.db");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
        });
    });


example.controller("ExampleController", function($scope, $cordovaSQLite) {
 
    $scope.insert = function(firstname, lastname) {
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
            alert("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });
    }
 
    $scope.select = function(lastname) {
        var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
        $cordovaSQLite.execute(db, query, [lastname]).then(function(result) {
            if(result.rows.length > 0) {
                console.log("SELECTED -> " + result.rows.item(0).firstname + " " + result.rows.item(0).lastname);
                alert("SELECTED -> "+ result.rows.item(0).firstname + " " + result.rows.item(0).lastname)
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }
 
});