module.exports = (function () {

    return {
        local: { // localhost
            host: 'bp1.brandprofiling.co.kr',
            port: '3306',
            user: 'bp2',
            password: 'Perception.bp2@',
            database: 'bp2'
        },
        real: { // real server db info
            host: 'bp1.brandprofiling.co.kr',
            port: '3306',
            user: 'bp2',
            password: 'Perception.bp2@',
            database: 'bp2'
        },
        dev: { // dev server db info
            host: 'bp1.brandprofiling.co.kr',
            port: '3306',
            user: 'bp2',
            password: 'Perception.bp2@',
            database: 'bp2'
        }
    }

    /*
    return {
        local: { // localhost
            host: '220.230.120.251',
            port: '3306',
            user: 'brand',
            password: 'profiling',
            database: 'brand'
        },
        real: { // real server db info
            host: '220.230.120.251',
            port: '3306',
            user: 'brand',
            password: 'profiling',
            database: 'brand'
        },
        dev: { // dev server db info
            host: '220.230.120.251',
            port: '3306',
            user: 'brand',
            password: 'profiling',
            database: 'brand'
        }
    }
    */
})();
