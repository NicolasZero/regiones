import * as XLSX from 'xlsx';


function exportTableStates<T extends { name: string; total: number; activities: { name: string; total: number }[] }>(stateData: T[], yearTables: number) {
    // Obtener los nombres de las actividades
    const activityNames = Array.from(new Set(stateData.flatMap(state => state.activities.map((activity: { name: string; }) => activity.name))));

    // Funcion para agregar espacios a los nombres de las actividades
    const addSpaces = (name: string, length: number) => {
        const spacesToAdd = length - name.length;
        return name + ' '.repeat(spacesToAdd > 0 ? spacesToAdd : 0);
    };

    // Determinar la longitud máxima de los nombres de las actividades
    const maxActivityNameLength = Math.max(...activityNames.map(name => name.length));

    const totalSum = stateData.reduce((sum, state) => sum + state.total, 0);

    const wsData = [
        ["Estados", ...activityNames.map(name => addSpaces(name, maxActivityNameLength)), "Total acumulado", "%"],
        ...stateData.map(state => [
            state.name,
            ...activityNames.map(activityName => {
                const activity = state.activities.find((activity: { name: string; total: number }) => activity.name === activityName);
                return activity ? activity.total : 0;
            }),
            state.total,
            `${((state.total / totalSum) * 100).toFixed(1)}%`
        ])
    ];

    // Fila de totales
    const totalRow = [
        "Total",
        ...activityNames.map(activityName => {
            const totalActivity = stateData.reduce((sum, state) => {
                const activity = state.activities.find((activity: { name: string; total: number }) => activity.name === activityName);
                return sum + (activity ? activity.total : 0);
            }, 0);
            return totalActivity;
        }),
        totalSum,
        "100%"
    ];

    wsData.push(totalRow);

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Enero - Diciembre - ${yearTables}`);
    XLSX.writeFile(wb, `Estados ${yearTables}.xlsx`);
}

function exportTableActivities(data: Array<{ action: string; details: Array<{ no: string; description: string; total: string; percentage: string }>; subTotal: { total: string; percentage: string } }>, grandTotal: number, yearTables: number) {
    const wsData = [
        ["Acción", "No", "Descripción", "Total", "%"],
        ...data.flatMap((activity) => [
            ...activity.details.map((detail) => [
                activity.action,
                detail.no,
                detail.description,
                detail.total,
                detail.percentage
            ]),
            ["Sub - Total", "", "", activity.subTotal.total, activity.subTotal.percentage]
        ])
    ];

    // Fila de totales
    const totalRow = ["Total", "", "", grandTotal.toString(), "100%"];
    wsData.push(totalRow);

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Enero - Diciembre");
    XLSX.writeFile(wb, `Actividades ${yearTables}.xlsx`);
}

function exportTableMonths(data: any[], yearTables: number, grandTotal: number) {
    const wsData = [
        ["Tipo de acción", "Tipo de actividad", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "Total", "%"],
    ];

    const actionTypes = Array.from(new Set(data.map(item => item.type_action)));

    actionTypes.forEach(actionType => {
        const filteredData = data.filter(item => item.type_action === actionType);
        filteredData.forEach(item => {
            const activityTotal = Object.values(item).slice(2, 14).reduce((sum: number, value) => sum + Number(value), 0);
            wsData.push([
                item.type_action,
                item.type_activity,
                item.enero,
                item.febrero,
                item.marzo,
                item.abril,
                item.mayo,
                item.junio,
                item.julio,
                item.agosto,
                item.septiembre,
                item.octubre,
                item.noviembre,
                item.diciembre,
                activityTotal,
                `${((activityTotal / grandTotal) * 100).toFixed(1)}%`
            ]);
        });

        const subtotal = filteredData.reduce((acc, item) => {
            Object.keys(acc).forEach(month => {
                acc[month] += Number(item[month]);
            });
            return acc;
        }, {
            enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0
        });

        const subtotalSum = Object.values(subtotal).reduce((sum: number, value) => sum + Number(value), 0);
        wsData.push([
            `Subtotal`,
            " ",
            subtotal.enero,
            subtotal.febrero,
            subtotal.marzo,
            subtotal.abril,
            subtotal.mayo,
            subtotal.junio,
            subtotal.julio,
            subtotal.agosto,
            subtotal.septiembre,
            subtotal.octubre,
            subtotal.noviembre,
            subtotal.diciembre,
            subtotalSum,
            `${((subtotalSum / grandTotal) * 100).toFixed(1)}%`
        ]);
    });

    const total = data.reduce((acc, item) => {
        Object.keys(acc).forEach(month => {
            acc[month] += Number(item[month]);
        });
        return acc;
    }, {
        enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0
    });

    const totalSum = Object.values(total).reduce((sum: number, value) => sum + Number(value), 0);
    wsData.push([
        "Total",
        "",
        total.enero,
        total.febrero,
        total.marzo,
        total.abril,
        total.mayo,
        total.junio,
        total.julio,
        total.agosto,
        total.septiembre,
        total.octubre,
        total.noviembre,
        total.diciembre,
        totalSum,
        "100%"
    ]);

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Enero - Diciembre - ${yearTables}`);
    XLSX.writeFile(wb, `Meses ${yearTables}.xlsx`);
}

function exportTableGender(data: Array<{ month: string; state: string; people: string }>, yearTables: number){
    const wsData = [
        ["Mes", "Estado", "Personas"],
        ...data.map((row: {month: string, state: string, people: string}) => 
            row.month === "SIN REGISTROS" ? ["", "", ""] : [
                row.month,
                row.state,
                row.people
            ]
        )
    ]
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Enero - Diciembre - ${yearTables}`);
    XLSX.writeFile(wb, `Generos ${yearTables}.xlsx`);

}
   

export { exportTableStates, exportTableActivities, exportTableMonths, exportTableGender };