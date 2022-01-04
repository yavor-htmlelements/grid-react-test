import './App.css';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import React from "react";
import ReactDOM from "react-dom";
import { Button } from 'smart-webcomponents-react/button';
import { Smart, Grid } from 'smart-webcomponents-react/grid';

 function GetData(rowscount, last, hasNullValues) {
	const data = [];

	if (rowscount === undefined) {
		rowscount = 100;
	}

	let startIndex = 0;

	if (last) {
		startIndex = rowscount;
		rowscount = last - rowscount;
	}

	const firstNames =
		[
			'Andrew', 'Nancy', 'Shelley', 'Regina', 'Yoshi', 'Antoni', 'Mayumi', 'Ian', 'Peter', 'Lars', 'Petra', 'Martin', 'Sven', 'Elio', 'Beate', 'Cheryl', 'Michael', 'Guylene'
		];

	const lastNames =
		[
			'Fuller', 'Davolio', 'Burke', 'Murphy', 'Nagase', 'Saavedra', 'Ohno', 'Devling', 'Wilson', 'Peterson', 'Winkler', 'Bein', 'Petersen', 'Rossi', 'Vileid', 'Saylor', 'Bjorn', 'Nodier'
		];

	const productNames =
		[
			'Black Tea', 'Green Tea', 'Caffe Espresso', 'Doubleshot Espresso', 'Caffe Latte', 'White Chocolate Mocha', 'Caramel Latte', 'Caffe Americano', 'Cappuccino', 'Espresso Truffle', 'Espresso con Panna', 'Peppermint Mocha Twist'
		];

	const priceValues =
		[
			'2.25', '1.5', '3.0', '3.3', '4.5', '3.6', '3.8', '2.5', '5.0', '1.75', '3.25', '4.0'
		];

	for (let i = 0; i < rowscount; i++) {
		const row = {};

		const productindex = Math.floor(Math.random() * productNames.length);
		const price = parseFloat(priceValues[productindex]);
		const quantity = 1 + Math.round(Math.random() * 10);

		row.id = startIndex + i;
		row.reportsTo = Math.floor(Math.random() * firstNames.length);

		if (i % Math.floor(Math.random() * firstNames.length) === 0) {
			row.reportsTo = null;
		}

		row.available = productindex % 2 === 0;

		if (hasNullValues === true) {
			if (productindex % 2 !== 0) {
				const random = Math.floor(Math.random() * rowscount);
				row.available = i % random === 0 ? null : false;
			}
		}

		row.firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
		row.lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
		row.name = row.firstName + ' ' + row.lastName;
		row.productName = productNames[productindex];
		row.price = price;
		row.quantity = quantity;
		row.total = price * quantity;

		const date = new Date();
		date.setFullYear(2016, Math.floor(Math.random() * 11), Math.floor(Math.random() * 27));
		date.setHours(0, 0, 0, 0);
		row.date = date;

		data[i] = row;
	}

	return data;
}


class App extends React.Component {
	constructor(props) {
		super(props);
		this.grid = React.createRef();
	}
	
	behavior = {
		columnResizeMode: 'growAndShrink'
	}

	appearance = {
		alternationCount: 2,
		showRowHeader: true,
		showRowHeaderSelectIcon: true,
		showRowHeaderFocusIcon: true
	}

	paging = {
		enabled: true
	}

	pager = {
		visible: true
	}

	sorting = {
		enabled: true
	}

	selection = {
		enabled: true,
		allowCellSelection: true,
		allowRowHeaderSelection: true,
		allowColumnHeaderSelection: true,
		mode: 'extended'
	}

	dataSource = new Smart.DataAdapter({
		dataSource: GetData(500),
		dataFields: [
			'id: number',
			'firstName: string',
			'lastName: string',
			'productName: string',
			'quantity: number',
			'price: number',
			'total: number'
		]
	})

	columns = [{
		label: 'First Name',
		dataField: 'firstName',
		columnGroup: 'name'
	},
	{
		label: 'Last Name',
		dataField: 'lastName',
		columnGroup: 'name'
	},
	{
		label: 'Product',
		dataField: 'productName',
		columnGroup: 'order'
	},
	{
		label: 'Quantity',
		dataField: 'quantity',
		columnGroup: 'order'
	},
	{
		label: 'Unit Price',
		dataField: 'price',
		cellsFormat: 'c2',
		columnGroup: 'order'
	},
	{
		label: 'Total',
		dataField: 'total',
		cellsFormat: 'c2',
		columnGroup: 'order'
	}
	]

	update() {
		this.grid.current.dataSource = new Smart.DataAdapter({
			dataSource: GetData(500),
			dataFields: [
				'id: number',
				'firstName: string',
				'lastName: string',
				'productName: string',
				'quantity: number',
				'price: number',
				'total: number'
			]
		})
	}
	
	updateFirstRow() {
		this.grid.current.dataSource.update(0, GetData(1)[0]);
	}

	updateFirstCell() {
		this.grid.current.dataSource[0].firstName = "Johny";
	}
	
	clear() {
		this.grid.current.dataSource = null;
	}
		
	componentDidMount() {

	}

	render() {
		return (
			<div>
				<div>The Grid in this demo displays data in a series of rows and columns. This
			        is the simplest case when the Grid is bound to a local data source.</div>
				<Grid ref={this.grid}
					dataSource={this.dataSource}
					columns={this.columns}
					appearance={this.appearance}
					behavior={this.behavior}
					selection={this.selection}
					paging={this.paging}
					pager={this.pager}
					sorting={this.sorting}
					>
				</Grid>
				  <div className="options">
			        <div className="option">
			            <Button onClick={this.update.bind(this)} id="updateBtn">Update New DataSource</Button>
			        </div>
			        <div className="option">
			            <Button onClick={this.updateFirstRow.bind(this)} id="updateRowBtn">Update First Row Data</Button>
			        </div>
			        <div className="option">
			            <Button onClick={this.updateFirstCell.bind(this)}>Update First Cell</Button>
			        </div>
			        <div className="option">
			            <Button onClick={this.clear.bind(this)} id="clearBtn">Clear Data</Button>
			        </div>
			    </div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector("#root"));

export default App;
