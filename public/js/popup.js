const openPopupAdd = () => {
  document.getElementById("add-popup").style.display = "block";
}

const closePopupAdd = () => {
  document.getElementById("add-popup").style.display = "none";
}

const openPopupUpdate = () => {
  document.getElementById("update-popup").style.display = "block";
}

const closePopupUpdate = () => {
  document.getElementById("update-popup").style.display = "none";
}

const deleteChoice = () => {
  return confirm('May co muon xoa no k');
}