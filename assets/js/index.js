//me permet d'afficher la modal de suppression
let modal = document.getElementById('exampleModal')
modal.addEventListener('show.bs.modal', function (event) {
  let button = event.relatedTarget
  let pokeId = button.getAttribute('data-bs-pokeId') // recupere l'id du pokemon a supprimer
  let pokeName = button.getAttribute('data-bs-pokeName') // recupere le nom du pokemon a supprimer
  let modalLink = document.querySelector("#modalLink")
  modalLink.href = `/deletePokemon/${pokeId}`  
  document.querySelector('#pokeName').innerText = `Etes-vous sur(e) de vouloir supprimer le Pokemon ${pokeName} ?`
  modalForm.action = `/deletePokemon/${pokeId}`

})