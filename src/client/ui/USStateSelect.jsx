import React from 'react';
import ReactDOM from 'react-dom';

const states = [
  "AL - Alabama",
  "AK - Alaska",
  "AS - American Samoa",
  "AZ - Arizona",
  "AR - Arkansas",
  "CA - California",
  "CO - Colorado",
  "CT - Connecticut",
  "DE - Delaware",
  "DC - District Of Columbia",
  "FM - Fed States Of Micronesia",
  "FL - Florida",
  "GA - Georgia",
  "GU - Guam",
  "HI - Hawaii",
  "ID - Idaho",
  "IL - Illinois",
  "IN - Indiana",
  "IA - Iowa",
  "KS - Kansas",
  "KY - Kentucky",
  "LA - Louisiana",
  "ME - Maine",
  "MH - Marshall Islands",
  "MD - Maryland",
  "MA - Massachusetts",
  "MI - Michigan",
  "MN - Minnesota",
  "MS - Mississippi",
  "MO - Missouri",
  "MT - Montana",
  "NE - Nebraska",
  "NV - Nevada",
  "NH - New Hampshire",
  "NJ - New Jersey",
  "NM - New Mexico",
  "NY - New York",
  "NC - North Carolina",
  "ND - North Dakota",
  "MP - Northern Mariana Islands",
  "OH - Ohio",
  "OK - Oklahoma",
  "OR - Oregon",
  "PW - Palau",
  "PA - Pennsylvania",
  "PR - Puerto Rico",
  "RI - Rhode Island",
  "SC - South Carolina",
  "SD - South Dakota",
  "TN - Tennessee",
  "TX - Texas",
  "UT - Utah",
  "VT - Vermont",
  "VI - Virgin Islands",
  "VA - Virginia",
  "WA - Washington",
  "WV - West Virginia",
  "WI - Wisconsin",
  "WY - Wyoming"
];

export default class USStateSelect extends React.Component {
  render () {
    let stateOptions = [];
    for (let state of states) {
      let value = state.substr (0, 2);
      if (this.props.abbrevOnly) {
        state = value;
      }
      stateOptions.push (<option key={value} value={value}>{state}</option>);
    }

    return (
      <select {...this.props}>
        {stateOptions}
      </select>
    );
  }
}

USStateSelect.PropTypes = {
  abbrevOnly: React.PropTypes.bool
};
