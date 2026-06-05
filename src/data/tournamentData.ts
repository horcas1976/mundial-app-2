export interface TeamStanding {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number; // Goals For
  ga: number; // Goals Against
  gd: number; // Goal Difference
  points: number;
}

export interface Group {
  id: string; // "A" | "B" | ... | "L"
  name: string; // "Grupo A"
  teams: string[];
}

export interface Match {
  id: string;
  group: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  score1: number | null;
  score2: number | null;
  channel: string;
}

export const GROUPS_DATA: Group[] = [
  { id: "A", name: "Grupo A", teams: ["México", "Sudáfrica", "Corea del Sur", "Chequia"] },
  { id: "B", name: "Grupo B", teams: ["Canadá", "Bosnia y Herz.", "Catar", "Suiza"] },
  { id: "C", name: "Grupo C", teams: ["Brasil", "Marruecos", "Haití", "Escocia"] },
  { id: "D", name: "Grupo D", teams: ["Estados Unidos", "Paraguay", "Australia", "Turquía"] },
  { id: "E", name: "Grupo E", teams: ["Alemania", "Curazao", "Costa de Marfil", "Ecuador"] },
  { id: "F", name: "Grupo F", teams: ["Países Bajos", "Japón", "Suecia", "Túnez"] },
  { id: "G", name: "Grupo G", teams: ["España", "Cabo Verde", "Arabia Saudí", "Uruguay"] },
  { id: "H", name: "Grupo H", teams: ["Bélgica", "Egipto", "Ri de Irán", "Nueva Zelanda"] },
  { id: "I", name: "Grupo I", teams: ["Francia", "Senegal", "Irak", "Noruega"] },
  { id: "J", name: "Grupo J", teams: ["Argentina", "Argelia", "Austria", "Jordania"] },
  { id: "K", name: "Grupo K", teams: ["Portugal", "RD Congo", "Uzbeque", "Colombia"] }, // Let's simplify Uzbequistán
  { id: "L", name: "Grupo L", teams: ["Inglaterra", "Croacia", "Ghana", "Panamá"] }
];

// Map of normalized team name overrides if necessary
const cleanName = (team: string) => {
  const t = team.trim().toUpperCase();
  if (t === "UZBEKISTÁN" || t === "UZBEKISTÁN VS PORTUGAL" || t === "UZBEQUE") return "Uzbekistán";
  if (t === "BOSNIA V HERZ." || t === "BOSNIA VS BOSNIA V HERZ." || t === "BOSNIA Y HERZ.") return "Bosnia y Herz.";
  return team.trim();
};

export const INITIAL_MATCHES: Match[] = [
  // COLUMN 1
  { id: "m1", group: "A", date: "Jueves 11 de Junio", time: "16:00", team1: "México", team2: "Sudáfrica", score1: null, score2: null, channel: "DSPORTS / Disney+" },
  { id: "m2", group: "A", date: "Jueves 11 de Junio", time: "23:00", team1: "Corea del Sur", team2: "Chequia", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  
  { id: "m3", group: "B", date: "Viernes 12 de Junio", time: "16:00", team1: "Canadá", team2: "Bosnia y Herz.", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m4", group: "D", date: "Viernes 12 de Junio", time: "22:00", team1: "Estados Unidos", team2: "Paraguay", score1: null, score2: null, channel: "DSPORTS / TyC Sports / Disney+" },
  
  { id: "m5", group: "B", date: "Sábado 13 de Junio", time: "16:00", team1: "Catar", team2: "Suiza", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m6", group: "C", date: "Sábado 13 de Junio", time: "19:00", team1: "Brasil", team2: "Marruecos", score1: null, score2: null, channel: "DSPORTS / Disney+" },
  { id: "m7", group: "C", date: "Sábado 13 de Junio", time: "22:00", team1: "Haití", team2: "Escocia", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  
  { id: "m8", group: "D", date: "Domingo 14 de Junio", time: "01:00", team1: "Australia", team2: "Turquía", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m9", group: "E", date: "Domingo 14 de Junio", time: "14:00", team1: "Alemania", team2: "Curazao", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m10", group: "F", date: "Domingo 14 de Junio", time: "17:00", team1: "Países Bajos", team2: "Japón", score1: null, score2: null, channel: "DSPORTS / TyC Sports / Disney+" },
  { id: "m11", group: "E", date: "Domingo 14 de Junio", time: "20:00", team1: "Costa de Marfil", team2: "Ecuador", score1: null, score2: null, channel: "DSPORTS / Disney+" },
  { id: "m12", group: "F", date: "Domingo 14 de Junio", time: "23:00", team1: "Suecia", team2: "Túnez", score1: null, score2: null, channel: "DSPORTS" },
  
  { id: "m13", group: "G", date: "Lunes 15 de Junio", time: "13:00", team1: "España", team2: "Cabo Verde", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m14", group: "H", date: "Lunes 15 de Junio", time: "16:00", team1: "Bélgica", team2: "Egipto", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  { id: "m15", group: "G", date: "Lunes 15 de Junio", time: "19:00", team1: "Arabia Saudí", team2: "Uruguay", score1: null, score2: null, channel: "DSPORTS / TyC Sports / Disney+" },
  { id: "m16", group: "H", date: "Lunes 15 de Junio", time: "22:00", team1: "Ri de Irán", team2: "Nueva Zelanda", score1: null, score2: null, channel: "DSPORTS" },
  
  { id: "m17", group: "I", date: "Martes 16 de Junio", time: "16:00", team1: "Francia", team2: "Senegal", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m18", group: "I", date: "Martes 16 de Junio", time: "19:00", team1: "Irak", team2: "Noruega", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  { id: "m19", group: "J", date: "Martes 16 de Junio", time: "22:00", team1: "Argentina", team2: "Argelia", score1: null, score2: null, channel: "DSPORTS / Canal 7 / TyC Sports" },
  
  { id: "m20", group: "J", date: "Miércoles 17 de Junio", time: "01:00", team1: "Austria", team2: "Jordania", score1: null, score2: null, channel: "DSPORTS / Disney+" },
  { id: "m21", group: "K", date: "Miércoles 17 de Junio", time: "14:00", team1: "Portugal", team2: "RD Congo", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m22", group: "L", date: "Miércoles 17 de Junio", time: "17:00", team1: "Inglaterra", team2: "Croacia", score1: null, score2: null, channel: "DSPORTS / TyC Sports / Disney+" },
  { id: "m23", group: "L", date: "Miércoles 17 de Junio", time: "20:00", team1: "Ghana", team2: "Panamá", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m24", group: "K", date: "Miércoles 17 de Junio", time: "23:00", team1: "Uzbekistán", team2: "Colombia", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  
  { id: "m25", group: "A", date: "Jueves 18 de Junio", time: "13:00", team1: "Chequia", team2: "Sudáfrica", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  { id: "m26", group: "B", date: "Jueves 18 de Junio", time: "16:00", team1: "Suiza", team2: "Bosnia y Herz.", score1: null, score2: null, channel: "DSPORTS / Disney+" },
  { id: "m27", group: "B", date: "Jueves 18 de Junio", time: "19:00", team1: "Canadá", team2: "Catar", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m28", group: "A", date: "Jueves 18 de Junio", time: "22:00", team1: "México", team2: "Corea del Sur", score1: null, score2: null, channel: "DSPORTS / TyC Sports / Disney+" },
  
  { id: "m29", group: "D", date: "Viernes 19 de Junio", time: "16:00", team1: "Estados Unidos", team2: "Australia", score1: null, score2: null, channel: "DSPORTS / TyC Sports / Disney+" },
  { id: "m30", group: "C", date: "Viernes 19 de Junio", time: "19:00", team1: "Escocia", team2: "Marruecos", score1: null, score2: null, channel: "DSPORTS / Disney+" },
  { id: "m31", group: "C", date: "Viernes 19 de Junio", time: "21:30", team1: "Brasil", team2: "Haití", score1: null, score2: null, channel: "DSPORTS / Canal 7 / TyC Sports" },
  
  { id: "m32", group: "D", date: "Sábado 20 de Junio", time: "00:00", team1: "Turquía", team2: "Paraguay", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m33", group: "F", date: "Sábado 20 de Junio", time: "14:00", team1: "Países Bajos", team2: "Suecia", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  { id: "m34", group: "E", date: "Sábado 20 de Junio", time: "17:00", team1: "Alemania", team2: "Costa de Marfil", score1: null, score2: null, channel: "DSPORTS / TyC Sports / Disney+" },
  { id: "m35", group: "E", date: "Sábado 20 de Junio", time: "21:00", team1: "Ecuador", team2: "Curazao", score1: null, score2: null, channel: "DSPORTS" },
  
  { id: "m36", group: "F", date: "Domingo 21 de Junio", time: "01:00", team1: "Túnez", team2: "Japón", score1: null, score2: null, channel: "DSPORTS" },
  
  // COLUMN 2
  { id: "m37", group: "G", date: "Domingo 21 de Junio", time: "13:00", team1: "España", team2: "Arabia Saudí", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  { id: "m38", group: "H", date: "Domingo 21 de Junio", time: "16:00", team1: "Bélgica", team2: "Ri de Irán", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m39", group: "G", date: "Domingo 21 de Junio", time: "19:00", team1: "Uruguay", team2: "Cabo Verde", score1: null, score2: null, channel: "DSPORTS / Disney+" },
  { id: "m40", group: "H", date: "Domingo 21 de Junio", time: "22:00", team1: "Nueva Zelanda", team2: "Egipto", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  
  { id: "m41", group: "J", date: "Lunes 22 de Junio", time: "14:00", team1: "Argentina", team2: "Austria", score1: null, score2: null, channel: "DSPORTS / Canal 7 / TyC Sports" },
  { id: "m42", group: "I", date: "Lunes 22 de Junio", time: "18:00", team1: "Francia", team2: "Irak", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m43", group: "I", date: "Lunes 22 de Junio", time: "21:00", team1: "Noruega", team2: "Senegal", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  
  { id: "m44", group: "J", date: "Martes 23 de Junio", time: "00:00", team1: "Jordania", team2: "Argelia", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m45", group: "K", date: "Martes 23 de Junio", time: "14:00", team1: "Portugal", team2: "Uzbekistán", score1: null, score2: null, channel: "DSPORTS / Disney+" },
  { id: "m46", group: "L", date: "Martes 23 de Junio", time: "17:00", team1: "Inglaterra", team2: "Ghana", score1: null, score2: null, channel: "DSPORTS / TyC Sports / Disney+" },
  { id: "m47", group: "L", date: "Martes 23 de Junio", time: "20:00", team1: "Panamá", team2: "Croacia", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  { id: "m48", group: "K", date: "Martes 23 de Junio", time: "23:00", team1: "Colombia", team2: "RD Congo", score1: null, score2: null, channel: "DSPORTS" },
  
  { id: "m49", group: "B", date: "Miércoles 24 de Junio", time: "16:00", team1: "Suiza", team2: "Canadá", score1: null, score2: null, channel: "DSPORTS / TyC Sports / Disney+" },
  { id: "m50", group: "B", date: "Miércoles 24 de Junio", time: "16:00", team1: "Bosnia y Herz.", team2: "Catar", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m51", group: "C", date: "Miércoles 24 de Junio", time: "19:00", team1: "Escocia", team2: "Brasil", score1: null, score2: null, channel: "DSPORTS / Disney+" },
  { id: "m52", group: "C", date: "Miércoles 24 de Junio", time: "19:00", team1: "Marruecos", team2: "Haití", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  { id: "m53", group: "A", date: "Miércoles 24 de Junio", time: "22:00", team1: "Chequia", team2: "México", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m54", group: "A", date: "Miércoles 24 de Junio", time: "22:00", team1: "Sudáfrica", team2: "Corea del Sur", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  
  { id: "m55", group: "E", date: "Jueves 25 de Junio", time: "17:00", team1: "Ecuador", team2: "Alemania", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  { id: "m56", group: "E", date: "Jueves 25 de Junio", time: "17:00", team1: "Curazao", team2: "Costa de Marfil", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m57", group: "F", date: "Jueves 25 de Junio", time: "20:00", team1: "Túnez", team2: "Países Bajos", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m58", group: "F", date: "Jueves 25 de Junio", time: "20:00", team1: "Japón", team2: "Suecia", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  { id: "m59", group: "D", date: "Jueves 25 de Junio", time: "23:00", team1: "Turquía", team2: "Estados Unidos", score1: null, score2: null, channel: "DSPORTS / TyC Sports / Disney+" },
  { id: "m60", group: "D", date: "Jueves 25 de Junio", time: "23:00", team1: "Paraguay", team2: "Australia", score1: null, score2: null, channel: "DSPORTS / Disney+" },
  
  { id: "m61", group: "I", date: "Viernes 26 de Junio", time: "16:00", team1: "Noruega", team2: "Francia", score1: null, score2: null, channel: "DSPORTS / TyC Sports / Disney+" },
  { id: "m62", group: "I", date: "Viernes 26 de Junio", time: "16:00", team1: "Senegal", team2: "Irak", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m63", group: "G", date: "Viernes 26 de Junio", time: "21:00", team1: "Uruguay", team2: "España", score1: null, score2: null, channel: "DSPORTS / Canal 7 / TyC Sports" },
  { id: "m64", group: "G", date: "Viernes 26 de Junio", time: "21:00", team1: "Cabo Verde", team2: "Arabia Saudí", score1: null, score2: null, channel: "DSPORTS" },
  
  { id: "m65", group: "H", date: "Sábado 27 de Junio", time: "00:00", team1: "Nueva Zelanda", team2: "Bélgica", score1: null, score2: null, channel: "DSPORTS / Disney+" },
  { id: "m66", group: "H", date: "Sábado 27 de Junio", time: "00:00", team1: "Egipto", team2: "Ri de Irán", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  { id: "m67", group: "L", date: "Sábado 27 de Junio", time: "18:00", team1: "Panamá", team2: "Inglaterra", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  { id: "m68", group: "L", date: "Sábado 27 de Junio", time: "18:00", team1: "Croacia", team2: "Ghana", score1: null, score2: null, channel: "DSPORTS" },
  { id: "m69", group: "K", date: "Sábado 27 de Junio", time: "20:30", team1: "Colombia", team2: "Portugal", score1: null, score2: null, channel: "DSPORTS / Disney+" },
  { id: "m70", group: "K", date: "Sábado 27 de Junio", time: "20:30", team1: "RD Congo", team2: "Uzbekistán", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  { id: "m71", group: "J", date: "Sábado 27 de Junio", time: "23:00", team1: "Jordania", team2: "Argentina", score1: null, score2: null, channel: "DSPORTS / TyC Sports" },
  { id: "m72", group: "J", date: "Sábado 27 de Junio", time: "23:00", team1: "Argelia", team2: "Austria", score1: null, score2: null, channel: "DSPORTS" }
];

export function calculateStandings(groupId: string, matches: Match[]): TeamStanding[] {
  const group = GROUPS_DATA.find(g => g.id === groupId);
  if (!group) {
    const teams = Array.from(new Set(matches.filter(m => m.group === groupId).flatMap(m => [m.team1, m.team2])));
    return buildStandings(teams, matches, groupId);
  }
  return buildStandings(group.teams, matches, groupId);
}

function buildStandings(teams: string[], matches: Match[], groupId: string): TeamStanding[] {
  const standingsMap: Record<string, TeamStanding> = {};
  
  // Initialize teams
  teams.forEach(t => {
    standingsMap[t] = {
      team: t,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      points: 0
    };
  });
  
  // Filter matches of this group that have scores
  const grpMatches = matches.filter(m => m.group === groupId && m.score1 !== null && m.score2 !== null);
  
  grpMatches.forEach(m => {
    const t1 = m.team1;
    const t2 = m.team2;
    const s1 = m.score1 as number;
    const s2 = m.score2 as number;
    
    if (!standingsMap[t1]) {
      standingsMap[t1] = { team: t1, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 };
    }
    if (!standingsMap[t2]) {
      standingsMap[t2] = { team: t2, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 };
    }
    
    standingsMap[t1].played += 1;
    standingsMap[t2].played += 1;
    standingsMap[t1].gf += s1;
    standingsMap[t1].ga += s2;
    standingsMap[t2].gf += s2;
    standingsMap[t2].ga += s1;
    
    if (s1 > s2) {
      standingsMap[t1].won += 1;
      standingsMap[t1].points += 3;
      standingsMap[t2].lost += 1;
    } else if (s1 < s2) {
      standingsMap[t2].won += 1;
      standingsMap[t2].points += 3;
      standingsMap[t1].lost += 1;
    } else {
      standingsMap[t1].drawn += 1;
      standingsMap[t1].points += 1;
      standingsMap[t2].drawn += 1;
      standingsMap[t2].points += 1;
    }
  });
  
  // Calculate GD and sort
  const standings = Object.values(standingsMap).map(s => {
    s.gd = s.gf - s.ga;
    return s;
  });
  
  // Sort criteria: Points desc, GD desc, GF desc, Team Name asc
  return standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.team.localeCompare(b.team);
  });
}
