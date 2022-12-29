// will use this with register feature
export function addStudent(phoneNumber, name) {
  if (localStorage.getItem(phoneNumber)) {
    return 'invalid';
  }
  localStorage.setItem(phoneNumber, name);
  return 'valid';
}

export function getName(phoneNumber) {
  var name = localStorage.getItem(phoneNumber);
  if (name) {
    return name;
  }
  return 'not found';
}
addStudent('1234567890', 'kyle');
addStudent('1234567899', 'jenny');
addStudent('1234567898', 'anthony');
addStudent('1234567897', 'ethan');
