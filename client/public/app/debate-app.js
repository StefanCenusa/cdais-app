CacheMgr = function () {
    var storage;

    const DEFAULT_TTL = 1000 * 60 * 60 * 4;

    this.init = function (_storage) {
        storage = _storage;
    };

    var clearCache = function () {
        for (var key in storage) {
            this.get(key);
        }
    };

    setInterval(clearCache, DEFAULT_TTL);

    this.set = function (key, value, ttl) {
        ttl = parseInt(ttl);
        var keyTtl = ttl ? ttl : DEFAULT_TTL;
        storage[key] = {
            value: value,
            time: new Date().getTime(),
            ttl: keyTtl
        }
    };

    this.get = function (key) {
        var now = new Date().getTime();
        var value = storage[key];
        if (value) {
            if (now - value.time <= value.ttl) {
                value = value.value;
            } else {
                storage[key] = null;
                value = null;
                delete storage[key];
            }
        }
        return value;
    };
};

CacheManager = new CacheMgr();

angular.module('DebateApp', ['ngStorage', 'app.routes', 'authService', 'ShowcaseApp', 'DashboardApp'])


// application configuration to integrate token into requests
    .config(function ($httpProvider) {
        // attach our auth interceptor to the http requests
        $httpProvider.interceptors.push('AuthInterceptor');
    })

    .controller('MainCtrl', function ($scope, $rootScope, $localStorage) {
        $rootScope.$storage = $localStorage;
        if (!$rootScope.$storage.hasOwnProperty('cache'))
            $rootScope.$storage.cache = {};
        CacheManager.init($rootScope.$storage.cache);
    });


