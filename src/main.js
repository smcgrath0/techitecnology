document.addEventListener("DOMContentLoaded", init);

function init() {
  var people = getNamesData();
  document.querySelector('.hamburger').addEventListener('click', (event) => {
    document.querySelector('.hamburger').style.display = "none";
    document.querySelector('.xButton').style.display = "flex";
    document.querySelector('.dropdown').style.display = "block"
  })
  document.querySelector('.xButton').addEventListener('click', (event) => {
    document.querySelector('.hamburger').style.display = "block";
    document.querySelector('.xButton').style.display = "none";
    document.querySelector('.dropdown').style.display = "none"
  })
  document.querySelector(".homedd").addEventListener('click', (event) => {
    document.querySelector('.hamburger').style.display = "block";
    document.querySelector('.xButton').style.display = "none";
    document.querySelector('.dropdown').style.display = "none"
  })
  document.querySelector(".MeetTheTeamdd").addEventListener('click', (event) => {
    document.querySelector('.hamburger').style.display = "block";
    document.querySelector('.xButton').style.display = "none";
    document.querySelector('.dropdown').style.display = "none"
  })
  document.querySelector(".Contactdd").addEventListener('click', (event) => {
    document.querySelector('.hamburger').style.display = "block";
    document.querySelector('.xButton').style.display = "none";
    document.querySelector('.dropdown').style.display = "none"
  })
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
        if (employees[i + random].name.length >= 16) {
          document.querySelector('.personTextContainer' + (i+1)).style['margin-top'] = '69%';
          document.querySelector('.personTextContainer' + (i + 1)).onmouseenter = (event) => {
            event.target.style['margin-top'] = '0%';
          }

          document.querySelector('.personTextContainer' + (i + 1)).onmouseleave = (event) => {
            event.target.style['margin-top'] = '69%';
          }
        }
        if (employees[i + random].name === 'Michelangelo Buonarroti'){
          document.querySelector('#personName' + (i + 1)).style.color = 'black';
        }


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
