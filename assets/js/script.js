$(document).ready(function () {
    const btnInfo = $(".btn")

    const formularioSh = $("#formSh")
    const inputSh = $("#userSh")
    const resultadoSh = $("#resultSh")


    formularioSh.on("submit", function (evento) {
        evento.preventDefault()


        inputSh.removeClass("is-valid is-invalid")


        const inputShUsuario = parseInt(inputSh.val())

        if (inputShUsuario > 0) {
            inputSh.addClass("is-valid")
            getSuperHero(inputShUsuario)
        } else {
            inputSh.addClass("is-invalid")
        }

    })



    const getSuperHero = (inputShFn) => {

        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${inputShFn}`,
            method: "GET",
            success(superHero) {


                const mySuperH = {
                    image: superHero.image.url,
                    name: superHero.name,
                    connections: superHero.connections["group-affilation"],
                    firstappearance: superHero.biography["first-appearance"],
                    height: superHero.appearance.height,
                    weight: superHero.appearance.weight,
                    aliases: superHero.biography.aliases,
                    powerstats: superHero.powerstats,
                }

                resultadoSh.html(`
            <div class="card" style="width: 25rem">
                <img src="${mySuperH.image}" 
                 alt="" class="card-img-top h-5%">
             <div class="card-body">
                 <h5>Name: ${mySuperH.name}</h5>

             </div>
             <ul class="list-group list-group-flush">
                 <li class="list-group-item">Conexiones: ${mySuperH.connections}</li>
                 <li class="list-group-item">Primera aparición: ${mySuperH.firstappearance}</li>
                 <li class="list-group-item">Altura: ${mySuperH.height}</li>
                 <li class="list-group-item">Peso: ${mySuperH.weight}</li>
                   <li class="list-group-item">Alianzas: ${mySuperH.aliases}</li>
               </ul>

             </div>`)


                const dataPoints = Array.isArray(mySuperH.powerstats)
                    ? mySuperH.powerstats.map((stat) => ({
                        label: stat.stat.name,
                        y: stat.base_stat
                    }))
                    : Object.entries(mySuperH.powerstats).map(([label, value]) => ({
                        label: label,
                        y: parseInt(value)
                    }));

                console.log(dataPoints);

                const options = {
                    animationEnabled: true,
                    title: {
                        text: "Estadísticas de poder"
                    },
                    data: [
                        {
                            type: "pie",
                            dataPoints: dataPoints
                        }
                    ]
                };

                $("#containerGraph").CanvasJSChart(options)


            },
            error(e) {
                console.log("error")
                console.error(e)

            }

        })

    }




})

