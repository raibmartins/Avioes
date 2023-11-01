class DynamicTable {

    constructor(tableId, fields, headers) {
        this._tableId = tableId;
        this._table = $('#' + tableId);
        this._fields = fields || null;
        this._headers = headers || null;
        this._defaultText = 'Sem aviões cadastrados...';
        this._setHeaders();
        this._setNoItemsInfo();
    }

    _buildRowColumns(names, item) {
        let row = '<tr>';
        if (names && names.length > 0) {
            names.forEach(name => {
                let c = item ? item[name + ''] : name;
                if (name === "selected") {
                    row += `<td  style="text-align: center; vertical-align: middle;"><input type="checkbox" name="${'aviao-' + item['id']}" ${c ? 'checked' : ''} onclick=selectionPlane(${item['id']}) ></td>`;
                }
                else {
                    row += '<td>' + (typeof c === 'number' ? parseFloat(c.toFixed(4)) : c) + '</td>';
                }
            });
        }
        row += '</tr>';
        return row;
    }

    _setHeaders() {
        this._headers = (this._headers == null || this._headers.length < 1) ? this._fields : this._headers;
        let h = this._buildRowColumns(this._headers);
        if (this._table.children('thead').length < 1) { this._table.prepend('<thead></thead>'); }
        this._table.children('thead').html(h);
    }

    _setNoItemsInfo() {
        if (this._table.length < 1) return;
        let colspan = this._headers != null && this._headers.length > 0 ?
            'colspan="' + this._headers.length + '"' : '';
        let content = '<tr class="no-items"><td ' + colspan + ' style="text-align:center">' +
            this._defaultText + '</td></tr>';
        if (this._table.children('tbody').length > 0)
            this._table.children('tbody').html(content);
        else this._table.append('<tbody>' + content + '</tbody>');
    }

    _removeNoItemsInfo() {
        let c = this._table.children('tbody').children('tr');
        if (c.length == 1 && c.hasClass('no-items')) this._table.children('tbody').empty();
    }

    load(data, append) {
        if (this._table.length < 1) return;
        this._setHeaders();
        this._removeNoItemsInfo();
        if (data && data.length > 0) {
            let rows = '';
            data.forEach(item => {
                rows += this._buildRowColumns(this._fields, item);
            });
            let mthd = append ? 'append' : 'html';
            this._table.children('tbody')[mthd](rows);
        }
        else {
            this._setNoItemsInfo();
        }
        return this;
    }

    clear() {
        _setNoItemsInfo();
        return this;
    }
}