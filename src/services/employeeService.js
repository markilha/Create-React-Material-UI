const KEYS = {
    lotes: 'lotes',
    loteId: 'loteId'
}

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
])

export function insertLote(data) {
    let lotes = getAlllotes();
    data['id'] = generateloteId()
    lotes.push(data)
    localStorage.setItem(KEYS.lotes, JSON.stringify(lotes))
}

export function updateLote(data) {
    let lotes = getAlllotes();
    let recordIndex = lotes.findIndex(x => x.id == data.id);
    lotes[recordIndex] = { ...data }
    localStorage.setItem(KEYS.lotes, JSON.stringify(lotes));
}

export function deleteLote(id) {
    let lotes = getAlllotes();
    lotes = lotes.filter(x => x.id != id)
    localStorage.setItem(KEYS.lotes, JSON.stringify(lotes));
}

export function generateloteId() {
    if (localStorage.getItem(KEYS.loteId) == null)
        localStorage.setItem(KEYS.loteId, '0')
    var id = parseInt(localStorage.getItem(KEYS.loteId))
    localStorage.setItem(KEYS.loteId, (++id).toString())
    return id;
}

export function getAlllotes() {
    if (localStorage.getItem(KEYS.lotes) == null)
        localStorage.setItem(KEYS.lotes, JSON.stringify([]))


    //let lotes = JSON.parse(localStorage.getItem(KEYS.lotes));   
    // let departments = getDepartmentCollection();
    // return lotes.map(x => ({
    //     ...x,
    //     department: departments[x.departmentId - 1].title
    // }))
}