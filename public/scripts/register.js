var divDoador = document.getElementById('boxDataDoador');
var divVoluntario = document.getElementById('boxDataVoluntario');
var divInstituicao = document.getElementById('boxDataInstituicao');

var doador = 'doador';
var voluntario = 'voluntario';
var instituicao = 'instituicao';

divDoador.style.display = "flex";
divVoluntario.style.display = "none";
divInstituicao.style.display = "none";


document.getElementById('seletor').addEventListener('change', (event) =>{
    var select = document.getElementById('seletor').value;
    // console.log(select);
    if (select == doador) {
        divDoador.style.display = "flex";;
        divVoluntario.style.display = "none";
        divInstituicao.style.display = "none";
    } else if (select == voluntario) {
        divDoador.style.display = "none";
        divVoluntario.style.display = "flex";;
        divInstituicao.style.display = "none";
    } else if (select == instituicao) {
        divDoador.style.display = "none";;
        divVoluntario.style.display = "none";;
        divInstituicao.style.display = "flex";;
    } 
});

