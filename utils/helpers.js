const Handlebars = require("handlebars");

function formatDate(date) {
  return `${new Date(date).getMonth() + 1}/${new Date(
    date
  ).getDate()}/${new Date(date).getFullYear()}`;
}

Handlebars.registerHelper("equal", function (val1, val2, options) {
  if (val1 === val2) {
    return options.fn(this);
  } else if (options.inverse) {
    return options.inverse(this);
  } else {
    return null;
  }
});
module.exports = {
  formatDate,
  equal,
};
