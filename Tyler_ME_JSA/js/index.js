// import class
import loggedUserClass from "../class/loggedUserClass.js";
import cartClass from "../class/cartClass.js";
import drugClass from "../class/drugClass.js";
import lastLoginClass from "../class/lastLoginClass.js";
// import cookieClass from "../class/cookieClass.js";
// const cookieObj = new cookieClass();

// declare variable
let logedUser = null;
let lastLogins = [];
let drugMap = new Map();

// start angluar app
const myApp = angular.module('myApp', ['ngRoute']);
// create routes
myApp.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl',
        })
        .when('/drug-list', {
            templateUrl: 'templates/drug-list.html',
            controller: 'drugListCtrl',
        })
        .when('/manage-order', {
            templateUrl: 'templates/manage-order.html',
            controller: 'manageOrderCtrl',
        })
        .when('/log-report', {
            templateUrl: 'templates/log-report.html',
            controller: 'logReportCtrl',
        })
        .otherwise({
            redirectTo: 'templates/404.html',
        });
});
myApp.run(function ($rootScope, $location) {
    console.log('sessionStorage.getItem(loggedUser): ', sessionStorage.getItem('loggedUser'));
    if (sessionStorage.getItem('loggedUser') == null) {
        console.log('sessionStorage.getItem(loggedUser) == null');
        $location.path('/');
    } else {
        console.log('sessionStorage.getItem(loggedUser) != null');
        fetch('../data/user-details.json').then(
            (response) => {
                response.json().then((users) => {
                    users.forEach((user) => {
                        if (user.username == sessionStorage.getItem('loggedUser')) {
                            console.log('sessionStorage.getItem(loggedUser): ', sessionStorage.getItem('loggedUser'));
                            logedUser = new loggedUserClass(user.userid
                                , user.fName
                                , user.lName
                                , user.email
                                , user.phone
                                , user.username
                                , user.pass
                                , user.role);
                        }
                    });
                });
            }
        );
        $location.path('/drug-list');
    }

    // if user is not logged in, redirect to login page
    if (!$rootScope.logFlag) {
        $location.path('/');
    }

    $rootScope.cartList = [];
    $rootScope.totalSum = function () {
        return $rootScope.cart.calTotal();
    }
    // sign out
    $rootScope.sigout = function () {
        $rootScope.logFlag = false;
        sessionStorage.removeItem('loggedUser');
        $location.path('/');
    }
})
// username and password, role
// create controllers
myApp.controller('loginCtrl', function ($scope, $rootScope, $location) {
    console.log('loginCtrl');
    $scope.login = function () {
        fetch('./data/user-details.json').then(
            (data) => {
                data.json().then((users) => {
                    users.forEach((user) => {
                        // $scope.username = "aguttridge0";
                        // $scope.pass = "bCZfGEr";
                        // $scope.role = "user";
                        if (user.username == $scope.username && user.pass == $scope.pass && user.role == $scope.role) {
                            console.log('user found');
                            $rootScope.logFlag = true;
                            logedUser = new loggedUserClass(user.userid, user.fName, user.lName, user.email, user.phone, user.username, user.pass, user.role);
                            $rootScope.logedUser = logedUser;
                            $rootScope.cart = new cartClass(logedUser.toObject().userid);
                            // set session
                            sessionStorage.setItem('loggedUser', logedUser.toObject().username);
                            // last login
                            // $rootScope.lastLoginMap = new lastLoginClass(logedUser.toObject().userid, logedUser.toObject().username, new Date()).toObject();
                            let datetime = new Date().toLocaleString()
                            let lastLogin = new lastLoginClass(logedUser.toObject().userid, logedUser.toObject().fName, logedUser.toObject().lName, datetime);
                            lastLogins.push(lastLogin);
                            $rootScope.lastLogins = lastLogins;
                            $location.path('/drug-list');
                            return false;
                        }
                    })
                    console.log('user not found');
                })
            }
        )
    }
});
myApp.controller('drugListCtrl', function ($scope, $rootScope, $http, $location) {
    console.log('drugListCtrl');
    if (!$rootScope.logFlag) {
        $location.path('/');
    }
    // load data
    try {
        $http.get('../data/drugs-data.json').then(
            (response) => {
                if (response.status == 200) {
                    $scope.drugs = response.data;
                    response.data.forEach((value) => {
                        let drug = new drugClass(value.drugID, value.drugName, value.productOf, value.price);
                        drugMap.set(value.drugID, drug);
                    })
                }
            },
            (reject) => { console.log(reject) }
        )
    } catch (e) {
        console.log(e);
    };

    $scope.selected = function (drugID) {
        let selectedDrug = '';
        if ($rootScope.cart.searchProduct(drugID)) {
            selectedDrug = $rootScope.cart.getProduct(drugID);
            selectedDrug.amount += 1;
        } else {
            selectedDrug = { ...drugMap.get(drugID).toObject(), amount: 1 };
        }
        let item = { drugID: drugID, obj: selectedDrug };
        $rootScope.cart.addProduct(item);
        $rootScope.cartList = [];
        for (const value of $rootScope.cart.returnValues()) {
            $rootScope.cartList.push(value);
        }
        $rootScope.totalSum();
    };

});
myApp.controller('manageOrderCtrl', function ($scope, $rootScope, $location) {
    console.log('manageOrderCtrl');
    // if user is not logged in, redirect to login page
    if (!$rootScope.logFlag) {
        $location.path('/');
        // if user is not user redirect to login page
    }
    // else if ($rootScope.logedUser.toObject.role != 'user') {
    //     $location.path('/');
    // }
    // remove item from cart
    $scope.remove = function (drugID) {
        $rootScope.cart.removeProduct(drugID);
        $rootScope.cartList = [];
        for (const value of $rootScope.cart.returnValues()) {
            $rootScope.cartList.push(value);
        }
        $rootScope.totalSum();
    }
});
myApp.controller('logReportCtrl', function ($scope, $rootScope, $location) {
    console.log('logReportCtrl');
    // if user is not logged in, redirect to login page
    if (!$rootScope.logFlag) {
        $location.path('/');
        // if user is not admin redirect to login page
    }
    // else if ($rootScope.logedUser.toObject.role != 'admin') {
    //     $location.path('/');
    // }
});
