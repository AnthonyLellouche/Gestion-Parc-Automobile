let vehiculeDiv = document.querySelector(".vehiculeDiv");
let formulaireDiv = document.querySelector(".formulaireDiv");
let addButton = document.querySelector(".addButton");
let form = document.querySelector("#formVehicule");
let vehiculeArray = JSON.parse(localStorage.getItem("Vehicule"));

if (vehiculeArray) {
  showVehicule();
} else {
  vehiculeArray = [];
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let data = new FormData(event.target);

  var vehicule;

  if (data.get("type") == "voiture") {
    
    vehicule = new VehiculeVoiture(
      data.get("roue"),
      data.get("couleur"),
      data.get("prix"),
      data.get("puissance"),
      data.get("type"),
      data.get("immatriculation"),
    );
  } else if (data.get("type") == "camion") {
    
    vehicule = new VehiculeCamion(
      data.get("roue"),
      data.get("couleur"),
      data.get("prix"),
      data.get("puissance"),
      data.get("type"),
      data.get("poidsCamion"),
    );
  } else {    
    vehicule = new VehiculeCommerciale(
    data.get("roue"),
    data.get("couleur"),
    data.get("prix"),
    data.get("puissance"),
    data.get("type"),
    data.get("marqueCo"),
  );}

  vehiculeArray.push(vehicule);
  console.log(vehicule);

  showVehicule();

  saveVehicule();
});

function showVehicule() {
  let content = "";

  vehiculeArray.forEach(function (vehicule) {
    if (vehicule.type == "voiture") {
      console.log("voiture", vehicule);
      content += `
      <p>
        roue: ${vehicule.roue}
      <br />
        couleur: ${vehicule.couleur}
      <br />
        prix: ${vehicule.prix}
      <br />
        puissance: ${vehicule.puissance}
      <br/>
        immatriculation: ${vehicule.immatriculation}
      <br/>
        type: ${vehicule.type}
      <br/>
      </p>
      <button class="deleteButton"> Supprimer </button>
      `;
    } else if( vehicule.type == "camion") {
      console.log("camion", vehicule);
      content += `
      <p>
        roue: ${vehicule.roue}
      <br />
        couleur: ${vehicule.couleur}
      <br />
        prix: ${vehicule.prix}
      <br />
        puissance: ${vehicule.puissance}
      <br/>
        type: ${vehicule.type}
      <br/>
        poidsCamion: ${vehicule.poidsCamion}
      <br/>
      </p>
      <button class="deleteButton"> Supprimer </button>
      `;
    } else {
      console.log("else", vehicule);
      content += `
      <p>
        roue: ${vehicule.roue}
      <br />
        couleur: ${vehicule.couleur}
      <br />
        prix: ${vehicule.prix}
      <br />
        puissance: ${vehicule.puissance}
      <br/>
        type: ${vehicule.type}
      <br/>
        marqueCo: ${vehicule.marqueCo}
      <br/>
      </p>
      <button class="deleteButton"> Supprimer </button>
      `;
    }

    vehiculeDiv.innerHTML = content;
  });

  let deleteButton = document.querySelectorAll(".deleteButton");

  deleteButton.forEach(function (button, index) {
    button.addEventListener("click", function () {
      vehiculeArray.splice(index, 1);
      saveVehicule();
      showVehicule();
    });
  });
}

function saveVehicule() {
  const stringVehicule = JSON.stringify(vehiculeArray);
  localStorage.setItem("vehicule", stringVehicule);
}

function Vehicule(roue, couleur, prix, puissance, type) {
  this.roue = roue;
  this.couleur = couleur;
  this.prix = prix;
  this.puissance = puissance;
  this.type = type;
}

function VehiculeVoiture(roue, couleur, prix, puissance, type, immatriculation) {
  Vehicule.call(this, roue, couleur, prix, puissance, type);
  this.immatriculation = immatriculation;
}

function VehiculeCamion(roue, couleur, prix, puissance, type, poidsCamion) {
  Vehicule.call(this, roue, couleur, prix, puissance, type);
  this.poidsCamion = poidsCamion;
}

function VehiculeCommerciale(roue, couleur, prix, puissance, type, marqueCo) {
  Vehicule.call(this, roue, couleur, prix, puissance, type);
  this.marqueCo = marqueCo;
}