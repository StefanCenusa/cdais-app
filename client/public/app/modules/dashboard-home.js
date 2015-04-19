angular.module('DashboardHome', ['ui.bootstrap'])

    .controller('DashboardHomeCtrl', function () {
        var vm = this;
        vm.data = {
            'username': 'Ana Bruma'
        };

    })
    .controller('PostsController', function(){
        var vm = this;
        vm.posts = [
            {
                'title': 'Nimic special 1',
                'author': 'Marian Morosac',
                'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis dolor, in sagittis nisi. Sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. Aliquam in felis sit amet augue.",
                'photo': "http://placekitten.com/g/150/150",
                'link': 'https://cdais.wordpress.com/2014/03/17/cel-mai-mare-open-din-romania-sg-viii/'
            },
            {
                'title': 'Nimic special 2 ',
                'author': 'Marian Morosac',
                'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis dolor, in sagittis nisi. Sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. Aliquam in felis sit amet augue.",
                'photo': "http://placekitten.com/g/150/150",
                'link': 'https://cdais.wordpress.com/2014/03/17/cel-mai-mare-open-din-romania-sg-viii/'
            },
            {
                'title': 'Nimic special 3 ',
                'author': 'Marian Morosac',
                'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis dolor, in sagittis nisi. Sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. Aliquam in felis sit amet augue.",
                'photo': "http://placekitten.com/g/150/150",
                'link': 'https://cdais.wordpress.com/2014/03/17/cel-mai-mare-open-din-romania-sg-viii/'
            },
            {
                'title': 'Nimic special 4 ',
                'author': 'Marian Morosac',
                'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis dolor, in sagittis nisi. Sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. Aliquam in felis sit amet augue.",
                'photo': "http://placekitten.com/g/150/150",
                'link': 'https://cdais.wordpress.com/2014/03/17/cel-mai-mare-open-din-romania-sg-viii/'
            },
            {
                'title': 'Nimic special 5',
                'author': 'Marian Morosac',
                'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis dolor, in sagittis nisi. Sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. Aliquam in felis sit amet augue.",
                'photo': "http://placekitten.com/g/150/150",
                'link': 'https://cdais.wordpress.com/2014/03/17/cel-mai-mare-open-din-romania-sg-viii/'
            },
            {
                'title': 'Nimic special 6',
                'author': 'Marian Morosac',
                'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis dolor, in sagittis nisi. Sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. Aliquam in felis sit amet augue.",
                'photo': "http://placekitten.com/g/150/150",
                'link': 'https://cdais.wordpress.com/2014/03/17/cel-mai-mare-open-din-romania-sg-viii/'
            },
            {
                'title': 'Nimic special 7',
                'author': 'Marian Morosac',
                'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis dolor, in sagittis nisi. Sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. Aliquam in felis sit amet augue.",
                'photo': "http://placekitten.com/g/150/150",
                'link': 'https://cdais.wordpress.com/2014/03/17/cel-mai-mare-open-din-romania-sg-viii/'
            },
            {
                'title': 'Nimic special 8',
                'author': 'Marian Morosac',
                'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis dolor, in sagittis nisi. Sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. Aliquam in felis sit amet augue.",
                'photo': "http://placekitten.com/g/150/150",
                'link': 'https://cdais.wordpress.com/2014/03/17/cel-mai-mare-open-din-romania-sg-viii/'
            },
            {
                'title': 'Nimic special 9',
                'author': 'Marian Morosac',
                'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis dolor, in sagittis nisi. Sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. Aliquam in felis sit amet augue.",
                'photo': "http://placekitten.com/g/150/150",
                'link': 'https://cdais.wordpress.com/2014/03/17/cel-mai-mare-open-din-romania-sg-viii/'
            },
            {
                'title': 'Nimic special 10',
                'author': 'Marian Morosac',
                'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis dolor, in sagittis nisi. Sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. Aliquam in felis sit amet augue.",
                'photo': "http://placekitten.com/g/150/150",
                'link': 'https://cdais.wordpress.com/2014/03/17/cel-mai-mare-open-din-romania-sg-viii/'
            }
        ];

        vm.filteredPosts = [];
        vm.itemsOnPage = 2;
        vm.currentPage = 1;

        vm.postsToDisplay = function() {
            var begin = ((vm.currentPage - 1) * vm.itemsOnPage);
            var end = begin + vm.itemsOnPage;
            vm.filteredPosts = vm.posts.slice(begin, end);
        };

        vm.postsToDisplay();

        vm.pageChanged = function() {
            vm.postsToDisplay();
        };
    });