import axios from 'axios';

export function getDepartments() {
  return axios.get('https://backendapi.turing.com/departments');
}

export function getCategoriesByDepartment(departmentId) {
  return axios.get(
    `https://backendapi.turing.com/categories/inDepartment/${departmentId}`
  );
}
