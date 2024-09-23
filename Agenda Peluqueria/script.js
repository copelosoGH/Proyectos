document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointmentForm');
    const nameInput = document.getElementById('name');
    const dayInput = document.getElementById('day');
    const timeInput = document.getElementById('time');
    const appointmentsList = document.getElementById('appointmentsList');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
  
    // Cargar turnos al iniciar
    loadAppointments();
  
    appointmentForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const name = nameInput.value.trim();
      const day = dayInput.value;
      const time = timeInput.value.trim();
  
      if (!name || !day || !time) {
        showErrorMessage();
        return;
      }
  
      addAppointment(name, day, time);
      nameInput.value = '';
      dayInput.value = '';
      timeInput.value = '';
      showSuccessMessage();
    });
  
    function addAppointment(name, day, time) {
      const appointments = getAppointmentsFromLocalStorage();
      
      // Agregar el nuevo turno
      appointments.push({ name, day, time });
  
      // Ordenar los turnos por día y luego por hora
      const dayOrder = { 
        "Lunes": 1, 
        "Martes": 2, 
        "Miércoles": 3, 
        "Jueves": 4, 
        "Viernes": 5, 
        "Sábado": 6 
      };
      
      appointments.sort((a, b) => {
        // Ordenar por día primero
        if (dayOrder[a.day] !== dayOrder[b.day]) {
          return dayOrder[a.day] - dayOrder[b.day];
        }
        // Si los días son iguales, ordenar por hora
        return a.time.localeCompare(b.time);
      });
  
      // Guardar los turnos ordenados en localStorage
      localStorage.setItem('appointments', JSON.stringify(appointments));
      loadAppointments();
    }
  
    function loadAppointments() {
      const appointments = getAppointmentsFromLocalStorage();
      appointmentsList.innerHTML = '';
  
      if (appointments.length === 0) {
        appointmentsList.innerHTML = '<tr><td colspan="4" class="text-center">No hay turnos programados.</td></tr>';
        return;
      }
  
      appointments.forEach((appointment, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${appointment.day}</td>
          <td>${appointment.time}</td>
          <td>${appointment.name}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteAppointment(${index})"><i class="bi bi-trash"></i></button></td>
        `;
        appointmentsList.appendChild(tr);
      });
    }
  
    function getAppointmentsFromLocalStorage() {
      const appointments = localStorage.getItem('appointments');
      return appointments ? JSON.parse(appointments) : [];
    }
  
    window.deleteAppointment = function(index) {
      const appointments = getAppointmentsFromLocalStorage();
      appointments.splice(index, 1);
      localStorage.setItem('appointments', JSON.stringify(appointments));
      loadAppointments();
    };
  
    function showErrorMessage() {
      errorMessage.classList.remove('d-none');
      successMessage.classList.add('d-none');
    }
  
    function showSuccessMessage() {
      successMessage.classList.remove('d-none');
      errorMessage.classList.add('d-none');
      setTimeout(() => {
        successMessage.classList.add('d-none');
      }, 3000);
    }
  });
  