// ==================== CONFIGURAÇÕES ====================
const CONFIG = {
  WORLD_WIDTH: 1200,
  WORLD_HEIGHT: 800,
  TILE_SIZE: 20,
  SIMULATION_SPEED: 1,
  UPDATE_INTERVAL: 100,
};

// ==================== VARIÁVEIS GLOBAIS ====================
let gameState = {
  year: 1,
  day: 1,
  hour: 0,
  season: 0,
  isPaused: false,
  speed: 1,
  cycle: 0,
  weather: 'clear',
  temperature: 18,
  events: [],
};

const SEASONS = ['PRIMAVERA', 'VERÃO', 'OUTONO', 'INVERNO'];
const SEASON_COLORS = {
  'PRIMAVERA': 'rgba(100, 200, 100, 0.3)',
  'VERÃO': 'rgba(255, 180, 0, 0.3)',
  'OUTONO': 'rgba(200, 100, 50, 0.3)',
  'INVERNO': 'rgba(150, 180, 220, 0.3)',
};

const WEATHERS = ['clear', 'rain', 'storm', 'snow'];
const WEATHER_NAMES = {
  'clear': 'LIMPO',
  'rain': 'CHUVA',
  'storm': 'TEMPESTADE',
  'snow': 'NEVE',
};

// ==================== CLASSES ====================
class Civilization {
  constructor(name, sin, x, y, color) {
    this.name = name;
    this.sin = sin;
    this.x = x;
    this.y = y;
    this.color = color;
    this.population = 500;
    this.era = 1;
    this.territories = [];
    this.alive = true;
    this.wars = 0;
  }

  update() {
    // Crescimento populacional
    if (gameState.isPaused) return;
    
    const baseGrowth = 1 + (Math.random() * 0.1);
    const seasonModifier = this.getSeasonModifier();
    const warModifier = this.wars > 0 ? 0.7 : 1;
    
    this.population *= baseGrowth * seasonModifier * warModifier;
    this.population = Math.max(0, this.population);

    // Progresso de era
    if (this.population > 5000 * this.era) {
      this.era++;
    }

    // Morte da civilização
    if (this.population < 100) {
      this.alive = false;
    }
  }

  getSeasonModifier() {
    const season = SEASONS[gameState.season];
    const modifiers = {
      'PRIMAVERA': 1.05,
      'VERÃO': 1.08,
      'OUTONO': 1.0,
      'INVERNO': 0.85,
    };
    return modifiers[season] || 1;
  }
}

// ==================== CIVILIZAÇÕES - AS SETE CASAS DOS PECADOS ====================
const civilizations = [
  new Civilization('Áurea', 'Soberba', 150, 150, '#d4a843'),
  new Civilization('Fernvult', 'Ira', 400, 200, '#c41e3a'),
  new Civilization('Ouroleth', 'Avareza', 250, 400, '#ffd700'),
  new Civilization('Vessarine', 'Inveja', 600, 300, '#00ff88'),
  new Civilization('Belmoire', 'Luxúria', 500, 500, '#ff69b4'),
  new Civilization('Thorngrain', 'Gula', 750, 450, '#ff8c42'),
  new Civilization('Somneth', 'Preguiça', 200, 650, '#4a7c8a'),
];

// ==================== CANVAS E CONTEXTO ====================
const canvas = document.getElementById('world-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ==================== RENDER ====================
function render() {
  // Limpar canvas
  ctx.fillStyle = '#030508';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Desenhar mapa
  drawMap();

  // Desenhar civilizações
  civilizations.forEach(civ => {
    if (civ.alive) {
      drawCivilization(civ);
    }
  });

  // Atualizar UI
  updateUI();
}

function drawMap() {
  ctx.fillStyle = '#0a4a8a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Terras
  ctx.fillStyle = '#1a3a2a';
  ctx.fillRect(0, 0, canvas.width, canvas.height * 0.7);
}

function drawCivilization(civ) {
  // Círculo da civilização
  const scaleX = canvas.width / 1200;
  const scaleY = canvas.height / 800;

  const size = Math.sqrt(civ.population) / 15;

  ctx.fillStyle = civ.color;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.arc(civ.x * scaleX, civ.y * scaleY, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Nome
  ctx.fillStyle = civ.color;
  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(civ.name, civ.x * scaleX, civ.y * scaleY + size + 15);
}

// ==================== UPDATE ====================
function update() {
  if (gameState.isPaused) return;

  // Avançar tempo
  gameState.hour += gameState.speed;

  if (gameState.hour >= 24) {
    gameState.hour = 0;
    gameState.day += gameState.speed;

    if (gameState.day > 365) {
      gameState.day = 1;
      gameState.year += 1;
    }

    // Atualizar estação
    gameState.season = Math.floor((gameState.day - 1) / 91) % 4;

    // Clima aleatório
    if (Math.random() < 0.3) {
      gameState.weather = WEATHERS[Math.floor(Math.random() * WEATHERS.length)];
    } else {
      gameState.weather = 'clear';
    }

    // Temperatura
    const seasonTemp = [15, 28, 18, 5][gameState.season];
    gameState.temperature = seasonTemp + (Math.random() - 0.5) * 10;
  }

  // Atualizar civilizações
  civilizations.forEach(civ => civ.update());

  // Guerras aleatórias
  if (Math.random() < 0.02) {
    const civ1 = civilizations[Math.floor(Math.random() * civilizations.length)];
    const civ2 = civilizations[Math.floor(Math.random() * civilizations.length)];
    
    if (civ1 !== civ2 && civ1.alive && civ2.alive) {
      civ1.wars++;
      civ2.wars--;
      
      if (civ2.population < civ1.population) {
        civ2.population *= 0.8;
        addEvent(`⚔️ ${civ1.name} (${civ1.sin}) conquista ${civ2.name}!`, 'war');
      } else {
        civ1.population *= 0.8;
        addEvent(`⚔️ ${civ2.name} (${civ2.sin}) resiste a ${civ1.name}!`, 'war');
      }
    }
  }

  gameState.cycle++;
}

// ==================== EVENTOS ====================
function addEvent(text, type = 'normal') {
  const event = {
    text,
    type,
    day: gameState.day,
    year: gameState.year,
  };

  gameState.events.unshift(event);
  
  if (gameState.events.length > 50) {
    gameState.events.pop();
  }

  // Adicionar ao log visual
  const logEntries = document.getElementById('log-entries');
  if (logEntries) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[ANO ${event.year} DIA ${event.day}] ${text}`;
    logEntries.insertBefore(entry, logEntries.firstChild);
    
    if (logEntries.children.length > 20) {
      logEntries.removeChild(logEntries.lastChild);
    }
  }
}

// ==================== UI ====================
function updateUI() {
  // Data
  const worldDateEl = document.getElementById('world-date');
  if (worldDateEl) {
    worldDateEl.textContent = `ANO ${gameState.year} • DIA ${gameState.day} • ${gameState.hour}:00`;
  }

  // Hora real
  const realTimeEl = document.getElementById('real-time');
  if (realTimeEl) {
    realTimeEl.textContent = `tempo real: ${String(Math.floor(gameState.hour)).padStart(2, '0')}:00:00 | 1h = 1 dia`;
  }

  // Estação
  const seasonBadge = document.getElementById('season-badge');
  if (seasonBadge) {
    const seasonEmojis = ['🌱', '☀️', '🍂', '❄️'];
    seasonBadge.textContent = `${seasonEmojis[gameState.season]} ${SEASONS[gameState.season]}`;
  }

  const seasonStatus = document.getElementById('season-status');
  if (seasonStatus) {
    seasonStatus.textContent = SEASONS[gameState.season];
  }

  // Clima
  const weatherStatus = document.getElementById('weather-status');
  if (weatherStatus) {
    weatherStatus.textContent = WEATHER_NAMES[gameState.weather] || 'DESCONHECIDO';
  }

  // Temperatura
  const tempEl = document.getElementById('stat-temp');
  if (tempEl) {
    tempEl.textContent = Math.round(gameState.temperature) + '°C';
  }

  // Estatísticas gerais
  const totalPop = civilizations.reduce((sum, c) => sum + (c.alive ? c.population : 0), 0);
  const popEl = document.getElementById('stat-pop');
  if (popEl) {
    popEl.textContent = Math.round(totalPop).toLocaleString();
  }

  const warsEl = document.getElementById('stat-wars');
  if (warsEl) {
    const totalWars = civilizations.reduce((sum, c) => sum + c.wars, 0);
    warsEl.textContent = totalWars;
  }

  const housesEl = document.getElementById('stat-houses');
  if (housesEl) {
    const alive = civilizations.filter(c => c.alive).length;
    housesEl.textContent = `${alive}/7`;
  }

  // Cycle
  const cycleEl = document.getElementById('cycle-count');
  if (cycleEl) {
    cycleEl.textContent = gameState.cycle;
  }

  // Lista de civilizações
  const civList = document.getElementById('civ-list');
  if (civList) {
    civList.innerHTML = civilizations.map(civ => `
      <div class="civ-item" style="border-left-color: ${civ.color}">
        <div class="civ-name" style="color: ${civ.color}">${civ.name}</div>
        <div class="civ-pop">👥 ${Math.round(civ.population).toLocaleString()}</div>
        <div class="civ-era">⚜️ ${civ.sin} | Era ${civ.era}</div>
        <div style="font-size: 0.5rem; color: var(--dim); margin-top: 2px;">${civ.alive ? '✓ Ativa' : '✗ Extinta'}</div>
      </div>
    `).join('');
  }
}

// ==================== CONTROLES ====================
document.getElementById('btn-pause')?.addEventListener('click', function() {
  gameState.isPaused = !gameState.isPaused;
  this.textContent = gameState.isPaused ? '▶ RETOMAR' : '❚❚ PAUSAR';
  this.classList.toggle('active');
});

document.getElementById('btn-speed')?.addEventListener('click', function() {
  gameState.speed = gameState.speed === 1 ? 2 : 1;
  this.textContent = `⚡ ${gameState.speed}×`;
});

function selectPower(power) {
  const activePower = document.getElementById('active-power');
  const buttons = document.querySelectorAll('.god-btn');
  
  buttons.forEach(btn => btn.classList.remove('active'));
  
  const powers = {
    'bless': '✨ Favor Real ativado',
    'smite': '☄️ Julgamento Imperial ativado',
    'peace': '🕊️ Decreto de Paz ativado',
    'spawn': '🏰 Nova Fortaleza fundada',
  };
  
  if (activePower) {
    activePower.textContent = powers[power] || 'Poder ativado';
  }
  
  event.target.classList.add('active');
}

// ==================== GAME LOOP ====================
function gameLoop() {
  update();
  render();
}

setInterval(gameLoop, CONFIG.UPDATE_INTERVAL);

// Inicializar
render();
addEvent('🌍 O Império de Malvorn nasceu sob o Selo dos Sete Pecados...', 'important');
addEvent('🏛️ Sete Casas despertam: Áurea, Fernvult, Ouroleth, Vessarine, Belmoire, Thorngrain e Somneth', 'important');
