import angular from 'angular'

var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
  $scope.data = ['sksjdhdskfhdfihghgvuhaiuhhjvuhdfkjgvsdfkj', 'Ashish', 'Ankit', 'Sachin', 'Sneha',
  'Rajesh', 'Amit', 'Mayur', 'Smit', 'Sumit', 'Vani', 'Dhaval', 'Amod', 'Jitin', 'Piyush', 'Rahul'];

  $scope.bindFunct = () => {
    console.log('Bind func');
  }
});

app.directive('splitGrid', function($window) {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      noOfColumns: '@',
      onSelection: '&'
    },
    template: `
      <div class="container">
        <div class="inline-div" ng-repeat="column in columns" ng-style="columnWidth">
          <ul>
            <li class="list" ng-repeat="item in column.data" ng-click="toggleSelection(item, $index);onSelection()" ng-class="{{item.selected}} ? 'selected' : ''">{{item.data}}</li>
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
          };
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
                  for(j; j < scope.columns.length; j++) {
                    let dataObj = {}; 
                    dataObj.data = scope.data[i+j];
                    dataObj.selected = false;
                    if(dataObj.data !== undefined) {
                      scope.columns[j].data.push(dataObj);
                    };
                    
                  }
                  i = i+j;
                }
              }
            }
          });
          scope.toggleSelection = (index, i) => {
            console.log(index);
            console.log(i)
            angular.forEach(scope.columns, (val, ind) => {
              if(val.data.includes(index)) {
                console.log(ind)
                val.data[i].selected = !val.data[i].selected;
              }
            })
          }
          //createColumns();
        }
      }
    }
  }
})
