import React from 'react';
import { connect } from 'react-redux';
import { getData, addData } from "Actions/tableaction";
import MUIDataTable from "mui-datatables";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Form, FormGroup } from 'reactstrap';
import Switch from "@material-ui/core/Switch";
import { NotificationManager } from 'react-notifications';



class TableCompo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tablelist: [],
            showModel: false,
            switchState: false,

            addDataState: {
                Id: "",
                WalletTypeID: "",
                SlabType: "",
                StakingType: "",
                Status: "",
            }

        };
    }

    componentWillMount() {
        this.props.getData();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tablelist: nextProps.tableData
        });
    }

    modelToggle = () => {
        this.setState({ showModel: !this.state.showModel })
    }

    handleSwitch = () => {
        this.setState({ switchState: !this.state.switchState })
    }


    /**
     * Add Data In Table
     */
    handleAddData = () => {
        this.setState({ showModel: !this.state.showModel });
        this.props.addData();
        console.log("Add Data", addData)
    }
    onchangehandleadddata(key, value) {
        this.setState({
            ...this.state.addDataState,
            [key]: value
        });
        console.log("onchange")
    }


    /**
     * Delete Data of Table
     */
    deleteDataTable() {
        const { selectedData } = this.state;
        let rowdata = this.props.tablelist;
        let indexOfDeleteData = rowdata.indexOf(selectedData);
        rowdata.splice(indexOfDeleteData, 1);
        let self = this;
        setTimeout(() => {
            self.setState({ loading: false, rowdata, selectedData: null });
            NotificationManager.success('User Deleted!');
        }, 2000);
    }



    render() {



        const columns = [
            {
                name: "Id",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "WalletTypeId",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "WalletTypeName",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "SlabType",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "SlabTypeName",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "StakingType",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "StakingTypeName",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "Status",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "StrStatus",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "Action"
            },
        ];

        const options = {
            filterType: 'checkbox',
            download: false,
            print: false,
            search: false,
            viewColumns: false,
            customToolbar: () => {
                return (
                    <Button
                        onClick={this.modelToggle}
                    >
                        Add Membeer
              </Button>
                );
            }
        }



        const { addDataState } = this.state;

        return (
            <div>

                <MUIDataTable
                    title={"Friend List"}
                    data={this.props.tablelist.map(item => {
                        return [
                            item.Id,
                            item.WalletTypeId,
                            item.WalletTypeName,
                            item.SlabType,
                            item.SlabTypeName,
                            item.StakingType,
                            item.StakingTypeName,
                            item.Status,
                            item.StrStatus,
                            <div>
                                {/* <a href="">Edit</a>
                                <a href="">Delete</a> */}
                                <button onClick={() => this.deleteDataTable()}>Delete</button>
                            </div>
                        ]
                    })}
                    columns={columns}
                    options={options}
                />


                <Modal isOpen={this.state.showModel} toggle={this.modelToggle} className={this.props.className}>

                    <ModalHeader toggle={this.modelToggle} >Add Item</ModalHeader>

                    <ModalBody>

                        <Form>
                            {/*  Id  */}
                            <FormGroup>
                                <Label for="Id">id</Label>
                                <Input
                                    type="text"
                                    name="Id"
                                    id="Id"
                                    minLength={1}
                                    placeholder="Enter Id"
                                    value={addDataState.Id}
                                    onChange={(e) => this.onchangehandleadddata.bind(this, e.target.value)}
                                />
                            </FormGroup>

                            {/*  Wallet Type ID  */}
                            <FormGroup>
                                <Label for="WalletTypeID">Wallet Type ID</Label>
                                <Input
                                    type="WalletTypeID"
                                    name="WalletTypeID"
                                    id="WalletTypeID"
                                    minLength={1}
                                    placeholder="Enter Wallet Type ID"
                                    value={addDataState.WalletTypeID}
                                    onChange={(e) => this.onchangehandleadddata.bind(this, e.target.value)}
                                />
                            </FormGroup>

                            {/*  Slab Type Radio button  */}
                            <FormGroup tag="fieldset">
                                <Label>Slab Type</Label>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="SlabType" id="SlabType1"
                                            value={addDataState.SlabType = false}
                                            onChange={(e) => this.onchangehandleadddata.bind(this, e.target.value)}
                                        />
                                        Slab Type 1</Label>
                                    <br />
                                    <Label check>
                                        <Input type="radio" name="SlabType" id="SlabType1"
                                            value={addDataState.SlabType = true}
                                            onChange={(e) => this.onchangehandleadddata.bind(this, e.target.value)}
                                        />
                                        Slab Type 2</Label>

                                </FormGroup>

                            </FormGroup>

                            {/* skating type radio button  */}
                            <FormGroup tag="fieldset">
                                <Label>Staking Type</Label>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="stakeType" id="stakeType1"
                                            value={addDataState.StakingType = false}
                                            onChange={(e) => this.onchangehandleadddata.bind(this, e.target.value)}
                                        /> Staking Type 1</Label>
                                    <br />
                                    <Label check>
                                        <Input type="radio" name="stakeType" id="stakeType1"
                                            value={addDataState.StakingType = true}
                                            onChange={(e) => this.onchangehandleadddata.bind(this, e.target.value)}
                                        /> Staking Type 2</Label>
                                </FormGroup>
                            </FormGroup>

                            {/*  status  */}
                            <div className="text-left">
                                <Label>Status</Label>
                                <Switch
                                    checked={this.state.switchState}
                                    color="primary"
                                    value={addDataState.Status}
                                    onChange={(e) => this.onchangehandleadddata.bind(this, e.target.value)}
                                >

                                </Switch>
                            </div>
                        </Form>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="success" onClick={this.handleAddData} >Add Data</Button>
                        <Button color="danger" onClick={this.modelToggle}>Cancel</Button>
                    </ModalFooter>

                </Modal>

            </div >
        );
    }
}

// map state to props
const mapStateToProps = ({ tablereducer }) => {
    const { tablelist } = tablereducer;
    return { tablelist };
};

export default connect(
    mapStateToProps,
    { getData, addData }
)(TableCompo);
