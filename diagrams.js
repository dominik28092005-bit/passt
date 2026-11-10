// Eigene, nachgezeichnete Schemata (keine Folienbilder). Werden nach dem Antworten angezeigt.
const _R=(x,y,w,h,c="b",rx=6)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${c}"/>`;
const _T=(x,y,t,c="",a="middle")=>`<text x="${x}" y="${y}" class="${c}" text-anchor="${a}" dominant-baseline="middle">${t}</text>`;
const _A=(d,c="la")=>`<path d="${d}" class="${c}"/>`;
const _S=(w,h,body)=>`<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="mk"/></marker></defs>${body}</svg>`;
const _box=(x,y,w,h,t,c="b",sub)=>_R(x,y,w,h,c)+(sub?_T(x+w/2,y+h/2-8,t,"h")+_T(x+w/2,y+h/2+10,sub,"m"):_T(x+w/2,y+h/2,t,"h"));

const DIAGRAMS = {
modes: {cap:"Betriebsmodi: Anwendungen im User Mode, das OS im Kernel Mode, darunter die Hardware.", svg:_S(480,230,
  _R(10,10,460,84,"a")+_T(22,28,"User Mode – nur Teilmenge der Instruktionen","s h","start")+
  _box(30,46,130,36,"Web-Browser")+_box(175,46,130,36,"E-Mail")+_box(320,46,130,36,"Music Player")+
  _R(10,104,460,58,"g")+_T(240,124,"Kernel Mode – Betriebssystem","h")+_T(240,145,"alle Instruktionen, voller Hardwarezugriff","m")+
  _R(10,172,460,48,"n")+_T(240,196,"Hardware","h"))},

memhier: {cap:"Speicherhierarchie: nach unten billiger pro Bit, größer, aber langsamer.", svg:_S(480,292,
  [["Register","< 1 ns"],["Cache","1–8 ns"],["Hauptspeicher","10–50 ns"],["SSD","10–100 µs"],["Magnetplatte","≈ 10 ms"],["Band / offline","sehr langsam"]]
  .map(([n,t],i)=>{const w=120+i*56,x=240-w/2,y=10+i*42;return _R(x,y,w,36,i<3?"a":"b")+_T(240,y+18,`${n} · ${t}`,"s h");}).join("")+
  _A("M18,14 L18,262")+_T(240,280,"nach unten: Kosten/Bit ↓ · Kapazität ↑ · Zugriffszeit ↑","m"))},

icycle: {cap:"Instruktionszyklus: holen, ausführen, dann (falls aktiviert) auf Interrupts prüfen.", svg:_S(480,170,
  _box(20,50,120,50,"Fetch","a","PC → IR")+_box(180,50,120,50,"Execute","b","Instruktion")+_box(340,50,120,50,"Interrupt?","g","→ Handler")+
  _A("M140,75 L178,75")+_A("M300,75 L338,75")+_T(320,38,"wenn an","m")+
  _A("M400,100 L400,140 L80,140 L80,102")+_T(240,152,"nächster Zyklus","m")+_T(80,30,"1","m")+_T(240,30,"2","m")+_T(400,30,"3","m"))},

procseg: {cap:"Adressraum eines Prozesses: Text unten, Stack oben, dazwischen eine Lücke zum Wachsen.", svg:_S(480,230,
  _R(150,10,180,48,"a",0)+_T(240,34,"Stack","h")+_R(150,58,180,66,"d",0)+_T(240,91,"Lücke (Gap)","m")+
  _R(150,124,180,46,"b",0)+_T(240,147,"Data","h")+_R(150,170,180,48,"g",0)+_T(240,194,"Text (Code)","h")+
  _T(140,16,"FFFF","m","end")+_T(140,212,"0000","m","end")+_A("M345,30 L345,70")+_T(355,48,"wächst nach unten","m","start"))},

state3: {cap:"3-Zustands-Modell: 1 wartet auf Input · 2 Scheduler wählt anderen · 3 Scheduler wählt diesen · 4 Input da. Von Blocked geht es nie direkt zu Running.", svg:_S(480,220,
  _box(180,20,120,44,"Running","a")+_box(40,160,120,44,"Blocked","r")+_box(320,160,120,44,"Ready","g")+
  _A("M200,64 L120,158")+_T(148,106,"1","h")+_A("M285,64 L355,158")+_T(300,120,"2","h")+
  _A("M405,158 L300,66")+_T(372,100,"3","h")+_A("M160,182 L318,182")+_T(240,170,"4","h"))},

state5: {cap:"5-Zustands-Modell mit den Namen der Übergänge.", svg:_S(480,200,
  _box(10,22,75,40,"New")+_box(115,22,105,40,"Ready","g")+_box(255,22,105,40,"Running","a")+_box(395,22,75,40,"Exit")+_box(185,140,110,40,"Blocked","r")+
  _A("M85,42 L113,42")+_T(100,82,"Admit","s m")+_A("M220,32 L253,32")+_T(237,12,"Dispatch","s")+
  _A("M255,52 L222,52")+_T(237,76,"Timeout","s")+_A("M360,42 L393,42")+_T(377,12,"Release","s m")+
  _A("M310,62 L268,138")+_T(300,108,"Event Wait","s","start")+_A("M212,138 L170,64")+_T(180,108,"Event Occurs","s","end"))},

threads: {cap:"Was Threads teilen und was jeder Thread für sich hat.", svg:_S(480,210,
  _R(10,10,225,190,"a")+_T(122,30,"Pro Prozess (geteilt)","h")+
  ["Adressraum","Globale Variablen","Offene Dateien","Kindprozesse","Signale & Alarme","Accounting"].map((s,i)=>_T(26,58+i*24,"• "+s,"s","start")).join("")+
  _R(245,10,225,190,"g")+_T(357,30,"Pro Thread (eigen)","h")+
  ["Program Counter","Register","Stack","Zustand"].map((s,i)=>_T(261,58+i*24,"• "+s,"s","start")).join(""))},

gantt: {cap:"Ankunft/Dauer: A 0/3 · B 2/6 · C 4/4 · D 6/5 · E 8/2. Turnaround = Ende − Ankunft.", svg:_S(480,190,
  (()=>{const X=t=>50+t*20.5;const row=(y,name,segs)=>_T(10,y+18,name,"h","start")+segs.map(([p,a,b,hl])=>_R(X(a),y,X(b)-X(a),36,hl?"a":"b",3)+_T((X(a)+X(b))/2,y+18,p,"h")+_T(X(b),y+48,b,"m")).join("")+_T(X(0),y+48,0,"m");
  return row(16,"FCFS",[["A",0,3],["B",3,9],["C",9,13,1],["D",13,18],["E",18,20]])+row(106,"SPN",[["A",0,3],["B",3,9],["E",9,11,1],["C",11,15],["D",15,20]]);})())},

schedlevels: {cap:"Long-term: Zulassung · Medium-term: Swapping · Short-term (Dispatcher): wer bekommt die CPU.", svg:_S(480,200,
  _box(10,30,110,40,"New")+_box(170,30,110,40,"Ready","g")+_box(330,30,110,40,"Running","a")+_box(160,140,130,40,"Ready/Suspend","d")+
  _A("M120,50 L168,50")+_T(145,88,"Long-term","s h")+_A("M280,50 L328,50")+_T(305,88,"Short-term","s h")+
  _A("M215,72 L215,138")+_A("M235,138 L235,72")+_T(250,110,"Medium-term (Swapping)","s h","start"))},

deadlock: {cap:"Zyklisches Warten: Jeder Prozess hält ein Betriebsmittel und wartet auf das des anderen.", svg:_S(480,220,
  `<circle cx="120" cy="50" r="28" class="a"/>`+_T(120,50,"P1","h")+`<circle cx="360" cy="170" r="28" class="a"/>`+_T(360,170,"P2","h")+
  _R(335,25,50,50,"b",2)+_T(360,50,"R1","h")+_R(95,145,50,50,"b",2)+_T(120,170,"R2","h")+
  _A("M150,50 L333,50")+_T(240,40,"wartet auf","s")+_A("M360,77 L360,140")+_T(370,108,"gehalten von","s","start")+
  _A("M330,170 L147,170")+_T(240,184,"wartet auf","s")+_A("M120,143 L120,80")+_T(110,112,"gehalten von","s","end"))},

paging: {cap:"Adressübersetzung mit 4-KB-Seiten: Seitennummer über die Page Table zum Frame, der Offset bleibt gleich.", svg:_S(480,214,
  _box(10,14,150,40,"virt. Adresse 8200","a")+_box(10,76,150,38,"Seite 2")+_box(10,150,150,38,"Offset 8")+
  _T(250,10,"Page Table","m")+[["0","2"],["1","1"],["2","6"],["3","0"]].map(([p,f],i)=>_R(200,20+i*30,100,30,p==="2"?"g":"b",0)+_T(250,35+i*30,`${p} → ${f}`,p==="2"?"h":"")).join("")+
  _A("M160,95 L198,95")+_box(340,76,130,38,"Frame 6","g")+_A("M300,95 L338,95")+
  _A("M405,114 L405,148")+_A("M160,169 L288,169")+_T(224,158,"Offset bleibt","m")+_box(290,150,180,42,"6·4096 + 8 = 24584","g"))},

buddy: {cap:"Buddy-System: Blöcke werden halbiert, bis die kleinste passende Zweierpotenz erreicht ist.", svg:_S(480,190,
  (()=>{const X=k=>10+k*460/1024;const b=(a,s,y,t,c="b")=>_R(X(a),y,X(a+s)-X(a),32,c,2)+_T((X(a)+X(a+s))/2,y+16,t,c==="b"?"s":"s h");
  return b(0,1024,10,"1 MB")+b(0,512,52,"512K")+b(512,512,52,"512K")+b(0,256,94,"256K")+b(256,256,94,"B: 240K → 256K","g")+
  b(0,128,136,"A","g")+b(128,128,136,"128K")+_T(X(512)+6,152,"A: 100K → 128K","s","start");})())},

inodelookup: {cap:"Pfadauflösung /usr/ast/mbox: abwechselnd Verzeichnisblock und i-node.", svg:_S(480,200,
  _box(10,20,140,56,"Root-Verzeichnis","b","usr → i-node 6")+_box(170,20,140,56,"i-node 6","a","→ Block 132")+_box(330,20,140,56,"Block 132","b","ast → i-node 26")+
  _box(330,124,140,56,"i-node 26","a","→ Block 406")+_box(170,124,140,56,"Block 406","b","mbox → i-node 60")+_box(10,124,140,56,"i-node 60","g","Datei mbox")+
  _A("M150,48 L168,48")+_A("M310,48 L328,48")+_A("M400,76 L400,122")+_A("M330,152 L312,152")+_A("M170,152 L152,152"))},

inode: {cap:"UNIX-i-node: Attribute und Blockadressen (direkt, einfach/zweifach/dreifach indirekt) – aber kein Dateiname.", svg:_S(480,220,
  _R(10,10,150,200,"b")+_R(10,10,150,40,"a",0)+_T(85,30,"Attribute","s h")+_T(85,85,"Direkte Adressen","s")+_T(85,135,"Single indirect","s")+_T(85,165,"Double indirect","s")+_T(85,195,"Triple indirect","s")+
  `<path d="M10,120 H160 M10,150 H160 M10,180 H160" class="l"/>`+
  _A("M160,85 L198,85")+_R(200,73,40,24,"g",2)+
  [[135,1],[165,2],[195,3]].map(([y,n])=>{let s="",x=160;for(let i=0;i<n;i++){s+=_A(`M${x},${y} L${x+38},${y}`)+_R(x+40,y-12,40,24,"a",2);x+=60;}return s+_A(`M${x+20},${y} L${x+38},${y}`)+_R(x+40,y-12,40,24,"g",2);}).join("")+
  _R(200,12,16,14,"a",2)+_T(222,19,"Zeigerblock","m","start")+_R(320,12,16,14,"g",2)+_T(342,19,"Datenblock","m","start"))},

chmod: {cap:"chmod: jede Ziffer = 3 Bits (r=4, w=2, x=1). Beispiel 755.", svg:_S(480,170,
  [["Owner","rwx",7],["Group","r-x",5],["Others","r-x",5]].map(([g,p,d],gi)=>{const x0=20+gi*155;
   return _T(x0+57,18,g,"h")+[...p].map((c,i)=>_R(x0+i*38,32,38,36,c==="-"?"d":"g",0)+_T(x0+i*38+19,50,c,"h")+_T(x0+i*38+19,86,[4,2,1][i],"m")).join("")+
   _T(x0+57,118,[...p].map((c,i)=>c==="-"?0:[4,2,1][i]).join(" + "),"s")+_T(x0+57,146,"= "+d,"h");}).join(""))},

raid: {cap:"RAID-Layouts (je zwei Zeilen pro Platte). P/Q = Paritätsblöcke.", svg:_S(480,262,
  [["RAID 0",[["0","4"],["1","5"],["2","6"],["3","7"]]],
   ["RAID 1",[["0","2"],["1","3"],["0'","2'"],["1'","3'"]]],
   ["RAID 4",[["0","4"],["1","5"],["2","6"],["3","7"],["P","P"]]],
   ["RAID 5",[["0","4"],["1","5"],["2","6"],["3","P"],["P","7"]]],
   ["RAID 6",[["0","4"],["1","5"],["2","6"],["3","P"],["P","Q"],["Q","7"]]]]
  .map(([n,disks],r)=>{const y=8+r*51;return _T(10,y+20,n,"h","start")+disks.map((cells,d)=>cells.map((c,k)=>{const cls=/[PQ]/.test(c)?"r":(c.includes("'")?"a":"b");return _R(90+d*62,y+k*20,56,20,cls,2)+_T(118+d*62,y+10+k*20,c,"s");}).join("")).join("");}).join(""))},

iolayers: {cap:"Schichten der I/O-Software mit ihren Aufgaben.", svg:_S(480,236,
  [["User-Prozesse","I/O-Aufruf, Formatierung, Spooling","a"],["Geräteunabh. Software","Naming, Schutz, Blocking, Puffer","b"],["Gerätetreiber","Register setzen, Status prüfen","b"],["Interrupt Handler","Treiber nach I/O-Ende wecken","b"],["Hardware","I/O-Operation ausführen","n"]]
  .map(([n,f,c],i)=>_R(10,8+i*46,190,38,c)+_T(105,27+i*46,n,"s h")+_T(212,27+i*46,f,"s","start")).join(""))},

hyper: {cap:"Type 1 läuft direkt auf der Hardware, Type 2 auf einem Host-OS; Container teilen sich den Kernel des Host-OS.", svg:_S(480,238,
  (()=>{const col=(x,title,layers)=>_T(x+72,14,title,"h")+layers.map((L,i)=>{const y=196-i*36;return Array.isArray(L[0])?_R(x,y,70,32,L[1]==="g"?"g":"b")+_T(x+35,y+16,L[0][0],"s")+_R(x+75,y,70,32,L[1]==="g"?"g":"b")+_T(x+110,y+16,L[0][1],"s"):_R(x,y,145,32,L[1])+_T(x+72,y+16,L[0],"s h");}).join("");
  return col(10,"Type 1",[["Hardware","n"],["Hypervisor","a"],[["Gast-OS","Gast-OS"],"b"],[["App","App"],"b"]])+
   col(167,"Type 2",[["Hardware","n"],["Host-OS","b"],["Hypervisor","a"],[["Gast-OS","Gast-OS"],"b"],[["App","App"],"b"]])+
   col(324,"Container",[["Hardware","n"],["Host-OS (Kernel)","g"],["Container-Engine","a"],[["Libs","Libs"],"b"],[["App","App"],"b"]]);})())},

hol: {cap:"Head-of-Line Blocking: Bei TCP hält ein verlorenes Paket alle Streams auf, bei QUIC nur seinen eigenen.", svg:_S(480,220,
  _T(10,14,"HTTP/2 über TCP – ein Bytestrom","h","start")+
  [["A1","b"],["B1","b"],["C1","b"],["A2 ✗","r"],["B2","d"],["C2","d"],["A3","d"],["B3","d"]].map(([t,c],i)=>_R(10+i*58,28,52,28,c,3)+_T(36+i*58,42,t,"s")).join("")+
  _T(10,72,"alles nach dem Verlust wartet","m","start")+
  _T(10,104,"HTTP/3 über QUIC – getrennte Streams","h","start")+
  [["A",["A1","b"],["A2 ✗","r"],["A3","d"]],["B",["B1","b"],["B2","g"],["B3","g"]],["C",["C1","b"],["C2","g"],["C3","g"]]]
  .map(([s,...ps],r)=>_T(14,134+r*32,s,"h","start")+ps.map(([t,c],i)=>_R(40+i*58,120+r*32,52,28,c,3)+_T(66+i*58,134+r*32,t,"s")).join("")).join("")+
  _T(230,166,"B und C laufen weiter","m","start"))},

tcp: {cap:"TCP-3-Way-Handshake.", svg:_S(480,190,
  _T(90,14,"Client","h")+_T(390,14,"Server","h")+`<path d="M90,26 V180 M390,26 V180" class="l"/>`+
  _A("M90,40 L388,74","lacc")+_T(240,46,"SYN","h")+_A("M390,88 L92,122","lacc")+_T(240,94,"SYN-ACK","h")+_A("M90,136 L388,170","lacc")+_T(240,142,"ACK","h"))}
};

const DIAGRAM_MAP = [
  ["Kernel Mode vom User Mode","modes"],["Speicherhierarchie","memhier"],["Zugriffszeit hat Hauptspeicher","memhier"],
  ["Instruktionszyklus","icycle"],["niedrigsten Adressen","procseg"],
  ["3-Zustands-Modell","state3"],["5-Zustands-Modell","state5"],
  ["teilen sich alle Threads","threads"],["hat jeder Thread für sich","threads"],
  ["Turnaround Time von C bei FCFS","gantt"],["Wann ist E bei SPN fertig","gantt"],
  ["Welcher Scheduler entscheidet","schedlevels"],["heißt auch Dispatcher","schedlevels"],["Medium-Term Scheduler zuständig","schedlevels"],
  ["Bedingungen müssen für einen Deadlock","deadlock"],["Was ist ein Deadlock?","deadlock"],
  ["virtueller Adresse 8200","paging"],["virtuellen Seite 8K–12K","paging"],
  ["über 100 KB","buddy"],["über 240 KB","buddy"],
  ["/usr/ast/mbox","inodelookup"],["Indirektionsstufen","inode"],["i-node NICHT","inode"],
  ["chmod 755","chmod"],["rw-r--r--","chmod"],
  ["keine Redundanz, sondern nur Striping","raid"],["Hauptnachteil von RAID 1","raid"],["RAID 5 von RAID 4","raid"],["kennzeichnet RAID 6","raid"],
  ["Schichtung der I/O-Software","iolayers"],
  ["Was ist ein Type-1-Hypervisor","hyper"],["Containern und hypervisorbasierten VMs","hyper"],
  ["Head-of-Line Blocking","hol"],["löst QUIC das HoL","hol"],["3-Way-Handshake","tcp"]
];
