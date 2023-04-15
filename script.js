const d = document;

const $formEquiposT = d.querySelector('.botones-t'), $formEquiposF = d.querySelector('.botones-f');
const $equiposT = d.querySelector('.equipos-t ol'), $equiposF = d.querySelector('.equipos-f ol')
const $inputEquipoT = d.getElementById('input-equipo-t').value, $inputEquipoF = d.getElementById('input-equipo-f').value;
const $buttonEquipoT = d.getElementById('button-equipo-t'), $buttonEquipoF = d.getElementById('button-equipo-f');

const $sectionSorteos = d.querySelector('.container-sorteos');

let contadorPartido = 1;



d.addEventListener('submit', (e) => {
    if (e.target === $formEquiposT) {
        e.preventDefault();

        $equiposT.insertAdjacentHTML('beforeend', `<li class="equipo">${$formEquiposT.equipo.value} <button class="btn-delete-t">X</button> </li>`);

    }

    if (e.target === $formEquiposF) {
        e.preventDefault();

        $equiposF.insertAdjacentHTML('beforeend', `<li class="equipo">${$formEquiposF.equipo.value} <button class="btn-delete-f">X</button> </li>`);

    }

    
})


d.addEventListener('click', (e) => {
    if ((e.target.matches('.btn-delete-t'))) {

        // let liAEliminar = d.getElementById('equipohola');
        let $btnAEliminarT = d.querySelectorAll('.btn-delete-t');

        // convierto tu nodeList en Array para poder acceder a sus métodos
        const arrayBtnT = [...$btnAEliminarT];
        
        const indexBtnT = arrayBtnT.findIndex((el) => el === e.target);
        
        if ($equiposT.children[indexBtnT]) {
            $equiposT.removeChild($equiposT.children[indexBtnT])
        }

    }

    if ((e.target.matches('.btn-delete-f'))) {

        // let liAEliminar = d.getElementById('equipohola');
        let $btnAEliminarF = d.querySelectorAll('.btn-delete-f');

        // convierto tu nodeList en Array para poder acceder a sus métodos
        const arrayBtnF = [...$btnAEliminarF];
        
        const indexBtnF = arrayBtnF.findIndex((el) => el === e.target);
        
        if ($equiposF.children[indexBtnF]) {
            $equiposF.removeChild($equiposF.children[indexBtnF])
        }

    }

    if (e.target.matches('#sorteo')) {
        e.preventDefault();

        $sectionSorteos.innerHTML = "";
        
        if ($sectionSorteos.textContent === "") {
            contadorPartido = 1;
        }

        const $equiposFacundo = d.querySelectorAll('.equipos-f ol li');
        const $equiposTomas = d.querySelectorAll('.equipos-t ol li');

        let separarNombresEquiposDeBotonF = [];
        let equiposFacundo = [];

        let separarNombresEquiposDeBotonT = [];
        let equiposTomas = [];

        let equipoT = '';
        let equipoF = '';

        $equiposFacundo.forEach((equipo) => {

            separarNombresEquiposDeBotonF = equipo.outerText.split('\n');

            equiposFacundo.push(separarNombresEquiposDeBotonF[0]);

        });

        $equiposTomas.forEach((equipo) => {

            separarNombresEquiposDeBotonT = equipo.outerText.split('\n');

            equiposTomas.push(separarNombresEquiposDeBotonT[0]);

        });

        
        if (equiposTomas.length <= 0 && equiposFacundo.length <= 0) {
            alert('No hay ningún equipo cargado')
        } else if (equiposTomas.length != equiposFacundo.length) {
            alert('La cantidad de equipos debe ser la misma para ambos')
        } else {
            
            let cantidadEquiposTomas = equiposTomas.length;
            let cantidadEquiposFacundo = equiposFacundo.length;

            for (let i = 0; i < equiposTomas.length; i++) {
                
                equipoT = Math.floor(Math.random() * cantidadEquiposTomas);
                console.log('equipo tomas: ', equiposTomas[equipoT]);

                equipoF = Math.floor(Math.random() * cantidadEquiposFacundo);
                console.log('equipo facundo: ', equiposFacundo[equipoF]);

                if (equiposFacundo[equipoF] == null || equiposTomas[equipoT] == null) {
                    i--;
                    continue;
                }
                
                
                $sectionSorteos.insertAdjacentHTML('beforeend', 
                `<div class="partido">
                    <h4 style="text-align: center;">PARTIDO N°${contadorPartido}</h4>
                    <div class="equipo-tomas">
                        <span class="present">ET N°${equipoT + 1}: </span>
                        <span class="team">${equiposTomas[equipoT]}</span>
                    </div>
                    <div class="equipo-facundo">
                        <span class="present">EF N°${equipoF + 1}: </span>
                        <span class="team">${equiposFacundo[equipoF]}</span>
                    </div>
                </div>`)
                
                
                equiposTomas[equipoT] = null;
                equiposFacundo[equipoF] = null;
                
                contadorPartido += 1;
            }
        }
    }
})