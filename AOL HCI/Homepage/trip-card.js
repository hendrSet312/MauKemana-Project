var modal = document.getElementById("myModal");
var links = document.querySelectorAll('.menu-section .item');
var span = document.getElementsByClassName("close")[0];

let dict_content = {
  'Gelora_Bung_Karno' : {'name':'Gelora Bung Karno',
                          'location':'📍 DKI Jakarta',
                          'date':'📅 25 March 2024 - 29 March 2024',
                        'status':'⌛ Upcoming',
                        'jpg_link':'../img/plans/gbk.jpeg'
                      },
  'Raja_Ampat' : {'name':'Raja Ampat',
    'location':'📍 Papua Barat',
    'date':'📅 30 March 2024 - 31 March 2024',
  'status':'✅ Completed',
  'jpg_link':'../img/plans/raja-ampat.jpg'}                     
};



links.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    let destinationName = this.getAttribute('href').replace('#', '');
    let destinationData = dict_content[destinationName];
    if (destinationData) {
      document.querySelector('.name-destination').textContent = destinationData.name;
      document.querySelector('.location-destination').textContent = destinationData.location;
      document.querySelector('.date-destination').textContent = destinationData.date; 
      document.querySelector('.status').textContent = destinationData.status;
      document.querySelector('.image img').src = destinationData.jpg_link;
      
      let stats_value = destinationData.status;

      if (stats_value === '✅ Completed') {
        document.querySelector('.status').style.backgroundColor = 'green';
      } else if (stats_value === '🚗 Ongoing') {
        document.querySelector('.status').style.backgroundColor = 'blue';
      } else {
        document.querySelector('.status').style.backgroundColor = 'grey';
      }
    }
    modal.style.display = "block";
  });
});

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.querySelector('.status').addEventListener('click', function() {
  var select = document.createElement('select');
  select.classList.add('status');

  var options = ['✅ Completed', '🚗 Ongoing', '⌛ Upcoming'];
  options.forEach(option => {
      var opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      if (this.textContent === option) {
          opt.selected = true;
      }
      select.appendChild(opt);
  });

  var statusParagraph = this; // Store a reference to the paragraph
  this.replaceWith(select);
  select.focus();

  var saveButton = document.createElement('button');
  saveButton.textContent = 'Save Changes';
  saveButton.style.display = 'none';

  select.parentNode.insertBefore(saveButton, select.nextSibling);

  select.addEventListener('change', function() {
      saveButton.style.display = 'block';
      if (this.value === '✅ Completed') {
          this.style.backgroundColor = 'green';
      } else if (this.value === '🚗 Ongoing') {
          this.style.backgroundColor = 'blue';
      } else {
          this.style.backgroundColor = 'grey';
      }
  });

  saveButton.addEventListener('click', function() {
      statusParagraph.textContent = select.value; // Update the paragraph
      statusParagraph.classList.add('status', 'upcoming');
      if (select.value === '✅ Completed') {
          statusParagraph.style.backgroundColor = 'green';
      } else if (select.value === '🚗 Ongoing') {
          statusParagraph.style.backgroundColor = 'blue';
      } else {
          statusParagraph.style.backgroundColor = 'grey';
      }
      select.replaceWith(statusParagraph); // Replace the select element with the paragraph
      this.remove();
  });
});