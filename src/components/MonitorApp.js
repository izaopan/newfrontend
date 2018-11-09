import React from 'react';
import { properties } from '../config/properties';
import { getVehicles } from '../service/getDataService';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class MonitorApp extends React.Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.state = {vehicles : []};
    }

    componentDidMount(prevProps) {
        this.loadData();
    }

    loadData() {
        getVehicles(properties.url).then(vehicles => this.setState({vehicles}));
    }

    render() {
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
        <button style={{fontSize: "30px"}} onClick={this.loadData}>Reload</button> &nbsp;
        </div>)
    }
}

export default MonitorApp;
