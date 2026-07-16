# 🏰 IMPÉRIO DE MALVORN — As Sete Casas dos Pecados

Uma simulação interativa de um mundo medieval onde **sete casas nobres**, cada uma personificando um dos sete pecados capitais, competem pelo poder supremo sob o Selo de Malvorn.

## 🎮 Acesse o Jogo

🌐 **[Jogue Agora - GitHub Pages](https://Jgcunha.github.io/Mundo-paralelo-/)**

## 📖 Visão Geral

**Império de Malvorn** é uma simulação de mundo em tempo real que mistura:
- 🗺️ **Geração Procedural de Continentes** com terrenos diversos (florestas, desertos, oceanos, montanhas)
- 👑 **7 Casas Nobres Independentes** cada uma com seu próprio pecado capital
- ⚔️ **Guerras Civis Dinâmicas** entre as casas
- 🌍 **Sistema Climático** com estações e clima dinâmico
- 📊 **Estatísticas Globais** acompanhadas em tempo real
- ⚡ **Poderes Imperiais** - Manipule o mundo como o Imperador Malvorn
- 📜 **Crônicas Históricas** - Registro de todos os eventos importantes

## 🎯 As Sete Casas

Cada casa representa um dos sete pecados capitais:

| Casa | Pecado | Título |
|------|--------|--------|
| **Áurea** | Soberba | Arquiduque(sa) |
| **Fernvult** | Ira | Duque(sa) |
| **Ouroleth** | Avareza | Marquês(a) |
| **Vessarine** | Inveja | Conde(ssa) |
| **Belmoire** | Luxúria | Visconde(ssa) |
| **Thorngrain** | Gula | Barão(esa) |
| **Somneth** | Preguiça | Cavaleiro/Dama |

## 🎮 Como Jogar

### Controles Básicos
- **❚❚ PAUSAR** - Pausa/retoma a simulação
- **⚡ VELOCIDADE** - Alterna entre 1×, 2×, 5×, 10×, 50× de velocidade
- **MOUSE** - Passe sobre as capitais para ver informações
- **SCROLL** - Zoom in/out do mapa

### Poderes Imperiais (Selo de Malvorn)
Clique nos botões no painel direito superior:

- **✨ Conceder Favor Real** - Aumenta população e progresso de uma casa (bônus)
- **☄️ Julgamento Imperial** - Reduz drasticamente a população de uma casa (punição)
- **🕊️ Decreto de Paz** - Encerra todas as guerras civis de uma casa
- **🏰 Fundar Nova Fortaleza** - Cria uma nova colônia em terreno vazio

## 📊 Informações do Mundo

A barra lateral esquerda mostra:
- 🌡️ **Temperatura Global** - Varia com as estações
- 🌲 **Cobertura Florestal** - Muda ao longo do tempo
- 👥 **População Total** - Soma de todas as casas
- ⚔️ **Guerras Ativas** - Número de conflitos em andamento
- 🏛️ **Casas de Pé** - Quantas casas ainda sobrevivem

## 🌍 Sistema de Estações

O mundo passa por 4 estações:
- **🌱 Primavera** (Dias 1-90) - Clima ameno, crescimento
- **☀ Verão** (Dias 91-181) - Quente, picos de atividade
- **🍂 Outono** (Dias 182-273) - Moderado, preparação
- **❄ Inverno** (Dias 274-365) - Frio, desafios de sobrevivência

## ⚙️ Tecnologias

- **HTML5** - Estrutura
- **CSS3** - Estilo e animações
- **JavaScript (Vanilla)** - Motor de simulação
- **Canvas 2D** - Renderização do mundo
- **GitHub Actions** - Deploy automático
- **GitHub Pages** - Hospedagem

## 📁 Estrutura do Projeto

```
Mundo-paralelo-/
├── index.html           # Página principal
├── css/
│   └── style.css       # Estilos e temas
├── js/
│   └── script.js       # Motor de simulação
├── .github/
│   └── workflows/
│       └── deploy.yml  # Workflow do GitHub Actions
├── README.md           # Este arquivo
└── .gitignore          # Arquivos ignorados pelo Git
```

## 🚀 Deploy Automático

Este projeto usa **GitHub Actions** para deploy automático:

1. Sempre que você faz `push` para `main`, o workflow é acionado
2. Os arquivos são automaticamente enviados para **GitHub Pages**
3. A simulação fica disponível em `https://Jgcunha.github.io/Mundo-paralelo-/`

### Ativar GitHub Pages

1. Vá para **Settings** do repositório
2. Navegue até **Pages**
3. Em "Build and deployment", selecione:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
4. Salve

## 🎨 Paleta de Cores

- **Ouro (#d4a843)** - Títulos e destaque
- **Ciano (#00e5ff)** - UI principal
- **Verde (#00ff88)** - Eventos positivos
- **Vermelho (#ff3355)** - Guerras e desastres
- **Âmbar (#e8830a)** - Avisos

## 📝 Lógica de Simulação

A simulação avança em **ciclos contínuos**:

- **Crescimento Populacional** - Baseado em paz vs guerra
- **Expansão Territorial** - Casas expandem em terrenos habitáveis
- **Progresso de Eras** - Casas avançam em eras históricas
- **Guerras Dinâmicas** - Conflitos surgem aleatoriamente
- **Eventos Naturais** - Descobertas, desastres, migrações
- **Extinção** - Casas podem ser extintas se população cair abaixo de 50

## 🎓 Conceitos Implementados

- **Procedural Generation** - Terreno único a cada jogo
- **Entity Management** - Gestão de 7+ entidades simultâneas
- **Physics Simulation** - Partículas e efeitos visuais
- **Event System** - Geração dinâmica de eventos
- **UI/UX** - Interface responsiva e intuitiva
- **Performance Optimization** - Canvas rendering otimizado

## 🐛 Problemas Conhecidos

Nenhum no momento! 🎉

## 📧 Contato / Contribuições

Sugestões de features? Encontrou um bug? Abra uma **Issue** ou faça um **Pull Request**!

## 📜 Licença

Este projeto é de código aberto. Sinta-se livre para usar, modificar e distribuir.

---

**"Omnia Vitia, Unus Rex"** — *Todos os vícios, um só rei.*

Criado com ❤️ por Jgcunha
