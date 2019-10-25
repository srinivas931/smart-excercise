import React, { Component } from "react";
import Button from 'terra-button/lib/Button';
import Field from 'terra-form-field';
import Input from 'terra-form-input';
import axios from "axios";

import ConditionsTable from './table.js';
import { UrlBuilder } from './helpers.js'

class AppComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patientId: '',
      patientName: '',
      patientDateOfBirth: '',
      patientGender: '',
      conditions: []
    };

    this.retrieveData = this.retrieveData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ 
      patientId: e.target.value,
      conditions: []
    });
  }

  retrieveData() {
    if(this.state.patientId === '') {
      window.alert('Patient Id is required');
    }

    const patientResource = "Patient";
    const patientUrlParam = "_id";

    axios
      .get(UrlBuilder(patientResource, patientUrlParam, this.state.patientId))
      .then(response => {
        const name = response.data.entry[0].resource.name[0].text;
        const dob = response.data.entry[0].resource.birthDate;
        const gender = response.data.entry[0].resource.gender;

        this.setState({
            patientName: name,
            patientDateOfBirth: dob,
            patientGender: gender
        });
      })
      .catch(error => {
        console.log(error);
      });

    const conditionResource = "Condition";
    const conditionUrlParam = "patient";

    axios
    .get(UrlBuilder(conditionResource, conditionUrlParam, this.state.patientId))
    .then(response => {
        const conditionText = response.data.entry[0].resource.code.text;
        const conditionEntries = response.data.entry;
        this.setState({
            conditions: conditionEntries
        });
    })
    .catch(error => {
        console.log(error);
    });
  }

  render() {
    return (
      <div className="Test">
        <div>
          <div>
            <Field label="Enter Patient Id" htmlFor="patient-id">
              <Input name="default blank input" id="blank" ariaLabel="Blank" onChange={this.handleChange}/>
            </Field>
          </div>
          <div>
            <Button text="Submit" variant="emphasis" onClick={this.retrieveData} />
          </div>
        </div>
        <div>
            <b>Patient Details</b>            
        </div>
        <div>
            <b>Name: </b> {this.state.patientName}
        </div>
        <div>
            <b>Date of Birth: </b>{this.state.patientDateOfBirth}
        </div>
        <div>
            <b>Gender: </b> {this.state.patientGender}
        </div>
        <div>
            <ConditionsTable conditions={this.state.conditions} />          
        </div>
      </div>
    );
  }
}

export default AppComponent;