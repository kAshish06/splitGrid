import angular from 'angular'

var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
  $scope.data = ['sksjdhdskfhdfihghgvuhaiuhhjvuhdfkjgvsdfkj', 'Ashish', 'Ankit', 'Sachin', 'Sneha',
  'Rajesh', 'Amit', 'Mayur', 'Smit', 'Sumit', 'Vani', 'Dhaval', 'Amod', 'Jitin', 'Piyush', 'Rahul']
});

app.directive('splitGrid', function($window) {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      noOfColumns: '@'
    },
    template: `
      <div class="container">
        <div class="inline-div" ng-repeat="column in columns" ng-style="columnWidth">
          <ul>
            <li class="list" ng-repeat="item in column.data">{{item}}</li>
          </ul>
        </div>
      </div>
      {{data}}
    `,
    compile: function(tElement, tAttrs) {
      return {
        post: (scope, elem, attrs) => {          
          scope.columns = [];
          let createColumns = () => {
            decideWidth();
            for( let i = 0; i < parseInt(scope.noOfColumns, 10); i++) {
              let columnObject = {};
              columnObject.id = i;
              columnObject.data = [];
              scope.columns.push(columnObject);
            };
          }
          let decideWidth = () => {
            let colWidth = 90/parseInt(scope.noOfColumns, 10);
            scope.columnWidth = {
              width: colWidth + '%'
            };
          };
          scope.$watch('data', (newVal, oldVal) => {
            if(newVal !== undefined && newVal !== null) {
              if(newVal.length > 0) {
                createColumns();
                for(let i = 0; i <= scope.data.length;) {
                  let j = 0;
                  debugger;
                  for(j; j < scope.columns.length; j++) {
                    let data = scope.data[i+j];
                    if(data !== undefined) {
                      scope.columns[j].data.push(data);
                    };
                    
                  }
                  i = i+j;
                }
              }
            }
          })
          //createColumns();
        }
      }
    }
  }
})
