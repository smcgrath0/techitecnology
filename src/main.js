document.addEventListener("DOMContentLoaded", init);

function init() {
  // var employees = [];
  var people = getNamesData();
  // people = getDescriptionData(people);

}

function getNamesData() {
  var ajaxConfig = {
    dataType: 'json',
    url: 'https://techi.envivent.com/names.json',
    success: function (result) {
      console.log('2) AJAX Success function called, with the following result:', result);
      var employees = [];
      result.employees.forEach( (employee) => {
        employees.push({ id: employee.id, name: employee.first_name + ' ' + employee.last_name });
      })
      var random = Math.floor(Math.random() * 5);
      for (var i = 0; i < 3; i++) {
        document.querySelector('#personName' + (i + 1)).innerHTML = employees[i + random].name
      }
      getDescriptionData(employees, random)
      return employees;
    }
  }
  $.ajax(ajaxConfig);
}

function getDescriptionData(people, random) {
  var ajaxConfig = {
    dataType: 'json',
    url: 'https://techi.envivent.com/description.json',
    success: function (result) {
      console.log('2) AJAX Success function called, with the following result:', result);
      var employees = [];
      result.employees.forEach((employee) => {
        people.forEach((employee2) => {
          if (employee2.id === employee.id) {
            employee2.title = employee.title;
            employee2.description = employee.description;
          }
        })
      })
      for (var i = 0; i < 3; i++) {
        document.querySelector('.personTitle' + (i + 1)).innerHTML = people[i + random].title;
        document.querySelector('.personDescription' + (i + 1)).innerHTML = people[i + random].description;
      }
      getImagesData(people, random)
      return people;
    }
  }
  $.ajax(ajaxConfig);
}

function getImagesData(people, random) {
  var ajaxConfig = {
    dataType: 'json',
    url: 'https://techi.envivent.com/images.json',
    success: function (result) {
      console.log('2) AJAX Success function called, with the following result:', result);
      var employees = [];
      result.employees.forEach((employee) => {
        people.forEach((employee2) => {
          if (employee2.id === employee.id) {
            employee2.light = result["images-folder"] + employee.light;
            employee2.full = result["images-folder"] + employee.full;
          }
        })
      })
      for (var i = 0; i < 3; i++) {
        document.querySelector('.personContainer' + (i + 1)).style.backgroundImage = "url("+people[i + random].full+")"
      }

      return employees;
    }
  }
  $.ajax(ajaxConfig);
}
