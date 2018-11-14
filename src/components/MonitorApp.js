import React from 'react';
import { properties } from '../config/properties';
import { getVehicles, getAllVehicles } from '../service/getDataService';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class MonitorApp extends React.Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.searchWithFilter = this.searchWithFilter.bind(this);
        this.filterFieldChange = this.filterFieldChange.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.state = {
            vehicles : [],
            filterField : undefined,
            filterValue : undefined
        };
    }

    componentDidMount(prevProps) {
        this.loadData();
    }

    loadData() {
        getAllVehicles(properties.url_all_vehicles).then(vehicles => this.setState({vehicles}));
    }

    searchWithFilter() {
        debugger
        if (this.state.filterField !== undefined && this.state.filterValue !== undefined) {
            getVehicles(properties.url_filtered_query, {
                field: this.state.filterField,
                value: this.state.filterValue
            }).then(vehicles => this.setState({vehicles}));
        }
    }

    filterFieldChange(event) {
        this.setState({
            filterField: event.target.value
          });
    }
    
    updateInputValue(event) {
        this.setState({
          filterValue: event.target.value
        });
    }


    render() {
        const inputStyle = {fontSize: "20px", margin: "10px"};
        return (
        <div  style={{
            borderRadius: "5px",
            overflow: "hidden",
            paddingLeft: "50px",
            paddingRight: "50px"
          }}>

          <ReactTable
          data={this.state.vehicles}
          style={{height: "500px"}}
          columns={[
            {
              Header: 'Vehicles',
              columns: [
                {
                    Header: 'Vehicle ID',
                    accessor: 'vehicleId'
                  },
                  {
                      Header: 'Reg Nr',
                      accessor: 'regNr'
                  },
                  {
                    Header: 'Company Name',
                    accessor: 'companyName'
                  },
                  {
                    Header: 'Company Address',
                    accessor: 'companyAddress'
                  },
                  {
                    Header: 'Connected',
                    accessor: 'connected'
                  }
              ]
            }
          ]}
          showPagination={false} 
          className='-striped -highlight'
          sortable={true}
          filterable={true}
        />   
        <label style={inputStyle} for="filterField"> Filter field: </label> 
        <select name="filterField" style={inputStyle} value={this.state.filterField} onChange={this.filterFieldChange}>
            <option value={undefined}>None</option>
            <option value="companyName">Company Name</option>
            <option value="isConnected">Connected</option>
        </select>
        <br/>
        <label style={inputStyle} for="filterValue"> Value:</label> 
        <input name="filterValue" style={inputStyle} value={this.state.filterValue} onChange={this.updateInputValue}/>
        <button style={inputStyle} onClick={this.searchWithFilter}>Search with Filter</button>
        <button style={inputStyle} onClick={this.loadData}>Reset Filter && Reload</button> &nbsp;
        </div>)
    }
}

export default MonitorApp;
