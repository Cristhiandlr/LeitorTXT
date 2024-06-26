let fileContent = "";

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        fileContent = e.target.result;
        alert("Arquivo carregado com sucesso!");
    };

    reader.readAsText(file);
});

function exportToExcel() {
    if (!fileContent) {
        alert("Por favor, carregue um arquivo primeiro!");
        return;
    }

    const lines = fileContent.split('\n');
    const data = [];
    let currentRow = [];

    lines.forEach(line => {
        const fields = line.split('|').map(field => field.trim());

        if (fields.length > 0) {
            if (fields[0].match(/^\d{44}$/)) {
                if (currentRow.length > 0) {
                    data.push(currentRow);
                }
                currentRow = fields;
            } else {
                currentRow = currentRow.concat(fields);
            }
        }
    });

    if (currentRow.length > 0) {
        data.push(currentRow);
    }

    const headers = [
        "chave nfe", "Complemento", "Placa", "Nº Transporte", "Org. Transporte", "Tipo Transporte", "Tipo Custo", 
        "Base ICMS", "Base ST", "Aliquota ICMS", "Valor ICMS", "Valor ST", "Valor ISS", "Valor frete", "Cód. Transportador", 
        "Mot. Complemento", "Desc. Complemento", "Transp. Original", "Transp. Principal", "Local Negócios", "DEMI", "NNF", 
        "serie", "VNF", "PesoB", "pesoL", "Vprod", "qvol", "CNPJ", "Cmun", "Cmun", "UF", "CNPJ", "IE", "Xnome", "xLGR", "nro", 
        "Xcpl", "Xbairro", "Cep", "ModFrete", "TPNF", "Distância", "Qtd.Entregas", "Nº Pré-Conhecimento", "Placa Transbordo", 
        "Valor frete 1ª Etapa", "Valor frete 2ª Etapa", "Base ICMS Complementar", "Alíquota ICMS Complementar", "Valor ICMS Complementar", 
        "Número do Ticket", "Valor Ticket", "CNPJ Empresa Recebedora Pedágio"
    ];

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Edi Cte Pif Paf");

    XLSX.writeFile(workbook, 'Edi_Cte_PifPaf.xlsx');
}
