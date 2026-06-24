const fs = require("fs");
const path = require("path");

const outDir = path.resolve(__dirname, "..", "wiki");

const media = {
  options: "../../assets/wiki/gif/wiki-options-recording.gif",
  capture: "../../assets/wiki/gif/wiki-capture-hub.gif",
  camera: "../../assets/wiki/gif/wiki-camera-rig.gif",
  actors: "../../assets/wiki/gif/wiki-actor-studio.gif",
  metrics: "../../assets/wiki/gif/wiki-cinematic-metrics.gif",
  export: "../../assets/wiki/gif/wiki-start-export.gif",
  preferences: "../../assets/wiki/gif/wiki-preferences.gif",
  replayPath: "../../assets/real/gif/real-replay-camera-path.gif",
  actorReplay: "../../assets/real/gif/real-actor-replay.gif",
  verticalExport: "../../assets/real/gif/real-vertical-export.gif"
};

const langs = {
  it: {
    label: "Italiano",
    code: "it",
    navTitle: "Flash Replay Wiki",
    root: "Indice lingue",
    pagesLabel: "Pagine",
    tocLabel: "In questa pagina",
    verified: "Asset reali verificati",
    free: "Free download",
    rights: "All Rights Reserved",
    updated: "Wiki tecnica per creator e sviluppatori addon.",
    backHome: "Indice wiki",
    footer:
      "Flash Replay e i suoi asset sono All Rights Reserved. La wiki pubblica spiega uso, compatibilita e addon concessi senza distribuire codice sorgente della mod."
  },
  en: {
    label: "English",
    code: "en",
    navTitle: "Flash Replay Wiki",
    root: "Language index",
    pagesLabel: "Pages",
    tocLabel: "On this page",
    verified: "Verified real assets",
    free: "Free download",
    rights: "All Rights Reserved",
    updated: "Technical wiki for creators and addon developers.",
    backHome: "Wiki index",
    footer:
      "Flash Replay and its assets are All Rights Reserved. This public wiki explains usage, compatibility and permitted addons without distributing the mod source code."
  },
  es: {
    label: "Español",
    code: "es",
    navTitle: "Flash Replay Wiki",
    root: "Indice de idiomas",
    pagesLabel: "Paginas",
    tocLabel: "En esta pagina",
    verified: "Recursos reales verificados",
    free: "Free download",
    rights: "All Rights Reserved",
    updated: "Wiki tecnica para creadores y desarrolladores de addons.",
    backHome: "Indice wiki",
    footer:
      "Flash Replay y sus recursos son All Rights Reserved. Esta wiki publica explica uso, compatibilidad y addons permitidos sin distribuir el codigo fuente de la mod."
  }
};

const pageOrder = [
  "index",
  "setup",
  "recording",
  "save-last",
  "capture-hub",
  "replay-editor",
  "timeline",
  "camera",
  "actors",
  "visuals",
  "export",
  "files",
  "settings",
  "troubleshooting",
  "addons"
];

const pages = {
  it: {
    index: {
      title: "Manuale tecnico Flash Replay",
      summary:
        "Wiki operativa per usare Flash Replay punto per punto: registrazione, replay, camera, attori, export, file, impostazioni e addon concessi.",
      media: "replayPath",
      sections: [
        {
          title: "Come leggere questa wiki",
          body: [
            "Ogni pagina descrive una parte reale della mod: cosa fa, quando usarla, quali passaggi seguire, quali opzioni la controllano e quali errori evitare.",
            "Le GIF sono ricavate da screenshot runtime o export reali della mod. Non sono schermate finte e non rappresentano funzioni inesistenti."
          ],
          bullets: [
            "Se vuoi solo registrare e salvare una clip, parti da `Registrazione` e `Save Last`.",
            "Se vuoi fare video cinematografici, parti da `Editor replay`, `Timeline`, `Camera` ed `Export`.",
            "Se vuoi estendere la mod con contenuti o compatibilita, leggi `Addon concessi` prima di pubblicare qualcosa."
          ]
        }
      ]
    },
    setup: {
      title: "Installazione e requisiti",
      summary:
        "Requisiti, loader supportato, cartella mods, primo avvio e controlli iniziali prima di registrare.",
      media: "options",
      sections: [
        {
          title: "Requisiti attuali",
          body: [
            "Flash Replay e una mod client-side per Minecraft NeoForge 1.21.1. La build pubblica va installata nel client del creator, non richiede che il server installi la stessa mod.",
            "Usa la versione di NeoForge dichiarata sulla pagina del progetto. Se una pagina di download indica una versione minima piu recente, segui quella."
          ],
          table: {
            headers: ["Elemento", "Valore operativo"],
            rows: [
              ["Minecraft", "1.21.1 nella build attuale"],
              ["Loader", "NeoForge"],
              ["Tipo mod", "Client-side"],
              ["Licenza", "Free download, All Rights Reserved"],
              ["Pubblicazione sorgenti", "Non inclusa nella distribuzione pubblica"]
            ]
          }
        },
        {
          title: "Installazione",
          steps: [
            "Scarica il file `.jar` dalla pagina ufficiale CurseForge o Modrinth.",
            "Chiudi Minecraft.",
            "Copia il `.jar` nella cartella `mods` del profilo NeoForge.",
            "Avvia il gioco e apri `Mods` per verificare che Flash Replay sia presente.",
            "Apri le opzioni della mod e controlla `Recording Controls`, `Recording`, `Interface` ed `Exporting`."
          ]
        },
        {
          title: "Controllo rapido dopo il primo avvio",
          bullets: [
            "Assegna i tasti per start/finish recording, Save Last 60s, Highlight 30s e marker se vuoi usarli in gioco.",
            "Scegli la modalita di studio: Simple per lavoro rapido, Director per camera e attori, Pro per controlli completi.",
            "Verifica la cartella di export prima di lanciare un render lungo."
          ]
        }
      ]
    },
    recording: {
      title: "Registrazione",
      summary:
        "Come Flash Replay cattura il gameplay, differenza tra Normal, Rolling e Hybrid, marker automatici e registrazione su server.",
      media: "options",
      sections: [
        {
          title: "Cosa registra",
          body: [
            "La registrazione salva una sessione replay riproducibile dentro l'editor. Durante il gameplay la mod cattura pacchetti, stato del mondo, entita, posizione del player locale e dati opzionali come hotbar o voice chat se la compatibilita e disponibile.",
            "Il risultato non e un video. E una sessione replay che puoi riaprire, tagliare, dirigere con camera, modificare con attori e poi esportare."
          ]
        },
        {
          title: "Modalita di cattura",
          table: {
            headers: ["Modalita", "Uso consigliato", "Comportamento"],
            rows: [
              ["Normal", "Registrazioni complete pianificate", "Tiene tutta la sessione finche la salvi o la termini."],
              ["Rolling", "Clip tipo DVR", "Mantiene una finestra temporale recente e scarta il materiale piu vecchio."],
              ["Hybrid", "Sessioni lunghe", "Combina finestra temporale e limite disco per evitare crescita non controllata."]
            ]
          }
        },
        {
          title: "Parametri importanti",
          bullets: [
            "`Chunk length seconds`: durata dei segmenti di registrazione. Valori piu corti rendono la gestione piu granulare; valori piu lunghi riducono overhead.",
            "`Rolling retained seconds`: quanti secondi conservare in modalita Rolling.",
            "`Mark dimension changes`: aggiunge marker quando cambi dimensione.",
            "`Local player updates per second`: aumenta la fedelta dei movimenti del player locale quando serve una camera o un actor pass piu preciso.",
            "`Record voice chat`: disponibile solo se la mod voice chat compatibile e caricata."
          ]
        },
        {
          title: "Automazioni e marker",
          body: [
            "Le automazioni sono disattivate di default per evitare avvii o salvataggi inattesi. Se le abiliti, scegli un profilo in base al tipo di contenuto."
          ],
          table: {
            headers: ["Profilo", "Quando usarlo"],
            rows: [
              ["Safe", "Solo chiusura automatica su durata massima."],
              ["Highlights", "Combat, morte e cadute importanti generano clip o highlight."],
              ["Hazards", "Fuoco, freezing, wither e darkness generano marker o Save Last."],
              ["Movement", "Dimension change, elytra e cadute importanti."],
              ["Manual Locked", "Avvia e blocca su eventi critici, poi finisci manualmente."]
            ]
          }
        }
      ]
    },
    "save-last": {
      title: "Save Last, Highlight e marker",
      summary:
        "Come salvare gli ultimi secondi, creare highlight e segnare momenti importanti durante il gameplay.",
      media: "capture",
      sections: [
        {
          title: "Save Last",
          body: [
            "Save Last usa la finestra di registrazione recente per salvare una clip dopo che l'evento e gia successo. E la funzione giusta per clutch, kill, bug visivi, momenti RP o scene improvvise.",
            "Il tasto `Save Last 60s` crea una clip degli ultimi secondi disponibili in base alla configurazione e alla modalita di cattura."
          ],
          steps: [
            "Imposta `Capture Mode` su Rolling o Hybrid se vuoi lavorare come DVR.",
            "Assegna il keybind `Save Last 60s`.",
            "Gioca normalmente.",
            "Quando succede qualcosa da salvare, premi il keybind.",
            "Apri il Capture Hub per rivedere, ordinare e promuovere la clip."
          ]
        },
        {
          title: "Pre-roll e post-roll",
          body: [
            "`Save last pre-roll seconds` estende l'inizio della clip verso il passato. `Save last post-roll seconds` estende la fine in avanti. Sono utili per non tagliare l'inizio o la reazione finale di un evento."
          ]
        },
        {
          title: "Highlight 30s",
          body: [
            "Highlight e pensato per salvare rapidamente un momento breve e pronto da rivedere. Usa il keybind dedicato se vuoi separare clip importanti dalla normale lista di sessioni."
          ]
        },
        {
          title: "Marker manuali",
          bullets: [
            "Puoi configurare fino a quattro marker con colore, RGB personalizzato, descrizione e salvataggio posizione.",
            "I marker aiutano a ritrovare punti precisi nella timeline.",
            "Usali durante recording live se sai gia che quel punto andra esportato o tagliato."
          ]
        }
      ]
    },
    "capture-hub": {
      title: "Capture Hub",
      summary:
        "Centro operativo per clip, sessioni, ambiente di cattura e gestione degli elementi registrati.",
      media: "capture",
      sections: [
        {
          title: "A cosa serve",
          body: [
            "Capture Hub raccoglie clip salvate, sessioni di registrazione e stato di cattura. E la finestra da aprire quando vuoi passare da gameplay registrato a materiale da montare o esportare.",
            "Le vecchie finestre di clip browser, sessioni e preflight sono state assorbite qui: il flusso e centralizzato."
          ]
        },
        {
          title: "Schede operative",
          table: {
            headers: ["Area", "Uso"],
            rows: [
              ["Clips", "Rivedi clip, ordina, cerca, promuovi e apri materiale in export."],
              ["Sessions", "Controlla sessioni attive o completate, stato e possibili errori."],
              ["Environment", "Verifica condizioni di registrazione, compatibilita e contesto del pack."]
            ]
          }
        },
        {
          title: "Ordine manuale",
          body: [
            "Le clip possono avere un ordine manuale persistente. Le clip non ordinate restano visibili in ordine recente, mentre quelle ordinate seguono l'organizzazione scelta dal creator."
          ]
        },
        {
          title: "Quando usarlo",
          bullets: [
            "Dopo un Save Last o Highlight.",
            "Dopo una registrazione lunga per selezionare le parti utili.",
            "Prima di aprire un replay in editor, per capire quale take e il piu adatto.",
            "Dopo un errore di scrittura o export, per recuperare il contesto."
          ]
        }
      ]
    },
    "replay-editor": {
      title: "Editor replay",
      summary:
        "Come aprire un replay, navigare l'ambiente editor e capire le finestre principali.",
      media: "replayPath",
      sections: [
        {
          title: "Dal replay al set cinematografico",
          body: [
            "Aprire un replay ricostruisce il mondo registrato in una sessione separata. Da qui puoi muovere la camera, impostare keyframe, filtrare entita, aggiungere actor, cambiare visual e preparare l'export.",
            "La UI editor usa finestre mobili: puoi aprire solo quello che serve dal menu e salvare un workspace pratico."
          ]
        },
        {
          title: "Finestre principali",
          table: {
            headers: ["Finestra", "Funzione"],
            rows: [
              ["Player List", "Trova player ed entita registrate."],
              ["Movement", "Regola movimento camera/editor."],
              ["Render Filter", "Nasconde o mostra entita e particelle."],
              ["Dialogue", "Gestisce caption/dialoghi per contenuti narrativi."],
              ["Cinematic Project", "Organizza scene, shot, take e review."],
              ["Curve Editor", "Modifica curve di camera e valori chiave."],
              ["Cinematic Metrics", "Analizza velocita, distanza, FOV e fluidita."],
              ["Actors", "Crea e anima actor/puppet."],
              ["Capture Hub", "Gestisce clip e sessioni registrate."]
            ]
          }
        },
        {
          title: "Modalita studio",
          bullets: [
            "Simple mostra un flusso guidato e nasconde finestre diagnostiche.",
            "Director espone camera, progetto e actor senza sovraccaricare l'interfaccia.",
            "Pro mostra tutto: utile per debug, export avanzato e lavoro tecnico."
          ]
        }
      ]
    },
    timeline: {
      title: "Timeline e range export",
      summary:
        "Trasporto, keyframe, tracce, range I/O, zoom e modifica del tempo da esportare.",
      media: "camera",
      sections: [
        {
          title: "Concetto base",
          body: [
            "La timeline e il controllo centrale del replay. Il cursore definisce il tick corrente, le tracce contengono keyframe e il range export definisce il segmento che verra renderizzato.",
            "I tasti I e O impostano l'inizio e la fine del range da esportare."
          ]
        },
        {
          title: "Zone della timeline",
          table: {
            headers: ["Zona", "Uso"],
            rows: [
              ["Transport", "Play, pausa, salti e controllo del tick corrente."],
              ["Ruler", "Scala temporale e range export trascinabile."],
              ["Track list", "Nomi e gruppi delle tracce."],
              ["Keyframe canvas", "Keyframe, selezione, drag e modifica."],
              ["Zoom bar", "Avvicina o allarga la vista temporale."]
            ]
          }
        },
        {
          title: "Keyframe",
          bullets: [
            "Aggiungi keyframe nei punti in cui vuoi fissare camera, FOV, actor, audio o valori visual.",
            "La interpolazione predefinita viene dalle opzioni `Keyframes`.",
            "Usa il Curve Editor quando un movimento sembra meccanico o cambia velocita troppo bruscamente."
          ]
        },
        {
          title: "Range export",
          steps: [
            "Porta il cursore al primo frame utile.",
            "Premi I o usa il controllo di inizio range.",
            "Porta il cursore all'ultimo frame utile.",
            "Premi O o usa il controllo di fine range.",
            "Apri Start Export e verifica durata, FPS e risoluzione."
          ]
        }
      ]
    },
    camera: {
      title: "Camera Director e curve",
      summary:
        "Camera cinematografica, rig, focus, FOV, keyframe, Curve Editor e metriche.",
      media: "camera",
      sections: [
        {
          title: "Camera cinematografica",
          body: [
            "Flash Replay permette di separare il gameplay registrato dalla camera finale. Puoi quindi registrare una scena una volta e poi dirigerla come se fosse un set.",
            "La camera usa posizione, rotazione, FOV e interpolazione. Le curve controllano come i valori cambiano nel tempo."
          ]
        },
        {
          title: "Workflow consigliato",
          steps: [
            "Apri il replay e trova il momento utile.",
            "Imposta range export nella timeline.",
            "Crea i keyframe camera principali: ingresso, punto centrale, uscita.",
            "Aggiusta FOV e focus se la scena deve evidenziare un soggetto.",
            "Apri Curve Editor per pulire velocita, easing e transizioni.",
            "Controlla Cinematic Metrics per evitare movimenti troppo bruschi."
          ]
        },
        {
          title: "Curve Editor",
          body: [
            "Nel Curve Editor puoi trascinare punti, aggiungere keyframe con Shift+Click, rimuovere il punto selezionato con Delete, nudge con frecce e zoomare con scroll. Double click adatta la vista."
          ]
        },
        {
          title: "Cinematic Metrics",
          bullets: [
            "Mostra dati utili su velocita camera, distanza e andamento della ripresa.",
            "Serve a capire se un movimento e troppo veloce, irregolare o poco leggibile.",
            "Usalo prima dell'export finale, soprattutto per clip lunghe o vertical."
          ]
        }
      ]
    },
    actors: {
      title: "Actor Studio",
      summary:
        "Actor, puppet, identita, equipaggiamento, pose, performance clip, animation library e crowd placement.",
      media: "actors",
      sections: [
        {
          title: "Cosa sono gli actor",
          body: [
            "Gli actor sono puppet controllabili dentro il replay. Possono rappresentare player, mob o NPC e servono per ricostruire movimenti, scene RP, pose, azioni e inquadrature che non erano perfette durante la registrazione originale.",
            "Un actor puo essere inserito come puppet nuovo o usato come override di una entita registrata."
          ]
        },
        {
          title: "Schede principali",
          table: {
            headers: ["Scheda", "Funzione"],
            rows: [
              ["Editor", "Selezione actor, trasformazioni, write mode static/keyframe e strumenti principali."],
              ["Identity", "Nome, tipo entita, skin, cape, colore e Pehkui scale."],
              ["Equipment", "Armatura, offhand, hotbar, inventario, curios e item picker."],
              ["Library", "Performance clip, animation library `.franim` e riuso su altri replay."]
            ]
          }
        },
        {
          title: "Write mode",
          bullets: [
            "`Static`: scrive la trasformazione nella posa statica dell'actor.",
            "`Keyframe`: scrive la trasformazione come keyframe al tick corrente.",
            "`Offset`: riservato a un target di offset pianificato; usa Static o Keyframe quando lavori sulla build attuale."
          ]
        },
        {
          title: "Performance clip",
          steps: [
            "Seleziona un actor.",
            "Premi `Record Performance Clip`.",
            "Muovi la camera come controller del movimento.",
            "Ferma la registrazione performance.",
            "Rivedi la clip e applicala all'actor o salvala nella libreria.",
            "Usa `To Library` per creare un file `.franim` riutilizzabile in altri replay."
          ]
        },
        {
          title: "Equipaggiamento e item picker",
          body: [
            "L'item picker usa asset di gioco reali. Puoi cercare item, filtrare namespace, usare categorie e Recent. I componenti item complessi, enchant e trim sono trattati come sviluppo futuro quando non presenti nel controllo corrente."
          ]
        }
      ]
    },
    visuals: {
      title: "Visuals, Render Filter, Movement e Dialogue",
      summary:
        "Controlli visivi e strumenti di pulizia scena prima dell'export.",
      media: "metrics",
      sections: [
        {
          title: "Visuals",
          body: [
            "Visuals controlla look della scena: tempo, roll, camera shake, fog, color grade, world rendering e look library. Questi controlli servono a costruire coerenza visiva tra shot diversi."
          ],
          bullets: [
            "Disattiva cielo o elementi mondo quando vuoi compositing o transparent export.",
            "Usa color grade con moderazione per non perdere leggibilita.",
            "Salva look ricorrenti come riferimento di produzione."
          ]
        },
        {
          title: "Render Filter",
          body: [
            "Render Filter serve a nascondere entita o particelle che disturbano la scena. E utile in server affollati, replay RP o export puliti per trailer."
          ]
        },
        {
          title: "Movement",
          bullets: [
            "Flight direction controlla come si muove la camera editor.",
            "Momentum rende il movimento piu morbido o piu immediato.",
            "Lock X/Y/Z/Yaw/Pitch limita assi e rotazioni per riprese precise."
          ]
        },
        {
          title: "Dialogue",
          body: [
            "Dialogue aiuta a gestire caption e testo narrativo per contenuti RP o presentazioni. Usalo quando la clip deve spiegare una scena, una battuta o un passaggio narrativo."
          ]
        }
      ]
    },
    export: {
      title: "Export video, GIF, PNG e vertical",
      summary:
        "Start Export, codec, CRF/bitrate, audio, trasparenza, SSAA, profili e output.",
      media: "export",
      sections: [
        {
          title: "Prima di esportare",
          steps: [
            "Imposta il range nella timeline.",
            "Controlla camera, actor e visual.",
            "Apri Start Export.",
            "Scegli profilo, risoluzione, FPS, container, codec e qualita.",
            "Verifica path di output e nome file.",
            "Lancia export e attendi la fine senza chiudere il client."
          ]
        },
        {
          title: "Formati e output",
          table: {
            headers: ["Output", "Uso consigliato"],
            rows: [
              ["MP4", "Video finale per YouTube, Discord, CurseForge/Modrinth media e archiviazione."],
              ["GIF", "Dimostrazioni brevi nella pagina progetto o wiki."],
              ["PNG sequence", "Pipeline editing esterna, compositing e controllo frame-by-frame."],
              ["Vertical", "Shorts, TikTok, Reels e clip mobile."]
            ]
          }
        },
        {
          title: "Qualita",
          bullets: [
            "`Bitrate`: controlla la dimensione target del video. Valori alti danno file piu grandi.",
            "`CRF`: qualita costante. Valore piu basso significa piu qualita e file piu grande.",
            "`SSAA`: renderizza a risoluzione superiore e riduce aliasing, ma costa performance.",
            "`Reset RNG`: rende piu prevedibili particelle e casualita in export.",
            "`No GUI`: nasconde HUD e interfaccia nel render finale."
          ]
        },
        {
          title: "Trasparenza e audio",
          body: [
            "Transparent background richiede una scena preparata per compositing e un formato/codec adatto. Per audio, abilita record audio e scegli AAC o altro codec disponibile; stereo audio conserva canali separati quando supportato."
          ]
        },
        {
          title: "Profili export",
          body: [
            "I profili export salvano impostazioni riutilizzabili: codec video, codec audio, container, risoluzione, FPS e bitrate. Sono pensati per creator che esportano spesso nello stesso formato."
          ]
        }
      ]
    },
    files: {
      title: "File, cartelle e recupero",
      summary:
        "Dove finiscono replay, clip, export, animazioni e configurazioni; come ragionare sul recupero.",
      media: "preferences",
      sections: [
        {
          title: "Tipi di dati",
          table: {
            headers: ["Dato", "Scopo"],
            rows: [
              ["Replay/sessione", "Materiale registrato riapribile nell'editor."],
              ["Clip Capture Hub", "Estratti o highlight salvati da sessioni."],
              ["Export", "Video, GIF o sequenze PNG finali."],
              ["Animation library", "Clip `.franim` salvate per riuso actor."],
              ["Config", "Preferenze utente e stato UI."]
            ]
          }
        },
        {
          title: "Config",
          body: [
            "La configurazione usa una cartella `flashreplay` e un file `flashreplay.json` sotto la configurazione del profilo Minecraft. Il file contiene impostazioni di recording, interface, export, keyframe, movement, marker e preferenze interne."
          ]
        },
        {
          title: "Recupero registrazioni",
          bullets: [
            "Se il client si chiude durante recording, riapri il profilo e controlla le schermate di recupero o il Capture Hub.",
            "Non cancellare manualmente segmenti o file temporanei prima di aver provato il recupero.",
            "Se una clip e importante, esportala o duplicala in una cartella sicura prima di fare pulizia."
          ]
        },
        {
          title: "Backup consigliati",
          bullets: [
            "Backup periodico della cartella replay/clip prima di aggiornare modpack grandi.",
            "Backup dei file `.franim` se costruisci una libreria animazioni.",
            "Backup dei profili export se usi preset di produzione ricorrenti."
          ]
        }
      ]
    },
    settings: {
      title: "Impostazioni e keybind",
      summary:
        "Categorie FlashUI, opzioni principali, tasti consigliati e differenza tra impostazioni utente e editor.",
      media: "preferences",
      sections: [
        {
          title: "Categorie opzioni",
          table: {
            headers: ["Categoria", "Contenuto"],
            rows: [
              ["Recording Controls", "Posizione controlli, auto start, auto finish, toast, quicksave, Save Last."],
              ["Interface", "Densita UI e Studio Mode."],
              ["Recording", "Capture mode, chunk, rolling, marker, automation, hotbar, voice chat, Bobby."],
              ["Server Companion", "Consenso client per controlli o marker proposti dal server."],
              ["Exporting", "Nome file export e dummy frames."],
              ["Keyframes", "Interpolazione predefinita e realtime interpolation."],
              ["Editor Movement", "Direzione, momentum e lock assi."],
              ["Marker", "Keybind marker e colore/descrizione."],
              ["Advanced", "Opzioni diagnostiche e compatibilita avanzata."]
            ]
          }
        },
        {
          title: "Keybind consigliati",
          bullets: [
            "`Recording: Start` e `Recording: Finish` per controllo manuale affidabile.",
            "`Save Last 60s` per clip istantanee.",
            "`Save Highlight 30s` per momenti brevi.",
            "`Drop Bookmark #1-#4` per punti importanti.",
            "`Actor: Toggle Possession`, `Actor: Toggle Live-Record`, `Actor: Stamp Action Keyframe` se lavori molto con Actor Studio."
          ]
        },
        {
          title: "Server Companion",
          body: [
            "Server Companion e disattivato di default. Se abilitato, un server compatibile puo suggerire avvio/fine o marker, ma solo con consenso client. I marker evento sono controllati separatamente."
          ]
        }
      ]
    },
    troubleshooting: {
      title: "Troubleshooting tecnico",
      summary:
        "Problemi comuni, cause probabili e controlli concreti prima di chiedere supporto.",
      media: "preferences",
      sections: [
        {
          title: "La mod non compare",
          bullets: [
            "Controlla che il loader sia NeoForge e la versione Minecraft sia quella supportata dalla build.",
            "Verifica che il `.jar` sia nella cartella `mods` del profilo corretto.",
            "Avvia senza mod non essenziali se sospetti un conflitto di caricamento."
          ]
        },
        {
          title: "Recording non parte",
          bullets: [
            "Controlla keybind non assegnati o in conflitto.",
            "Se usi per-server policy, verifica che il server non sia impostato su OFF o MANUAL quando ti aspetti auto-start.",
            "Se usi automazioni, ricorda che sono disattivate di default."
          ]
        },
        {
          title: "Save Last non salva quello che volevi",
          bullets: [
            "Aumenta rolling retained seconds.",
            "Aggiungi pre-roll e post-roll.",
            "Usa Hybrid per sessioni lunghe dove vuoi limitare il disco.",
            "Premi il keybind appena dopo l'evento, non molto tempo dopo."
          ]
        },
        {
          title: "Export lento o pesante",
          bullets: [
            "Riduci risoluzione o FPS.",
            "Disattiva SSAA.",
            "Usa bitrate piu basso o CRF piu alto.",
            "Chiudi shaderpack pesanti o scegli un export shader pack piu leggero.",
            "Per debug, esporta un range breve prima del render finale."
          ]
        },
        {
          title: "Entita o particelle indesiderate",
          body: [
            "Usa Render Filter prima di esportare. Se hai nascosto qualcosa e poi non lo vedi piu, riapri Render Filter e controlla i filtri attivi prima di segnalare un bug."
          ]
        }
      ]
    },
    addons: {
      title: "Addon concessi e linee guida sviluppatori",
      summary:
        "Cosa e permesso creare attorno a Flash Replay, cosa non e permesso, e come pubblicare addon compatibili senza violare licenza o stabilita.",
      media: "actorReplay",
      sections: [
        {
          title: "Regola base",
          body: [
            "Flash Replay e Free download ed e All Rights Reserved. Puoi creare addon o contenuti compatibili, ma non puoi ridistribuire la mod, i suoi asset, il suo jar modificato o parti del codice sorgente.",
            "Un addon deve essere un progetto separato che dipende dalla mod ufficiale installata dall'utente.",
            "Gli addon concessi sono contenuti, preset, compatibilita o integrazioni esterne che rispettano consenso utente, licenza e confini tecnici documentati."
          ]
        },
        {
          title: "Addon concessi",
          table: {
            headers: ["Tipo addon", "Concesso se"],
            rows: [
              ["Resource pack / traduzioni", "Usa asset tuoi o testi tuoi e non copia logo, icone o immagini proprietarie senza permesso."],
              ["Preset visual o guide look", "Distribuisce solo valori, istruzioni o file propri, non file interni della mod."],
              ["Librerie animazioni `.franim`", "Contengono animazioni create da te e non materiale copiato da replay privati senza consenso."],
              ["Pack skin/cape per actor", "Usa skin e cape con diritti corretti e istruzioni di import chiare."],
              ["Profili export", "Distribuisce preset o documentazione dei valori, senza sovrascrivere config utente a forza."],
              ["Compat mod", "Usa dipendenza opzionale, non include Flash Replay, non modifica jar ufficiale e fallisce in modo sicuro."],
              ["Server companion integration", "Richiede consenso client e non avvia registrazioni senza opt-in esplicito dell'utente."]
            ]
          }
        },
        {
          title: "Non concesso",
          bullets: [
            "Redistribuire il jar di Flash Replay dentro un addon o modpack come file modificato.",
            "Pubblicare una build patchata di Flash Replay.",
            "Copiare codice, UI, logo, banner, GIF o screenshot ufficiali come se fossero asset tuoi.",
            "Usare nomi o icone che fanno sembrare l'addon ufficiale se non lo e.",
            "Aggirare consenso utente per recording, Save Last, export o upload.",
            "Leggere o caricare replay/export dell'utente verso servizi esterni senza consenso chiaro.",
            "Dipendere da classi interne instabili come contratto pubblico quando la wiki non le dichiara API."
          ]
        },
        {
          title: "Contratto tecnico consigliato",
          bullets: [
            "Tratta `com.lordbanana.flashreplay.*` come interno salvo API pubbliche documentate in futuro.",
            "Non esistono ancora entry point SDK pubblici stabili: finche non vengono documentati qui, non considerarli supportati.",
            "Usa dipendenze opzionali e controlli `ModList`/loader per non crashare se Flash Replay non e installato.",
            "Non mixare dentro classi Flash Replay per cambiare comportamento core senza accordo esplicito.",
            "Non scrivere direttamente nel config JSON dell'utente: se devi fornire preset, documenta i valori o usa import controllato.",
            "Versiona il tuo addon dichiarando la versione Flash Replay testata e la versione Minecraft/NeoForge."
          ]
        },
        {
          title: "Naming e pubblicazione",
          bullets: [
            "Nome consigliato: `Nome Addon for Flash Replay` o `Flash Replay compatibility for NomeMod`.",
            "Scrivi chiaramente `Unofficial addon` se non e pubblicato dal maintainer di Flash Replay.",
            "Linka la pagina ufficiale Flash Replay come dipendenza.",
            "Non usare `Flash Replay` come unico nome del tuo progetto.",
            "La licenza del tuo addon puo essere scelta da te, ma non puo concedere diritti su Flash Replay o sui suoi asset."
          ]
        },
        {
          title: "Checklist prima di pubblicare",
          steps: [
            "Verifica che l'addon funzioni senza includere il jar Flash Replay.",
            "Dichiara dipendenze e versioni testate.",
            "Rimuovi asset Flash Replay copiati se non hai permesso esplicito.",
            "Aggiungi informativa se tocchi recording, file replay, export o upload.",
            "Testa avvio con e senza Flash Replay installato.",
            "Testa su un nuovo profilo Minecraft per evitare di dipendere dalla tua config locale."
          ]
        }
      ]
    }
  },
  en: {
    index: {
      title: "Flash Replay technical manual",
      summary:
        "Operational wiki for recording, replay editing, camera work, actors, export, files, settings and permitted addons.",
      media: "replayPath",
      sections: [
        {
          title: "How to use this wiki",
          body: [
            "Each page explains a real mod area: what it does, when to use it, exact workflow, related settings and common mistakes.",
            "The GIFs come from real runtime screenshots or real exports from the mod. They are not fake UI captures."
          ],
          bullets: [
            "For quick clips, start with `Recording` and `Save Last`.",
            "For cinematic videos, read `Replay editor`, `Timeline`, `Camera` and `Export`.",
            "For extensions or compatibility projects, read `Permitted addons` before publishing."
          ]
        }
      ]
    },
    setup: {
      title: "Installation and requirements",
      summary: "Supported loader, mods folder, first launch checks and the minimum setup before recording.",
      media: "options",
      sections: [
        {
          title: "Current requirements",
          body: [
            "Flash Replay is a client-side Minecraft NeoForge 1.21.1 mod. The public build is installed on the creator client and does not require the server to install the same mod.",
            "Use the NeoForge version stated on the official project page. If a download page lists a newer minimum, follow that page."
          ],
          table: {
            headers: ["Item", "Operational value"],
            rows: [
              ["Minecraft", "1.21.1 in the current build"],
              ["Loader", "NeoForge"],
              ["Mod type", "Client-side"],
              ["License", "Free download, All Rights Reserved"],
              ["Source redistribution", "Not included in the public distribution"]
            ]
          }
        },
        {
          title: "Install",
          steps: [
            "Download the `.jar` from the official CurseForge or Modrinth page.",
            "Close Minecraft.",
            "Copy the `.jar` into the profile `mods` folder.",
            "Start the game and check the Mods screen.",
            "Open the mod options and review `Recording Controls`, `Recording`, `Interface` and `Exporting`."
          ]
        },
        {
          title: "First launch checklist",
          bullets: [
            "Bind start/finish recording, Save Last 60s, Highlight 30s and markers if you plan to use them.",
            "Choose a studio mode: Simple for fast work, Director for camera and actors, Pro for full control.",
            "Verify the export folder before running a long render."
          ]
        }
      ]
    },
    recording: {
      title: "Recording",
      summary: "How gameplay capture works, Normal/Rolling/Hybrid modes, event markers and server recording policy.",
      media: "options",
      sections: [
        {
          title: "What is recorded",
          body: [
            "A recording saves a replay session that can be reopened in the editor. During gameplay the mod captures packets, world state, entities, local-player motion and optional data such as hotbar or voice chat when compatible.",
            "The output is not a video. It is a replay session that you can reopen, trim, direct with cameras, edit with actors and export later."
          ]
        },
        {
          title: "Capture modes",
          table: {
            headers: ["Mode", "Best for", "Behavior"],
            rows: [
              ["Normal", "Planned full recordings", "Keeps the whole session until you save or finish it."],
              ["Rolling", "DVR-style clips", "Keeps a recent time window and prunes older material."],
              ["Hybrid", "Long sessions", "Combines a time window and disk budget to prevent uncontrolled growth."]
            ]
          }
        },
        {
          title: "Important settings",
          bullets: [
            "`Chunk length seconds`: recording segment length.",
            "`Rolling retained seconds`: how much recent time Rolling keeps.",
            "`Mark dimension changes`: creates markers when you change dimension.",
            "`Local player updates per second`: increases local-player movement fidelity.",
            "`Record voice chat`: shown only when a compatible voice chat mod is loaded."
          ]
        },
        {
          title: "Automation profiles",
          table: {
            headers: ["Profile", "Use"],
            rows: [
              ["Safe", "Only auto-finish on maximum duration."],
              ["Highlights", "Combat, death and big falls save clips or highlights."],
              ["Hazards", "Fire, freezing, wither and darkness create markers or Save Last clips."],
              ["Movement", "Dimension changes, elytra and major falls."],
              ["Manual Locked", "Starts and locks on critical events, then requires manual finish."]
            ]
          }
        }
      ]
    },
    "save-last": {
      title: "Save Last, Highlight and markers",
      summary: "Save recent moments, create highlights and mark important ticks during gameplay.",
      media: "capture",
      sections: [
        {
          title: "Save Last",
          body: [
            "Save Last uses the recent recording buffer to save a clip after the event already happened. Use it for clutch moments, bugs, roleplay beats or surprise scenes.",
            "The `Save Last 60s` keybind creates a clip from the available recent window."
          ],
          steps: [
            "Use Rolling or Hybrid if you want DVR behavior.",
            "Bind `Save Last 60s`.",
            "Play normally.",
            "Press the keybind right after the moment.",
            "Open Capture Hub to review, order and promote the clip."
          ]
        },
        {
          title: "Pre-roll and post-roll",
          body: [
            "`Save last pre-roll seconds` extends the clip start backwards. `Save last post-roll seconds` extends the end forwards. Use both to avoid cutting off context."
          ]
        },
        {
          title: "Highlight 30s",
          body: [
            "Highlight is a faster short-clip flow for important moments. Use the dedicated keybind when you want those clips separated from normal sessions."
          ]
        },
        {
          title: "Manual markers",
          bullets: [
            "Configure up to four marker keybinds with color, custom RGB, description and optional position saving.",
            "Markers make timeline navigation faster.",
            "Drop them during live recording when you already know a moment will matter."
          ]
        }
      ]
    },
    "capture-hub": {
      title: "Capture Hub",
      summary: "The control center for clips, sessions, environment checks and recorded material.",
      media: "capture",
      sections: [
        {
          title: "Purpose",
          body: [
            "Capture Hub collects saved clips, recording sessions and capture status. Open it when you want to move from recorded gameplay into material you can edit or export.",
            "Older clip browser, session and preflight windows are centralized here."
          ]
        },
        {
          title: "Operational tabs",
          table: {
            headers: ["Area", "Use"],
            rows: [
              ["Clips", "Review clips, order them, search, promote and open export paths."],
              ["Sessions", "Check active or completed sessions, status and errors."],
              ["Environment", "Check recording conditions, compatibility and pack context."]
            ]
          }
        },
        {
          title: "Manual ordering",
          body: [
            "Clips can keep a persistent manual order. Unordered clips remain visible by recency, while arranged clips follow your creator order."
          ]
        },
        {
          title: "When to use it",
          bullets: [
            "After Save Last or Highlight.",
            "After a long recording to pick useful takes.",
            "Before opening a replay in the editor.",
            "After a write or export error to inspect context."
          ]
        }
      ]
    },
    "replay-editor": {
      title: "Replay editor",
      summary: "Open a replay, navigate the editor and understand the main windows.",
      media: "replayPath",
      sections: [
        {
          title: "From replay to cinematic set",
          body: [
            "Opening a replay reconstructs the recorded world in a separate editing session. From there you can move the camera, set keyframes, filter entities, add actors, change visuals and prepare export.",
            "The editor uses movable windows. Open only what you need and keep the workspace practical."
          ]
        },
        {
          title: "Main windows",
          table: {
            headers: ["Window", "Function"],
            rows: [
              ["Player List", "Find recorded players and entities."],
              ["Movement", "Tune editor and camera movement."],
              ["Render Filter", "Hide or show entities and particles."],
              ["Dialogue", "Manage captions/dialogue for narrative content."],
              ["Cinematic Project", "Organize scenes, shots, takes and review."],
              ["Curve Editor", "Edit camera curves and keyed values."],
              ["Cinematic Metrics", "Analyze speed, distance, FOV and smoothness."],
              ["Actors", "Create and animate actor puppets."],
              ["Capture Hub", "Manage recorded clips and sessions."]
            ]
          }
        },
        {
          title: "Studio modes",
          bullets: [
            "Simple shows a guided workflow and hides diagnostic windows.",
            "Director exposes camera, project and actors without overwhelming the layout.",
            "Pro exposes everything for debugging and advanced export work."
          ]
        }
      ]
    },
    timeline: {
      title: "Timeline and export range",
      summary: "Transport, keyframes, tracks, I/O range, zoom and the segment that gets rendered.",
      media: "camera",
      sections: [
        {
          title: "Core idea",
          body: [
            "The timeline is the center of replay control. The playhead defines the current tick, tracks hold keyframes and the export range defines what will be rendered.",
            "Use I and O to set the start and end of the export range."
          ]
        },
        {
          title: "Timeline zones",
          table: {
            headers: ["Zone", "Use"],
            rows: [
              ["Transport", "Play, pause, jumps and current tick control."],
              ["Ruler", "Time scale and draggable export range."],
              ["Track list", "Track names and grouping."],
              ["Keyframe canvas", "Keyframes, selection, drag and edits."],
              ["Zoom bar", "Expand or compress the visible time range."]
            ]
          }
        },
        {
          title: "Keyframes",
          bullets: [
            "Add keyframes where camera, FOV, actor, audio or visual values must be fixed.",
            "Default interpolation comes from `Keyframes` options.",
            "Use Curve Editor when a movement feels mechanical or changes speed too sharply."
          ]
        },
        {
          title: "Export range",
          steps: [
            "Move the playhead to the first useful frame.",
            "Press I or set range start.",
            "Move to the final useful frame.",
            "Press O or set range end.",
            "Open Start Export and verify duration, FPS and resolution."
          ]
        }
      ]
    },
    camera: {
      title: "Camera Director and curves",
      summary: "Cinematic camera, rig, focus, FOV, keyframes, Curve Editor and metrics.",
      media: "camera",
      sections: [
        {
          title: "Cinematic camera",
          body: [
            "Flash Replay separates recorded gameplay from the final camera. You can record the scene once and direct it later like a set.",
            "Camera animation uses position, rotation, FOV and interpolation. Curves define how those values move through time."
          ]
        },
        {
          title: "Recommended workflow",
          steps: [
            "Open the replay and find the useful moment.",
            "Set the export range.",
            "Create primary camera keyframes: entry, middle, exit.",
            "Adjust FOV and focus when a subject needs emphasis.",
            "Open Curve Editor to clean speed, easing and transitions.",
            "Check Cinematic Metrics before final export."
          ]
        },
        {
          title: "Curve Editor",
          body: [
            "Drag points to edit. Shift+Click empty space adds a keyframe. Delete removes the selected point. Arrow keys nudge values, Ctrl makes larger nudges, scroll zooms and double-click fits the view."
          ]
        },
        {
          title: "Cinematic Metrics",
          bullets: [
            "Shows camera speed, distance and motion information.",
            "Helps detect shots that are too fast, irregular or hard to read.",
            "Use it before final export, especially for long or vertical clips."
          ]
        }
      ]
    },
    actors: {
      title: "Actor Studio",
      summary: "Actors, puppets, identity, equipment, pose, performance clips, animation library and crowd placement.",
      media: "actors",
      sections: [
        {
          title: "What actors are",
          body: [
            "Actors are controllable puppets inside the replay. They can represent players, mobs or NPCs and help rebuild movement, roleplay scenes, poses, actions and shots that were not perfect in the original recording.",
            "An actor can be inserted as a new puppet or used as an override for a recorded entity."
          ]
        },
        {
          title: "Main tabs",
          table: {
            headers: ["Tab", "Function"],
            rows: [
              ["Editor", "Actor selection, transforms, static/keyframe write mode and primary tools."],
              ["Identity", "Name, entity type, skin, cape, color and Pehkui scale."],
              ["Equipment", "Armor, offhand, hotbar, inventory, curios and item picker."],
              ["Library", "Performance clips, `.franim` animation library and reuse."]
            ]
          }
        },
        {
          title: "Write mode",
          bullets: [
            "`Static`: writes the transform into the actor static pose.",
            "`Keyframe`: writes the transform as a keyframe at the current tick.",
            "`Offset`: reserved for a planned offset target; use Static or Keyframe in the current build."
          ]
        },
        {
          title: "Performance clips",
          steps: [
            "Select an actor.",
            "Press `Record Performance Clip`.",
            "Move the camera as the motion controller.",
            "Stop performance recording.",
            "Review the clip and apply it to the actor or save it.",
            "Use `To Library` to create a reusable `.franim` file."
          ]
        },
        {
          title: "Equipment and item picker",
          body: [
            "The item picker renders items from real game assets. You can search, filter namespace, use categories and reuse Recent items. Complex components, enchantments and trims are future-facing when not present in the current control."
          ]
        }
      ]
    },
    visuals: {
      title: "Visuals, Render Filter, Movement and Dialogue",
      summary: "Scene-cleanup and visual-control tools before export.",
      media: "metrics",
      sections: [
        {
          title: "Visuals",
          body: [
            "Visuals controls scene look: time, roll, camera shake, fog, color grade, world rendering and look library. Use it to keep shots visually consistent."
          ],
          bullets: [
            "Disable sky or world elements when preparing compositing or transparent export.",
            "Use color grade carefully to preserve readability.",
            "Save recurring looks as production references."
          ]
        },
        {
          title: "Render Filter",
          body: [
            "Render Filter hides entities or particles that distract from the shot. Use it on crowded servers, roleplay scenes or trailer exports."
          ]
        },
        {
          title: "Movement",
          bullets: [
            "Flight direction controls how the editor camera moves.",
            "Momentum makes movement smoother or more immediate.",
            "X/Y/Z/Yaw/Pitch locks constrain axes and rotations for precise shots."
          ]
        },
        {
          title: "Dialogue",
          body: [
            "Dialogue helps manage captions and narrative text for roleplay content or presentations."
          ]
        }
      ]
    },
    export: {
      title: "Video, GIF, PNG and vertical export",
      summary: "Start Export, codecs, CRF/bitrate, audio, transparency, SSAA, profiles and output.",
      media: "export",
      sections: [
        {
          title: "Before exporting",
          steps: [
            "Set the timeline range.",
            "Check camera, actors and visuals.",
            "Open Start Export.",
            "Choose profile, resolution, FPS, container, codec and quality.",
            "Verify output path and filename.",
            "Start export and do not close the client until it finishes."
          ]
        },
        {
          title: "Formats",
          table: {
            headers: ["Output", "Best use"],
            rows: [
              ["MP4", "Final video for YouTube, Discord, project media and archive."],
              ["GIF", "Short demonstrations in the project page or wiki."],
              ["PNG sequence", "External editing, compositing and frame-by-frame control."],
              ["Vertical", "Shorts, TikTok, Reels and mobile clips."]
            ]
          }
        },
        {
          title: "Quality",
          bullets: [
            "`Bitrate`: targets file size and bandwidth.",
            "`CRF`: constant quality. Lower values mean higher quality and larger files.",
            "`SSAA`: supersamples for cleaner edges but costs performance.",
            "`Reset RNG`: makes particles and randomness more predictable during export.",
            "`No GUI`: hides HUD and UI in the final render."
          ]
        },
        {
          title: "Transparency and audio",
          body: [
            "Transparent background requires a scene prepared for compositing and a suitable format/codec. For audio, enable record audio and choose the available codec; stereo audio preserves channels when supported."
          ]
        },
        {
          title: "Export profiles",
          body: [
            "Export profiles save reusable settings: video codec, audio codec, container, resolution, FPS and bitrate."
          ]
        }
      ]
    },
    files: {
      title: "Files, folders and recovery",
      summary: "Where replays, clips, exports, animations and configuration live; how to think about recovery.",
      media: "preferences",
      sections: [
        {
          title: "Data types",
          table: {
            headers: ["Data", "Purpose"],
            rows: [
              ["Replay/session", "Recorded material that can reopen in the editor."],
              ["Capture Hub clip", "Saved highlight or extracted clip."],
              ["Export", "Final video, GIF or PNG sequence."],
              ["Animation library", "Reusable `.franim` actor clips."],
              ["Config", "User preferences and UI state."]
            ]
          }
        },
        {
          title: "Config",
          body: [
            "Configuration uses a `flashreplay` folder and `flashreplay.json` under the Minecraft profile config. It stores recording, interface, export, keyframe, movement, marker and internal preferences."
          ]
        },
        {
          title: "Recovery",
          bullets: [
            "If the client closes during recording, reopen the profile and check recovery screens or Capture Hub.",
            "Do not manually delete segments or temporary files before attempting recovery.",
            "For important clips, export or duplicate them before cleanup."
          ]
        },
        {
          title: "Recommended backups",
          bullets: [
            "Back up replay/clip folders before major modpack updates.",
            "Back up `.franim` files if you build an animation library.",
            "Back up export profiles if you use production presets."
          ]
        }
      ]
    },
    settings: {
      title: "Settings and keybinds",
      summary: "FlashUI categories, important options, recommended keys and editor preferences.",
      media: "preferences",
      sections: [
        {
          title: "Option categories",
          table: {
            headers: ["Category", "Contains"],
            rows: [
              ["Recording Controls", "Control location, auto start, auto finish, toasts, quicksave, Save Last."],
              ["Interface", "UI density and Studio Mode."],
              ["Recording", "Capture mode, chunking, rolling, markers, automation, hotbar, voice chat, Bobby."],
              ["Server Companion", "Client consent for server-proposed controls or markers."],
              ["Exporting", "Export filename and dummy frames."],
              ["Keyframes", "Default interpolation and realtime interpolation."],
              ["Editor Movement", "Direction, momentum and axis locks."],
              ["Marker", "Marker keybinds and color/description."],
              ["Advanced", "Diagnostic and advanced compatibility options."]
            ]
          }
        },
        {
          title: "Recommended keybinds",
          bullets: [
            "`Recording: Start` and `Recording: Finish` for reliable manual control.",
            "`Save Last 60s` for instant clips.",
            "`Save Highlight 30s` for short important moments.",
            "`Drop Bookmark #1-#4` for important points.",
            "`Actor: Toggle Possession`, `Actor: Toggle Live-Record`, `Actor: Stamp Action Keyframe` for Actor Studio work."
          ]
        },
        {
          title: "Server Companion",
          body: [
            "Server Companion is off by default. When enabled, a compatible server can suggest start/finish or markers only with client consent. Event markers are controlled separately."
          ]
        }
      ]
    },
    troubleshooting: {
      title: "Technical troubleshooting",
      summary: "Common problems, likely causes and concrete checks before support.",
      media: "preferences",
      sections: [
        {
          title: "The mod does not appear",
          bullets: [
            "Check that you are using NeoForge and the supported Minecraft version.",
            "Verify the `.jar` is in the correct profile `mods` folder.",
            "Start with non-essential mods removed if you suspect a loading conflict."
          ]
        },
        {
          title: "Recording does not start",
          bullets: [
            "Check unbound or conflicting keybinds.",
            "If using per-server policy, make sure the server is not OFF or MANUAL when you expect auto-start.",
            "Automation is disabled by default."
          ]
        },
        {
          title: "Save Last missed the moment",
          bullets: [
            "Increase rolling retained seconds.",
            "Add pre-roll and post-roll.",
            "Use Hybrid for long sessions with disk limits.",
            "Press the keybind soon after the event."
          ]
        },
        {
          title: "Export is slow",
          bullets: [
            "Lower resolution or FPS.",
            "Disable SSAA.",
            "Use lower bitrate or higher CRF.",
            "Disable heavy shaderpacks or choose a lighter export shader pack.",
            "Test a short range before the final render."
          ]
        },
        {
          title: "Missing or unwanted entities",
          body: [
            "Check Render Filter before reporting a bug. If you hid an entity or particle, it may still be filtered."
          ]
        }
      ]
    },
    addons: {
      title: "Permitted addons and developer guidelines",
      summary:
        "What you may build around Flash Replay, what is not allowed and how to publish compatible addons without breaking license or stability.",
      media: "actorReplay",
      sections: [
        {
          title: "Base rule",
          body: [
            "Flash Replay is a Free download and is All Rights Reserved. You may create compatible addons or content, but you may not redistribute the mod, its assets, a modified jar or source code.",
            "An addon must be a separate project that depends on the official mod installed by the user.",
            "Permitted add-ons are external content, presets, compatibility layers or integrations that respect user consent, license boundaries and the technical limits documented here."
          ]
        },
        {
          title: "Permitted addon types",
          table: {
            headers: ["Addon type", "Allowed when"],
            rows: [
              ["Resource packs / translations", "They use your own assets or text and do not copy proprietary logo, icons or media without permission."],
              ["Visual presets or look guides", "They distribute values, instructions or your own files, not internal mod files."],
              ["`.franim` animation libraries", "They contain animations created by you and not private replay material without consent."],
              ["Actor skin/cape packs", "They use correctly licensed skins/capes and clear import instructions."],
              ["Export profiles", "They distribute presets or documented values without force-overwriting user config."],
              ["Compatibility mods", "They use optional dependency, do not bundle Flash Replay, do not modify the official jar and fail safely."],
              ["Server companion integrations", "They require client consent and never start recordings without explicit opt-in."]
            ]
          }
        },
        {
          title: "Not allowed",
          bullets: [
            "Redistributing the Flash Replay jar inside an addon or as a modified file.",
            "Publishing a patched Flash Replay build.",
            "Copying code, UI, logo, banners, GIFs or official screenshots as your own assets.",
            "Using names or icons that make an addon look official when it is not.",
            "Bypassing user consent for recording, Save Last, export or upload.",
            "Reading or uploading user replays/exports to external services without clear consent.",
            "Treating unstable internal classes as a public contract when this wiki has not declared them as API."
          ]
        },
        {
          title: "Recommended technical contract",
          bullets: [
            "Treat `com.lordbanana.flashreplay.*` as internal unless a future public API page explicitly says otherwise.",
            "No stable SDK-style entry points are public yet: until they are documented here, do not treat them as supported.",
            "Use optional dependencies and loader checks so your addon does not crash when Flash Replay is absent.",
            "Do not mix into Flash Replay classes to change core behavior without explicit agreement.",
            "Do not write directly into the user's config JSON; provide presets or controlled import instead.",
            "Declare the tested Flash Replay, Minecraft and NeoForge versions."
          ]
        },
        {
          title: "Naming and publishing",
          bullets: [
            "Recommended naming: `Addon Name for Flash Replay` or `Flash Replay compatibility for ModName`.",
            "Write `Unofficial addon` clearly when it is not published by the Flash Replay maintainer.",
            "Link the official Flash Replay page as the dependency.",
            "Do not use `Flash Replay` as the only name of your project.",
            "Your addon can use your own license, but it cannot grant rights over Flash Replay or its assets."
          ]
        },
        {
          title: "Release checklist",
          steps: [
            "Verify the addon works without bundling the Flash Replay jar.",
            "Declare dependencies and tested versions.",
            "Remove copied Flash Replay assets unless you have explicit permission.",
            "Add a privacy note if you touch recording, replay files, exports or upload.",
            "Test startup with and without Flash Replay installed.",
            "Test on a fresh Minecraft profile so you are not relying on local config."
          ]
        }
      ]
    }
  },
  es: {
    index: {
      title: "Manual tecnico de Flash Replay",
      summary:
        "Wiki operativa para grabacion, editor de replay, camara, actores, exportacion, archivos, ajustes y addons permitidos.",
      media: "replayPath",
      sections: [
        {
          title: "Como usar esta wiki",
          body: [
            "Cada pagina explica una zona real de la mod: que hace, cuando usarla, flujo de trabajo, ajustes relacionados y errores comunes.",
            "Los GIF vienen de capturas runtime reales o exports reales de la mod. No son capturas falsas."
          ],
          bullets: [
            "Para clips rapidos, empieza por `Grabacion` y `Save Last`.",
            "Para videos cinematicos, lee `Editor replay`, `Timeline`, `Camara` y `Exportacion`.",
            "Para extensiones o compatibilidad, lee `Addons permitidos` antes de publicar."
          ]
        }
      ]
    },
    setup: {
      title: "Instalacion y requisitos",
      summary: "Loader soportado, carpeta mods, primer arranque y controles iniciales antes de grabar.",
      media: "options",
      sections: [
        {
          title: "Requisitos actuales",
          body: [
            "Flash Replay es una mod client-side para Minecraft NeoForge 1.21.1. La build publica se instala en el cliente del creador y no requiere que el servidor instale la misma mod.",
            "Usa la version de NeoForge indicada en la pagina oficial del proyecto. Si la pagina de descarga indica un minimo mas reciente, sigue esa pagina."
          ],
          table: {
            headers: ["Elemento", "Valor operativo"],
            rows: [
              ["Minecraft", "1.21.1 en la build actual"],
              ["Loader", "NeoForge"],
              ["Tipo de mod", "Client-side"],
              ["Licencia", "Free download, All Rights Reserved"],
              ["Redistribucion de fuente", "No incluida en la distribucion publica"]
            ]
          }
        },
        {
          title: "Instalar",
          steps: [
            "Descarga el `.jar` desde la pagina oficial de CurseForge o Modrinth.",
            "Cierra Minecraft.",
            "Copia el `.jar` en la carpeta `mods` del perfil.",
            "Inicia el juego y revisa la pantalla Mods.",
            "Abre las opciones de la mod y revisa `Recording Controls`, `Recording`, `Interface` y `Exporting`."
          ]
        },
        {
          title: "Checklist del primer arranque",
          bullets: [
            "Asigna teclas para start/finish recording, Save Last 60s, Highlight 30s y markers.",
            "Elige Studio Mode: Simple para trabajo rapido, Director para camara y actores, Pro para control completo.",
            "Verifica la carpeta de exportacion antes de un render largo."
          ]
        }
      ]
    },
    recording: {
      title: "Grabacion",
      summary: "Como funciona la captura, modos Normal/Rolling/Hybrid, markers y politicas de servidor.",
      media: "options",
      sections: [
        {
          title: "Que se graba",
          body: [
            "Una grabacion guarda una sesion replay que se puede reabrir en el editor. Durante el juego la mod captura paquetes, estado del mundo, entidades, movimiento del jugador local y datos opcionales como hotbar o voice chat si son compatibles.",
            "El resultado no es un video. Es una sesion replay que puedes reabrir, recortar, dirigir con camaras, editar con actores y exportar."
          ]
        },
        {
          title: "Modos de captura",
          table: {
            headers: ["Modo", "Uso recomendado", "Comportamiento"],
            rows: [
              ["Normal", "Grabaciones completas planificadas", "Mantiene toda la sesion hasta guardar o terminar."],
              ["Rolling", "Clips estilo DVR", "Mantiene una ventana reciente y elimina material antiguo."],
              ["Hybrid", "Sesiones largas", "Combina ventana temporal y limite de disco para evitar crecimiento sin control."]
            ]
          }
        },
        {
          title: "Ajustes importantes",
          bullets: [
            "`Chunk length seconds`: duracion de segmentos de grabacion.",
            "`Rolling retained seconds`: tiempo reciente que conserva Rolling.",
            "`Mark dimension changes`: crea markers cuando cambias de dimension.",
            "`Local player updates per second`: aumenta fidelidad del movimiento local.",
            "`Record voice chat`: aparece solo si la mod voice chat compatible esta cargada."
          ]
        },
        {
          title: "Perfiles de automatizacion",
          table: {
            headers: ["Perfil", "Uso"],
            rows: [
              ["Safe", "Solo auto-finish por duracion maxima."],
              ["Highlights", "Combate, muerte y caidas grandes crean clips o highlights."],
              ["Hazards", "Fuego, freezing, wither y darkness crean markers o Save Last."],
              ["Movement", "Cambio de dimension, elytra y caidas importantes."],
              ["Manual Locked", "Empieza y bloquea en eventos criticos; se termina manualmente."]
            ]
          }
        }
      ]
    },
    "save-last": {
      title: "Save Last, Highlight y markers",
      summary: "Guardar momentos recientes, crear highlights y marcar ticks importantes durante gameplay.",
      media: "capture",
      sections: [
        {
          title: "Save Last",
          body: [
            "Save Last usa el buffer reciente para guardar un clip despues de que el evento ocurrio. Sirve para clutch, errores visuales, roleplay y escenas inesperadas.",
            "La tecla `Save Last 60s` crea un clip desde la ventana reciente disponible."
          ],
          steps: [
            "Usa Rolling o Hybrid si quieres comportamiento DVR.",
            "Asigna `Save Last 60s`.",
            "Juega normalmente.",
            "Pulsa la tecla justo despues del momento.",
            "Abre Capture Hub para revisar, ordenar y promover el clip."
          ]
        },
        {
          title: "Pre-roll y post-roll",
          body: [
            "`Save last pre-roll seconds` extiende el inicio del clip hacia atras. `Save last post-roll seconds` extiende el final hacia adelante."
          ]
        },
        {
          title: "Highlight 30s",
          body: [
            "Highlight es un flujo rapido para clips cortos importantes. Usa la tecla dedicada para separarlos de sesiones normales."
          ]
        },
        {
          title: "Markers manuales",
          bullets: [
            "Puedes configurar hasta cuatro markers con color, RGB custom, descripcion y posicion opcional.",
            "Los markers aceleran la navegacion en timeline.",
            "Usalos durante la grabacion cuando sabes que un punto sera importante."
          ]
        }
      ]
    },
    "capture-hub": {
      title: "Capture Hub",
      summary: "Centro de control para clips, sesiones, ambiente y material grabado.",
      media: "capture",
      sections: [
        {
          title: "Proposito",
          body: [
            "Capture Hub reune clips guardados, sesiones de grabacion y estado de captura. Abrelo cuando quieras pasar de gameplay grabado a material editable o exportable.",
            "Las ventanas antiguas de clip browser, sesiones y preflight estan centralizadas aqui."
          ]
        },
        {
          title: "Pestanas operativas",
          table: {
            headers: ["Area", "Uso"],
            rows: [
              ["Clips", "Revisar clips, ordenar, buscar, promover y abrir rutas de export."],
              ["Sessions", "Ver sesiones activas o completadas, estado y errores."],
              ["Environment", "Revisar condiciones de grabacion, compatibilidad y contexto del pack."]
            ]
          }
        },
        {
          title: "Orden manual",
          body: [
            "Los clips pueden conservar un orden manual persistente. Los no ordenados siguen visibles por fecha reciente."
          ]
        },
        {
          title: "Cuando usarlo",
          bullets: [
            "Despues de Save Last o Highlight.",
            "Despues de una grabacion larga.",
            "Antes de abrir un replay en el editor.",
            "Despues de un error de escritura o exportacion."
          ]
        }
      ]
    },
    "replay-editor": {
      title: "Editor replay",
      summary: "Abrir un replay, navegar el editor y entender las ventanas principales.",
      media: "replayPath",
      sections: [
        {
          title: "Del replay al set cinematografico",
          body: [
            "Abrir un replay reconstruye el mundo grabado en una sesion de edicion separada. Desde ahi puedes mover la camara, crear keyframes, filtrar entidades, agregar actores, cambiar visuals y preparar export.",
            "El editor usa ventanas movibles. Abre solo lo necesario y conserva un workspace practico."
          ]
        },
        {
          title: "Ventanas principales",
          table: {
            headers: ["Ventana", "Funcion"],
            rows: [
              ["Player List", "Encontrar jugadores y entidades grabadas."],
              ["Movement", "Ajustar movimiento de editor y camara."],
              ["Render Filter", "Ocultar o mostrar entidades y particulas."],
              ["Dialogue", "Gestionar captions/dialogo para contenido narrativo."],
              ["Cinematic Project", "Organizar escenas, shots, takes y review."],
              ["Curve Editor", "Editar curvas de camara y valores."],
              ["Cinematic Metrics", "Analizar velocidad, distancia, FOV y suavidad."],
              ["Actors", "Crear y animar puppets."],
              ["Capture Hub", "Gestionar clips y sesiones grabadas."]
            ]
          }
        },
        {
          title: "Studio modes",
          bullets: [
            "Simple muestra un flujo guiado y oculta ventanas diagnosticas.",
            "Director expone camara, proyecto y actores sin sobrecargar.",
            "Pro muestra todo para debug y export avanzado."
          ]
        }
      ]
    },
    timeline: {
      title: "Timeline y rango de export",
      summary: "Transporte, keyframes, tracks, rango I/O, zoom y segmento renderizado.",
      media: "camera",
      sections: [
        {
          title: "Idea central",
          body: [
            "La timeline es el centro de control del replay. El playhead define el tick actual, los tracks contienen keyframes y el rango export define que se renderiza.",
            "Usa I y O para definir inicio y fin del rango de export."
          ]
        },
        {
          title: "Zonas de timeline",
          table: {
            headers: ["Zona", "Uso"],
            rows: [
              ["Transport", "Play, pausa, saltos y tick actual."],
              ["Ruler", "Escala temporal y rango export arrastrable."],
              ["Track list", "Nombres y grupos de tracks."],
              ["Keyframe canvas", "Keyframes, seleccion, drag y edicion."],
              ["Zoom bar", "Expandir o comprimir el rango visible."]
            ]
          }
        },
        {
          title: "Keyframes",
          bullets: [
            "Agrega keyframes donde camara, FOV, actor, audio o visual deben fijarse.",
            "La interpolacion por defecto viene de opciones `Keyframes`.",
            "Usa Curve Editor cuando un movimiento parece mecanico."
          ]
        },
        {
          title: "Rango export",
          steps: [
            "Mueve el playhead al primer frame util.",
            "Pulsa I o define start.",
            "Mueve al ultimo frame util.",
            "Pulsa O o define end.",
            "Abre Start Export y verifica duracion, FPS y resolucion."
          ]
        }
      ]
    },
    camera: {
      title: "Camera Director y curvas",
      summary: "Camara cinematica, rig, focus, FOV, keyframes, Curve Editor y metrics.",
      media: "camera",
      sections: [
        {
          title: "Camara cinematica",
          body: [
            "Flash Replay separa el gameplay grabado de la camara final. Puedes grabar una escena una vez y dirigirla despues.",
            "La animacion de camara usa posicion, rotacion, FOV e interpolacion. Las curvas definen como esos valores cambian en el tiempo."
          ]
        },
        {
          title: "Workflow recomendado",
          steps: [
            "Abre el replay y encuentra el momento util.",
            "Define el rango export.",
            "Crea keyframes principales: entrada, centro, salida.",
            "Ajusta FOV y focus si el sujeto debe destacar.",
            "Abre Curve Editor para limpiar velocidad, easing y transiciones.",
            "Revisa Cinematic Metrics antes del export final."
          ]
        },
        {
          title: "Curve Editor",
          body: [
            "Arrastra puntos para editar. Shift+Click en espacio vacio agrega keyframe. Delete elimina el punto seleccionado. Flechas hacen nudge, Ctrl aumenta el paso, scroll zoom y double-click ajusta vista."
          ]
        },
        {
          title: "Cinematic Metrics",
          bullets: [
            "Muestra velocidad de camara, distancia e informacion de movimiento.",
            "Ayuda a detectar shots demasiado rapidos o irregulares.",
            "Usalo antes del export final, sobre todo en clips largos o verticales."
          ]
        }
      ]
    },
    actors: {
      title: "Actor Studio",
      summary: "Actores, puppets, identidad, equipamiento, pose, performance clips, animation library y crowd placement.",
      media: "actors",
      sections: [
        {
          title: "Que son los actores",
          body: [
            "Los actores son puppets controlables dentro del replay. Pueden representar players, mobs o NPCs y ayudan a reconstruir movimiento, roleplay, poses, acciones y shots que no salieron perfectos en la grabacion original.",
            "Un actor puede insertarse como puppet nuevo o usarse como override de una entidad grabada."
          ]
        },
        {
          title: "Pestanas principales",
          table: {
            headers: ["Pestana", "Funcion"],
            rows: [
              ["Editor", "Seleccion, transforms, write mode static/keyframe y herramientas principales."],
              ["Identity", "Nombre, tipo de entidad, skin, cape, color y Pehkui scale."],
              ["Equipment", "Armor, offhand, hotbar, inventario, curios e item picker."],
              ["Library", "Performance clips, libreria `.franim` y reutilizacion."]
            ]
          }
        },
        {
          title: "Write mode",
          bullets: [
            "`Static`: escribe transform en la pose estatica del actor.",
            "`Keyframe`: escribe transform como keyframe en el tick actual.",
            "`Offset`: reservado para un target futuro; usa Static o Keyframe en la build actual."
          ]
        },
        {
          title: "Performance clips",
          steps: [
            "Selecciona un actor.",
            "Pulsa `Record Performance Clip`.",
            "Mueve la camara como controlador de movimiento.",
            "Deten la grabacion performance.",
            "Revisa la clip y aplicala al actor o guardala.",
            "Usa `To Library` para crear un archivo `.franim` reutilizable."
          ]
        },
        {
          title: "Equipment e item picker",
          body: [
            "El item picker renderiza items desde assets reales del juego. Puedes buscar, filtrar namespace, usar categorias y Recent. Componentes complejos, enchantments y trims son futuros si no aparecen en el control actual."
          ]
        }
      ]
    },
    visuals: {
      title: "Visuals, Render Filter, Movement y Dialogue",
      summary: "Herramientas de limpieza y control visual antes del export.",
      media: "metrics",
      sections: [
        {
          title: "Visuals",
          body: [
            "Visuals controla el look de la escena: tiempo, roll, camera shake, fog, color grade, world rendering y look library. Usalo para mantener consistencia entre shots."
          ],
          bullets: [
            "Desactiva cielo o elementos del mundo para compositing o transparent export.",
            "Usa color grade con cuidado para conservar legibilidad.",
            "Guarda looks recurrentes como referencias de produccion."
          ]
        },
        {
          title: "Render Filter",
          body: [
            "Render Filter oculta entidades o particulas que distraen del shot. Es util en servidores llenos, roleplay y trailers."
          ]
        },
        {
          title: "Movement",
          bullets: [
            "Flight direction controla como se mueve la camara editor.",
            "Momentum hace el movimiento mas suave o inmediato.",
            "Locks X/Y/Z/Yaw/Pitch limitan ejes y rotaciones."
          ]
        },
        {
          title: "Dialogue",
          body: [
            "Dialogue ayuda a gestionar captions y texto narrativo para roleplay o presentaciones."
          ]
        }
      ]
    },
    export: {
      title: "Export video, GIF, PNG y vertical",
      summary: "Start Export, codecs, CRF/bitrate, audio, transparencia, SSAA, perfiles y output.",
      media: "export",
      sections: [
        {
          title: "Antes de exportar",
          steps: [
            "Define el rango en timeline.",
            "Revisa camara, actores y visuals.",
            "Abre Start Export.",
            "Elige perfil, resolucion, FPS, container, codec y calidad.",
            "Verifica ruta de salida y nombre.",
            "Inicia export y no cierres el cliente hasta terminar."
          ]
        },
        {
          title: "Formatos",
          table: {
            headers: ["Output", "Uso recomendado"],
            rows: [
              ["MP4", "Video final para YouTube, Discord, media del proyecto y archivo."],
              ["GIF", "Demostraciones cortas en pagina del proyecto o wiki."],
              ["PNG sequence", "Edicion externa, compositing y control frame-by-frame."],
              ["Vertical", "Shorts, TikTok, Reels y clips mobile."]
            ]
          }
        },
        {
          title: "Calidad",
          bullets: [
            "`Bitrate`: controla tamano objetivo y ancho de banda.",
            "`CRF`: calidad constante. Valor menor significa mas calidad y archivo mas grande.",
            "`SSAA`: supersampling para bordes mas limpios, con coste de rendimiento.",
            "`Reset RNG`: hace particulas y aleatoriedad mas predecibles.",
            "`No GUI`: oculta HUD e interfaz en el render final."
          ]
        },
        {
          title: "Transparencia y audio",
          body: [
            "Transparent background requiere escena preparada para compositing y formato/codec adecuado. Para audio, habilita record audio y elige codec disponible; stereo audio conserva canales si esta soportado."
          ]
        },
        {
          title: "Perfiles export",
          body: [
            "Los perfiles export guardan ajustes reutilizables: codec video, codec audio, container, resolucion, FPS y bitrate."
          ]
        }
      ]
    },
    files: {
      title: "Archivos, carpetas y recuperacion",
      summary: "Donde viven replays, clips, exports, animaciones y configuracion; como razonar sobre recuperacion.",
      media: "preferences",
      sections: [
        {
          title: "Tipos de datos",
          table: {
            headers: ["Dato", "Proposito"],
            rows: [
              ["Replay/sesion", "Material grabado que se puede reabrir en editor."],
              ["Clip Capture Hub", "Highlight o clip extraido."],
              ["Export", "Video final, GIF o secuencia PNG."],
              ["Animation library", "Clips `.franim` reutilizables."],
              ["Config", "Preferencias de usuario y estado UI."]
            ]
          }
        },
        {
          title: "Config",
          body: [
            "La configuracion usa carpeta `flashreplay` y `flashreplay.json` bajo la config del perfil Minecraft. Guarda recording, interface, export, keyframe, movement, marker y preferencias internas."
          ]
        },
        {
          title: "Recuperacion",
          bullets: [
            "Si el cliente se cierra durante grabacion, reabre el perfil y revisa recovery o Capture Hub.",
            "No borres segmentos o temporales manualmente antes de intentar recuperar.",
            "Para clips importantes, exporta o duplica antes de limpiar."
          ]
        },
        {
          title: "Backups recomendados",
          bullets: [
            "Backup de carpetas replay/clip antes de grandes updates del modpack.",
            "Backup de `.franim` si construyes libreria de animaciones.",
            "Backup de perfiles export si usas presets de produccion."
          ]
        }
      ]
    },
    settings: {
      title: "Ajustes y keybinds",
      summary: "Categorias FlashUI, opciones importantes, teclas recomendadas y preferencias editor.",
      media: "preferences",
      sections: [
        {
          title: "Categorias de opciones",
          table: {
            headers: ["Categoria", "Contiene"],
            rows: [
              ["Recording Controls", "Ubicacion, auto start, auto finish, toasts, quicksave, Save Last."],
              ["Interface", "UI density y Studio Mode."],
              ["Recording", "Capture mode, chunk, rolling, markers, automation, hotbar, voice chat, Bobby."],
              ["Server Companion", "Consentimiento client para controles o markers sugeridos por server."],
              ["Exporting", "Nombre de export y dummy frames."],
              ["Keyframes", "Interpolacion por defecto y realtime interpolation."],
              ["Editor Movement", "Direccion, momentum y locks."],
              ["Marker", "Keybinds marker, color y descripcion."],
              ["Advanced", "Diagnostico y compatibilidad avanzada."]
            ]
          }
        },
        {
          title: "Keybinds recomendados",
          bullets: [
            "`Recording: Start` y `Recording: Finish` para control manual.",
            "`Save Last 60s` para clips instantaneos.",
            "`Save Highlight 30s` para momentos cortos importantes.",
            "`Drop Bookmark #1-#4` para puntos clave.",
            "`Actor: Toggle Possession`, `Actor: Toggle Live-Record`, `Actor: Stamp Action Keyframe` para Actor Studio."
          ]
        },
        {
          title: "Server Companion",
          body: [
            "Server Companion esta desactivado por defecto. Si se habilita, un servidor compatible puede sugerir start/finish o markers solo con consentimiento del cliente."
          ]
        }
      ]
    },
    troubleshooting: {
      title: "Troubleshooting tecnico",
      summary: "Problemas comunes, causas probables y checks concretos antes de soporte.",
      media: "preferences",
      sections: [
        {
          title: "La mod no aparece",
          bullets: [
            "Comprueba que usas NeoForge y la version Minecraft soportada.",
            "Verifica que el `.jar` esta en la carpeta `mods` correcta.",
            "Prueba sin mods no esenciales si sospechas conflicto de carga."
          ]
        },
        {
          title: "Recording no empieza",
          bullets: [
            "Revisa keybinds sin asignar o en conflicto.",
            "Si usas politica por servidor, asegúrate de que no este OFF o MANUAL cuando esperas auto-start.",
            "Las automatizaciones estan desactivadas por defecto."
          ]
        },
        {
          title: "Save Last no capturo el momento",
          bullets: [
            "Aumenta rolling retained seconds.",
            "Agrega pre-roll y post-roll.",
            "Usa Hybrid para sesiones largas con limite disco.",
            "Pulsa la tecla poco despues del evento."
          ]
        },
        {
          title: "Export lento",
          bullets: [
            "Baja resolucion o FPS.",
            "Desactiva SSAA.",
            "Usa menor bitrate o CRF mas alto.",
            "Desactiva shaderpacks pesados o elige uno mas ligero.",
            "Prueba un rango corto antes del render final."
          ]
        },
        {
          title: "Entidades faltantes o no deseadas",
          body: [
            "Revisa Render Filter antes de reportar bug. Si ocultaste una entidad o particula, puede seguir filtrada."
          ]
        }
      ]
    },
    addons: {
      title: "Addons permitidos y guia para desarrolladores",
      summary:
        "Que se puede crear alrededor de Flash Replay, que no esta permitido y como publicar addons compatibles sin romper licencia o estabilidad.",
      media: "actorReplay",
      sections: [
        {
          title: "Regla base",
          body: [
            "Flash Replay es Free download y All Rights Reserved. Puedes crear addons o contenido compatible, pero no puedes redistribuir la mod, sus assets, un jar modificado o codigo fuente.",
            "Un addon debe ser un proyecto separado que depende de la mod oficial instalada por el usuario.",
            "Los addons permitidos son contenido externo, presets, capas de compatibilidad o integraciones que respetan consentimiento de usuario, licencia y limites tecnicos documentados aqui."
          ]
        },
        {
          title: "Tipos de addon permitidos",
          table: {
            headers: ["Tipo addon", "Permitido si"],
            rows: [
              ["Resource packs / traducciones", "Usan tus propios assets o textos y no copian logo, iconos o media propietarios sin permiso."],
              ["Presets visuales o guias look", "Distribuyen valores, instrucciones o archivos propios, no archivos internos de la mod."],
              ["Librerias `.franim`", "Contienen animaciones creadas por ti y no material privado sin consentimiento."],
              ["Packs skin/cape para actors", "Usan skin/cape con derechos correctos e instrucciones claras."],
              ["Perfiles export", "Distribuyen presets o valores documentados sin sobrescribir config del usuario a la fuerza."],
              ["Mods de compatibilidad", "Usan dependencia opcional, no incluyen Flash Replay, no modifican el jar oficial y fallan de forma segura."],
              ["Server companion integrations", "Requieren consentimiento client y nunca empiezan grabaciones sin opt-in explicito."]
            ]
          }
        },
        {
          title: "No permitido",
          bullets: [
            "Redistribuir el jar Flash Replay dentro de un addon o como archivo modificado.",
            "Publicar una build parcheada de Flash Replay.",
            "Copiar codigo, UI, logo, banners, GIFs o screenshots oficiales como assets propios.",
            "Usar nombres o iconos que hagan parecer oficial un addon no oficial.",
            "Evitar consentimiento de usuario para recording, Save Last, export o upload.",
            "Leer o subir replays/exports del usuario a servicios externos sin consentimiento claro.",
            "Tratar clases internas inestables como contrato publico cuando esta wiki no las declara API."
          ]
        },
        {
          title: "Contrato tecnico recomendado",
          bullets: [
            "Trata `com.lordbanana.flashreplay.*` como interno salvo que una futura pagina API publica diga lo contrario.",
            "Todavia no hay entry points SDK estables publicos: hasta que esten documentados aqui, no los trates como soportados.",
            "Usa dependencias opcionales y checks de loader para no crashear si Flash Replay no esta instalado.",
            "No hagas mixins dentro de clases Flash Replay para cambiar core sin acuerdo explicito.",
            "No escribas directamente en el JSON de config del usuario; ofrece presets o import controlado.",
            "Declara versiones testadas de Flash Replay, Minecraft y NeoForge."
          ]
        },
        {
          title: "Naming y publicacion",
          bullets: [
            "Nombre recomendado: `Addon Name for Flash Replay` o `Flash Replay compatibility for ModName`.",
            "Escribe `Unofficial addon` claramente si no lo publica el maintainer de Flash Replay.",
            "Linka la pagina oficial Flash Replay como dependencia.",
            "No uses `Flash Replay` como unico nombre del proyecto.",
            "Tu addon puede usar su propia licencia, pero no puede conceder derechos sobre Flash Replay o sus assets."
          ]
        },
        {
          title: "Checklist de publicacion",
          steps: [
            "Verifica que el addon funciona sin incluir el jar Flash Replay.",
            "Declara dependencias y versiones testadas.",
            "Elimina assets Flash Replay copiados salvo permiso explicito.",
            "Agrega nota de privacidad si tocas recording, replay files, exports o upload.",
            "Testea arranque con y sin Flash Replay instalado.",
            "Testea en un perfil Minecraft nuevo para no depender de tu config local."
          ]
        }
      ]
    }
  }
};

const pageLabels = {
  it: {
    index: "Indice",
    setup: "Installazione",
    recording: "Registrazione",
    "save-last": "Save Last",
    "capture-hub": "Capture Hub",
    "replay-editor": "Editor replay",
    timeline: "Timeline",
    camera: "Camera",
    actors: "Actor Studio",
    visuals: "Visuals",
    export: "Export",
    files: "File e recupero",
    settings: "Impostazioni",
    troubleshooting: "Troubleshooting",
    addons: "Addon concessi"
  },
  en: {
    index: "Index",
    setup: "Installation",
    recording: "Recording",
    "save-last": "Save Last",
    "capture-hub": "Capture Hub",
    "replay-editor": "Replay editor",
    timeline: "Timeline",
    camera: "Camera",
    actors: "Actor Studio",
    visuals: "Visuals",
    export: "Export",
    files: "Files and recovery",
    settings: "Settings",
    troubleshooting: "Troubleshooting",
    addons: "Permitted addons"
  },
  es: {
    index: "Indice",
    setup: "Instalacion",
    recording: "Grabacion",
    "save-last": "Save Last",
    "capture-hub": "Capture Hub",
    "replay-editor": "Editor replay",
    timeline: "Timeline",
    camera: "Camara",
    actors: "Actor Studio",
    visuals: "Visuals",
    export: "Export",
    files: "Archivos",
    settings: "Ajustes",
    troubleshooting: "Troubleshooting",
    addons: "Addons permitidos"
  }
};

function slugFile(slug) {
  return slug === "index" ? "index.html" : `${slug}.html`;
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(value) {
  return esc(value).replace(/`([^`]+)`/g, "<code>$1</code>");
}

function idFor(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderTable(table) {
  if (!table) return "";
  return `<div class="table-wrap"><table><thead><tr>${table.headers
    .map((head) => `<th>${inline(head)}</th>`)
    .join("")}</tr></thead><tbody>${table.rows
    .map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;
}

function renderSection(section, index) {
  const id = idFor(section.title);
  const body = (section.body || []).map((text) => `<p>${inline(text)}</p>`).join("");
  const bullets = section.bullets
    ? `<ul>${section.bullets.map((item) => `<li>${inline(item)}</li>`).join("")}</ul>`
    : "";
  const steps = section.steps
    ? `<ol>${section.steps.map((item) => `<li>${inline(item)}</li>`).join("")}</ol>`
    : "";
  return `<section class="doc-section" id="${id}">
    <div class="section-kicker">${String(index + 1).padStart(2, "0")}</div>
    <h2>${inline(section.title)}</h2>
    ${body}
    ${renderTable(section.table)}
    ${bullets}
    ${steps}
  </section>`;
}

function renderNav(lang, currentSlug) {
  const labels = pageLabels[lang];
  return `<nav class="side-nav" aria-label="${esc(langs[lang].pagesLabel)}">
    <div class="side-nav__title">${esc(langs[lang].pagesLabel)}</div>
    ${pageOrder
      .map((slug) => {
        const href = slugFile(slug);
        const active = slug === currentSlug ? " aria-current=\"page\"" : "";
        return `<a${active} href="${href}">${esc(labels[slug])}</a>`;
      })
      .join("")}
  </nav>`;
}

function renderToc(lang, page) {
  return `<aside class="toc" aria-label="${esc(langs[lang].tocLabel)}">
    <div class="toc__title">${esc(langs[lang].tocLabel)}</div>
    ${(page.sections || [])
      .map((section) => `<a href="#${idFor(section.title)}">${esc(section.title)}</a>`)
      .join("")}
  </aside>`;
}

function renderLanguageSwitch(lang, slug) {
  return `<div class="lang-switch" aria-label="Languages">
    ${Object.keys(langs)
      .map((code) => {
        const active = code === lang ? " aria-current=\"true\"" : "";
        return `<a${active} href="../${code}/${slugFile(slug)}">${esc(langs[code].label)}</a>`;
      })
      .join("")}
  </div>`;
}

function renderCards(lang) {
  return `<div class="card-grid">${pageOrder
    .filter((slug) => slug !== "index")
    .map((slug) => {
      const page = pages[lang][slug];
      return `<a class="doc-card" href="${slugFile(slug)}">
        <span>${esc(pageLabels[lang][slug])}</span>
        <strong>${esc(page.title)}</strong>
        <p>${esc(page.summary)}</p>
      </a>`;
    })
    .join("")}</div>`;
}

function renderPage(lang, slug) {
  const page = pages[lang][slug];
  const l = langs[lang];
  const mediaSrc = page.media ? media[page.media] : null;
  const mediaHtml = mediaSrc
    ? `<figure class="hero-media">
        <img src="${mediaSrc}" alt="${esc(page.title)}" loading="eager">
        <figcaption>${esc(l.verified)}</figcaption>
      </figure>`
    : "";
  const indexCards = slug === "index" ? renderCards(lang) : "";
  const sections = page.sections.map((section, index) => renderSection(section, index)).join("");
  return `<!doctype html>
<html lang="${esc(l.code)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)} | Flash Replay Wiki</title>
  <meta name="description" content="${esc(page.summary)}">
  <link rel="icon" href="../../assets/banner/flashreplay-hero-banner.png">
  <link rel="stylesheet" href="../wiki.css">
</head>
<body>
  <header class="topbar">
    <a class="brand" href="index.html"><img src="../../assets/banner/flashreplay-hero-banner.png" alt=""> <span>${esc(l.navTitle)}</span></a>
    ${renderLanguageSwitch(lang, slug)}
  </header>
  <div class="layout">
    ${renderNav(lang, slug)}
    <main class="content">
      <article class="doc">
        <div class="breadcrumbs"><a href="../index.html">${esc(l.root)}</a><span>/</span><a href="index.html">${esc(l.backHome)}</a></div>
        <header class="doc-hero">
          <div>
            <p class="eyebrow">${esc(l.updated)}</p>
            <h1>${inline(page.title)}</h1>
            <p class="lead">${inline(page.summary)}</p>
            <div class="badges"><span>${esc(l.free)}</span><span>${esc(l.rights)}</span><span>NeoForge 1.21.1</span></div>
          </div>
          ${mediaHtml}
        </header>
        ${indexCards}
        ${sections}
      </article>
    </main>
    ${renderToc(lang, page)}
  </div>
  <footer class="footer">${inline(l.footer)}</footer>
  <script src="../wiki.js"></script>
</body>
</html>`;
}

function renderRoot() {
  return `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Flash Replay Wiki</title>
  <meta name="description" content="Technical wiki for Flash Replay in Italian, English and Spanish.">
  <link rel="icon" href="../assets/banner/flashreplay-hero-banner.png">
  <link rel="stylesheet" href="wiki.css">
</head>
<body>
  <header class="topbar topbar--root">
    <a class="brand" href="../index.html"><img src="../assets/banner/flashreplay-hero-banner.png" alt=""> <span>Flash Replay Wiki</span></a>
  </header>
  <main class="root">
    <section class="root-hero">
      <p class="eyebrow">Technical documentation</p>
      <h1>Flash Replay Wiki</h1>
      <p class="lead">Manuale tecnico in tre lingue per usare la mod, esportare contenuti e sviluppare addon concessi.</p>
      <div class="root-langs">
        <a class="root-lang" href="it/index.html"><strong>Italiano</strong><span>Manuale completo, workflow e addon concessi.</span></a>
        <a class="root-lang" href="en/index.html"><strong>English</strong><span>Full technical manual, workflows and permitted addons.</span></a>
        <a class="root-lang" href="es/index.html"><strong>Español</strong><span>Manual tecnico completo, flujos y addons permitidos.</span></a>
      </div>
    </section>
  </main>
</body>
</html>`;
}

function writeFile(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

writeFile(path.join(outDir, "index.html"), renderRoot());

for (const lang of Object.keys(langs)) {
  for (const slug of pageOrder) {
    writeFile(path.join(outDir, lang, slugFile(slug)), renderPage(lang, slug));
  }
}

console.log(`Generated ${Object.keys(langs).length * pageOrder.length + 1} wiki pages.`);
