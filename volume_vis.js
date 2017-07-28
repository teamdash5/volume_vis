volume_vis = function(data) {
    if (!'result' in data) {
        console.log('error')
        return
    }


    item_names = [
        'air_total_emission_kg',
        'facility_name',
        'latitude',
        'longitude',
        'primary_anzsic_class_name',
        'report_year',
        'substance_name'
    ]


    dirs = [
        'latitude',
        'longitude'
    ]


    records = data['result']['records']
    show_records = []
    coords = { 'latitude': [], 'longitude': []}


    for (i = 0; i < records.length; i++) {
        record = {}
        for (j = 0; j < item_names.length; j++) {
            record[item_names[j]] = records[i][item_names[j]]
        }
        show_records.push(record)
        for (j in dirs) {
            coords[dirs[j]].push(records[i][dirs[j]])
        }
    }
    border = 0.1
    lat_long_box = {
        'x0': Math.min(...coords['latitude']) - border,
        'x1': Math.max(...coords['latitude']) + border,
        'y0': Math.min(...coords['longitude']) - border,
        'y1': Math.max(...coords['longitude']) + border
    }
    console.log(lat_long_box)
    screen_box = {
        'x0': 0,
        'x1': window.innerWidth,
        'y0': 0,
        'y1': window.innerHeight,
    }
    xy = ['x', 'y']
    for (i = 0; i < show_records.length; i++) {
        for (j = 0; j < 2; j++) {
            show_records[i]['screen_' + xy[j]] = (
              (show_records[i][dirs[j]] - lat_long_box[xy[j] + '0'])
           / (lat_long_box[xy[j] + '1'] - lat_long_box[xy[j] + '0'])
           ) * (
              screen_box[xy[j] + '1'] - screen_box[xy[j] + '0']
            )
        }
    }
    console.log(show_records)
}