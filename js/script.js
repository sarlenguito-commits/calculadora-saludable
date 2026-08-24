/*
  === CÁLCULO DE IMC ===
  Fórmula estándar: peso (kg) / altura (m) al cuadrado
  Categorías según rangos publicados por la OMS
*/
function calcularIMC(peso, alturaCm) {
    const alturaM = alturaCm / 100;
    return peso / (alturaM * alturaM);
}

function categorizarIMC(imc) {
    if (imc < 18.5) return { texto: 'Bajo peso', posicion: (imc / 18.5) * 25 };
    if (imc < 25) return { texto: 'Peso normal', posicion: 25 + ((imc - 18.5) / (25 - 18.5)) * 25 };
    if (imc < 30) return { texto: 'Sobrepeso', posicion: 50 + ((imc - 25) / (30 - 25)) * 25 };
    return { texto: 'Obesidad', posicion: Math.min(75 + ((imc - 30) / 10) * 25, 100) };
}

function rangoPesoSaludable(alturaCm) {
    const alturaM = alturaCm / 100;
    const min = 18.5 * alturaM * alturaM;
    const max = 24.9 * alturaM * alturaM;
    return `Rango de peso saludable estimado para tu altura: ${min.toFixed(1)} kg - ${max.toFixed(1)} kg`;
}

/*
  === TMB (Tasa Metabólica Basal) ===
  Ecuación de Mifflin-St Jeor, la más usada actualmente en nutrición clínica
*/
function calcularTMB(sexo, peso, alturaCm, edad) {
    const base = 10 * peso + 6.25 * alturaCm - 5 * edad;
    return sexo === 'hombre' ? base + 5 : base - 161;
}

/*
  === TDEE (gasto calórico total diario) ===
  TMB multiplicado por el factor de actividad física
*/
function calcularTDEE(tmb, factorActividad) {
    return tmb * factorActividad;
}

/*
  === Calorías objetivo según la meta ===
  Déficit/superávit moderados, dentro de rangos generalmente considerados seguros
*/
function calcularCaloriasObjetivo(tdee, objetivo) {
    if (objetivo === 'bajar') return tdee - 500;
    if (objetivo === 'ganar') return tdee + 300;
    return tdee; // mantener
}

/*
  === Distribución de macronutrientes ===
  Porcentajes orientativos según objetivo (proteína / carbohidratos / grasas)
*/
function calcularMacros(calorias, objetivo) {
    let pctProteina, pctCarbos, pctGrasas;

    if (objetivo === 'bajar') {
        pctProteina = 0.30; pctCarbos = 0.40; pctGrasas = 0.30;
    } else if (objetivo === 'ganar') {
        pctProteina = 0.25; pctCarbos = 0.50; pctGrasas = 0.25;
    } else {
        pctProteina = 0.25; pctCarbos = 0.45; pctGrasas = 0.30;
    }

    const gramosProteina = (calorias * pctProteina) / 4;
    const gramosCarbos = (calorias * pctCarbos) / 4;
    const gramosGrasas = (calorias * pctGrasas) / 9;

    return {
        proteina: { pct: pctProteina * 100, gramos: Math.round(gramosProteina) },
        carbos: { pct: pctCarbos * 100, gramos: Math.round(gramosCarbos) },
        grasas: { pct: pctGrasas * 100, gramos: Math.round(gramosGrasas) },
    };
}

/*
  === Hidratación sugerida ===
  Lineamiento general: ~35 ml por kg de peso corporal
*/
function calcularAgua(peso) {
    return (peso * 35) / 1000;
}

/*
  === Actividad física sugerida según objetivo ===
*/
function sugerenciaActividad(objetivo) {
    if (objetivo === 'bajar') {
        return 'Combinación de cardio (caminar, andar en bici, correr) con entrenamiento de fuerza, 4-5 veces por semana. El cardio ayuda al gasto calórico y la fuerza preserva masa muscular durante el déficit.';
    }
    if (objetivo === 'ganar') {
        return 'Entrenamiento de fuerza como eje principal (pesas, calistenia), 4-5 veces por semana, priorizando la sobrecarga progresiva. El cardio se mantiene liviano para no interferir con la recuperación.';
    }
    return 'Rutina mixta de cardio y fuerza, 3-4 veces por semana, ajustada a tu gusto personal. El objetivo es sostenibilidad a largo plazo más que un tipo de ejercicio específico.';
}

/*
  === Tip del día según objetivo ===
*/
function tipDelDia(objetivo) {
    if (objetivo === 'bajar') {
        return 'Priorizá el descanso: dormir mal aumenta el apetito y dificulta sostener el déficit calórico.';
    }
    if (objetivo === 'ganar') {
        return 'La consistencia importa más que la intensidad: mejor entrenar moderado todas las semanas que muy fuerte solo a veces.';
    }
    return 'Escuchá las señales de hambre y saciedad de tu cuerpo — mantener no es una dieta estricta, es un equilibrio sostenible.';
}

const recetas = [
    {
        nombre: "Bowl de pollo y quinoa",
        objetivo: "bajar",
        calorias: 420,
        ingredientes: ["Pechuga de pollo", "Quinoa", "Brócoli", "Limón"],
    },
    {
        nombre: "Omelette de claras con espinaca",
        objetivo: "bajar",
        calorias: 280,
        ingredientes: ["Claras de huevo", "Espinaca", "Tomate", "Aceite de oliva"],
    },
    {
        nombre: "Ensalada templada de atún",
        objetivo: "mantener",
        calorias: 450,
        ingredientes: ["Atún al natural", "Hojas verdes", "Batata", "Palta"],
    },
    {
        nombre: "Wrap integral de pavo",
        objetivo: "mantener",
        calorias: 480,
        ingredientes: ["Tortilla integral", "Pechuga de pavo", "Queso magro", "Vegetales"],
    },
    {
        nombre: "Pasta integral con carne y batata",
        objetivo: "ganar",
        calorias: 650,
        ingredientes: ["Pasta integral", "Carne picada magra", "Batata", "Aceite de oliva"],
    },
    {
        nombre: "Licuado proteico de banana y avena",
        objetivo: "ganar",
        calorias: 520,
        ingredientes: ["Banana", "Avena", "Leche", "Proteína en polvo o maní"],
    },
    {
        nombre: "Sopa de lentejas con vegetales",
        objetivo: "bajar",
        calorias: 350,
        ingredientes: ["Lentejas", "Zanahoria", "Apio", "Cebolla"],
    },
    {
        nombre: "Salmón al horno con vegetales",
        objetivo: "mantener",
        calorias: 500,
        ingredientes: ["Filete de salmón", "Zapallitos", "Batata", "Limón"],
    },
    {
        nombre: "Bowl de arroz, carne y palta",
        objetivo: "ganar",
        calorias: 680,
        ingredientes: ["Arroz", "Carne magra", "Palta", "Porotos negros"],
    },
    {
        nombre: "Ensalada de garbanzos y verdura",
        objetivo: "todos",
        calorias: 400,
        ingredientes: ["Garbanzos", "Tomate", "Pepino", "Aceite de oliva"],
    },
    {
        nombre: "Tostadas integrales con palta y huevo",
        objetivo: "mantener",
        calorias: 420,
        ingredientes: ["Pan integral", "Palta", "Huevo", "Tomate cherry"],
    },
    {
        nombre: "Yogur con avena y frutos rojos",
        objetivo: "bajar",
        calorias: 300,
        ingredientes: ["Yogur descremado", "Avena", "Frutos rojos", "Canela"],
    },
];

function filtrarRecetas(objetivo) {
    const coinciden = recetas.filter(receta => receta.objetivo === objetivo);
    const mezcladas = coinciden.sort(() => Math.random() - 0.5);
    return mezcladas.slice(0, 2);
}

function renderizarRecetas(objetivo) {
    const recetasFiltradas = filtrarRecetas(objetivo);
    const contenedor = document.getElementById('recetas-lista');

    contenedor.innerHTML = recetasFiltradas.map(receta => `
        <div class="receta">
            <h4>${receta.nombre}</h4>
            <p class="chico">${receta.calorias} kcal aprox.</p>
            <p class="chico">${receta.ingredientes.join(', ')}</p>
        </div>
    `).join('');
}

function renderizarTodasRecetas() {
    const contenedor = document.getElementById('todas-recetas-lista');

    contenedor.innerHTML = recetas.map(receta => `
        <div class="receta">
            <h4>${receta.nombre}</h4>
            <p class="chico">${receta.calorias} kcal aprox.</p>
            <p class="chico">${receta.ingredientes.join(', ')}</p>
        </div>
    `).join('');
}

// === Actualiza toda la interfaz con los resultados ===
function mostrarResultado() {
    const sexo = document.getElementById('sexo').value;
    const edad = parseFloat(document.getElementById('edad').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const factorActividad = parseFloat(document.getElementById('actividad').value);
    const objetivo = document.getElementById('objetivo').value;

    if (!edad || !peso || !altura) {
        alert('Completá edad, peso y altura para calcular.');
        return;
    }

    // IMC
    const imc = calcularIMC(peso, altura);
    const categoria = categorizarIMC(imc);
    document.getElementById('imc-numero').textContent = imc.toFixed(1);
    document.getElementById('imc-categoria').textContent = categoria.texto;
    document.getElementById('imc-marcador').style.left = `${Math.min(categoria.posicion, 100)}%`;
    document.getElementById('imc-rango').textContent = rangoPesoSaludable(altura);

    // TMB / TDEE / calorías objetivo
    const tmb = calcularTMB(sexo, peso, altura, edad);
    const tdee = calcularTDEE(tmb, factorActividad);
    const caloriasObjetivo = calcularCaloriasObjetivo(tdee, objetivo);
    document.getElementById('calorias-numero').textContent = `${Math.round(caloriasObjetivo)} kcal/día`;
    document.getElementById('tdee-numero').textContent = Math.round(tdee);

    // Macros
    const macros = calcularMacros(caloriasObjetivo, objetivo);
    document.getElementById('macro-proteina-bar').style.width = `${macros.proteina.pct}%`;
    document.getElementById('macro-carbos-bar').style.width = `${macros.carbos.pct}%`;
    document.getElementById('macro-grasas-bar').style.width = `${macros.grasas.pct}%`;
    document.getElementById('macro-proteina-texto').textContent = `${macros.proteina.gramos} g (${macros.proteina.pct}%)`;
    document.getElementById('macro-carbos-texto').textContent = `${macros.carbos.gramos} g (${macros.carbos.pct}%)`;
    document.getElementById('macro-grasas-texto').textContent = `${macros.grasas.gramos} g (${macros.grasas.pct}%)`;

    // Hidratación
    const litros = calcularAgua(peso);
    document.getElementById('agua-numero').textContent = `${litros.toFixed(1)} L/día`;

    // Actividad física sugerida
    document.getElementById('actividad-sugerida').textContent = sugerenciaActividad(objetivo);

    // Tip del día
    document.getElementById('tip-dia').textContent = tipDelDia(objetivo);

    // Recetas sugeridas
    renderizarRecetas(objetivo);

    document.getElementById('resultado').hidden = false;
}

document.getElementById('calcular-btn').addEventListener('click', mostrarResultado);
renderizarTodasRecetas();