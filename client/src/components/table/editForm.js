import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Form, FormGroup } from 'reactstrap';;

const EditForm = () => {
    return (

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

    )
}

export default EditForm;