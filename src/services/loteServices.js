import api from "./api";

const KEYS = {
  lotes: "lotes",
  loteId: "loteId",
};

export const getStatus = () => [
  { id: "1", title: "Análise" },
  { id: "2", title: "Pendente" },
  { id: "3", title: "Titulado" },
];

export function insertLote(data) {
  let lotes = getAlllotes();
  data["imoid"] = generateloteId();
  lotes.push(data);
  localStorage.setItem(KEYS.lotes, JSON.stringify(lotes));
}

export function updateLote(data) {
  let lotes = getAlllotes();
  let recordIndex = lotes.findIndex((x) => x.imoid == data.imoid);
  lotes[recordIndex] = { ...data };
  localStorage.setItem(KEYS.lotes, JSON.stringify(lotes));
}

export function deleteLote(id,records) {
  let lotes = records;
  lotes = lotes.filter((x) => x.imoid != id);
  localStorage.setItem(KEYS.lotes, JSON.stringify(lotes));
}

export function generateloteId() {
  if (localStorage.getItem(KEYS.loteId) == null)
    localStorage.setItem(KEYS.loteId, "0");
  var id = parseInt(localStorage.getItem(KEYS.loteId));
  localStorage.setItem(KEYS.loteId, (++id).toString());
  return id;
}



export async function getAlllotes() {
  // if (localStorage.getItem(KEYS.lotes) == null)
  //  localStorage.setItem(KEYS.lotes, JSON.stringify([]))
  try {
    const pesq = {
      pesquisa: `SELECT * FROM tblimo ORDER BY imogeo ASC`,
    };
    const response = await api.post("/lotes", pesq);    

    //let lotes = JSON.parse(localStorage.getItem(KEYS.lotes));
    //let estatus = getStatus();
    let lotes = response.data.response.lotes;

    return lotes.map((x) => ({
      ...x,
    }));
  } catch {}
}
