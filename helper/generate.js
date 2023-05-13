function dateNow(){
    const now = new Date()
    const tahun = now.getFullYear().toString();
    const bulan = (now.getMonth() + 1).toString().padStart(2, "0");
    const tanggal = now.getDate().toString().padStart(2, "0");
    const jam = now.getHours().toString().padStart(2, "0");
    const detik = now.getSeconds().toString().padStart(2, "0");
    const gen_id = tahun + bulan + tanggal + jam + detik
    return gen_id
}

module.exports = {
    dateNow
}