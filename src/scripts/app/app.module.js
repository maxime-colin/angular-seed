/**
 * Injection des dépendances (modules)
 */
angular.module('app', [
	
	// Libs
	'ui.router',
	'ui.bootstrap',

	// Modules
	//'app.moduleName'
]);


/**
 * Routes
 *
 */
angular.module('app').config([
	'$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		// URL root
		$stateProvider.state('app', {
			abstract: true,
			url: '/',
			views: {

			}
		});

		// Route par défaut
		$urlRouterProvider.otherwise('/');
	}
]);
