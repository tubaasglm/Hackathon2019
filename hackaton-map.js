/*************************Afficher la carte******************************** */
  $("#mapid").css({
    'height':'600px',
    'width': '1200px',
    'margin':'200px'
});  

var mymap = L.map('mapid').setView([50.8466,4.3528], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: ' <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(mymap); 

var marker = L.marker([50.8638372, 4.3607629]).addTo(mymap);
marker.bindPopup("<b>Hello world!</b><br>It's Interface3.  <br> <a href=''> more </a>").openPopup();

/**************************Afficher les buttons*****************************/
/* $("#app").css({
    "padding-top":"200px",
    "display": "flex", 
  "justify-content": "space-around",
}) */
$(".styled").css(
    {
        "border":"0",
        "line-height": "2.5",
        "padding": "0 20px",
        "font-size": "1rem",
        "text-align":"center",
        "color": "#fff",
        "text-shadow": "1px 1px 1px #000",
        "border-radius": "10px",
        "background-color": "rgba(220, 0, 0, 1)",
        "background-image": "linear-gradient(to top left,rgba(0, 0, 0, .2),rgba(0, 0, 0, .2) 30%,rgba(0, 0, 0, 0))",
        "box-shadow": "inset 2px 2px 3px rgba(255, 255, 255, .6), inset -2px -2px 3px rgba(0, 0, 0, .6)"
    }
)
/***********************************************************************************/
function ConvertAdress(adresse){
        $.ajax({
            url: "https://nominatim.openstreetmap.org/search", // URL de Nominatim
            type: 'get', // Requête de type GET
            data: "q="+adresse+"&format=json&addressdetails=1&limit=1&polygon_svg=1" // Données envoyées (q -> adresse complète, format -> format attendu pour la réponse, limit -> nombre de réponses attendu, polygon_svg -> fournit les données de polygone de la réponse en svg)
        }).done(function (response) {
            if(response != ""){
                userlat = response[0]['lat'];
                userlon = response[0]['lon'];
               // console.log(userlat);
               // console.log(userlon);
                var marker3 = L.marker([userlat,userlon]).addTo(mymap);
                marker3.bindPopup("<b>Hello world!</b><br> It's my Adresse.  <br> <a href=''> more </a>").openPopup();
            }                
        }).fail(function (error) {
            alert(error);
        });      
}
/******************Exemple de géolocalisation *******************/

/**********ici je parcour la listes de mes enreprises et je récupére l'adresse pour les localiser
 * puis je récupére le nom de l'entreprise pour l'afficher dans le popup.
 * je récupere le reste des informations pour les afficher dans le a href more.
 */


/******************les filtres d'affichage**************/
/* $("#all").click((event)=>{
    ConvertAdress("Avenue des Nerviens 13, 1780, Belgique");
})
 */
/*********Stand Alone PopUp***********/
/*var popup = L.popup()
    .setLatLng([50.8638372, 4.3607629])
    .setContent("I am a standalone popup.")
    .openOn(mymap);*/

//ConvertAdress("Avenue des Nerviens 13, 1780, Belgique");
/************************************************************************************* */

let allButtons = document.querySelectorAll("button");
console.log(allButtons);

// boucle pour chaque bouton
for (let i=0; i< allButtons.length; i++)
{
   allButtons[i].addEventListener("click", (event) => {
   
        
       //console.log(event.target.id); 
       // empecher le submit
       event.preventDefault();


       var xhr = new XMLHttpRequest();

       xhr.onreadystatechange = function (){
           if (xhr.readyState === 4 && xhr.status === 200){ 
               // transformer en object
               var arrayObjects = JSON.parse (xhr.responseText);
               //console.log (xhr.responseText);
               
               generate (arrayObjects);
           }
       };

       let maForm = new FormData(); // form vide 
       maForm.append ("choix",event.target.id); // key value indiquant le bouton
       xhr.open("POST","./AfficherEntreprises.php");
       xhr.send(maForm);
   });
}


function generate(arrayObjects){
    console.log(arrayObjects); 
    for(let i=0; i< arrayObjects.length; i++)
    {
        ConvertAdress(arrayObjects[i].adresse);
    }
}

