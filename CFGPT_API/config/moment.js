var moment = require('moment');
var ejs = require('ejs');

ejs.filters.fromNow = function(date){
  return moment(date).fromNow()
}
ejs.filters.formatDate = function(date){
  return moment(date).format('DD/MM/YYYY HH:mm');
}
ejs.open = '<%';
ejs.close = '%>';

