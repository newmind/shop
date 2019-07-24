
import React, { PureComponent } from 'react';

import { Row, Col, SelectField, CheckBox } from '@ui.packages/ui';

import styles from './default.module.scss';


const axis = [
  { id: '0', value: 'Норма' },
  { id: '1', value: '001' },
  { id: '2', value: '002' },
  { id: '3', value: '003' },
  { id: '4', value: '004' },
  { id: '5', value: '005' },
  { id: '6', value: '006' },
  { id: '7', value: '007' },
  { id: '8', value: '008' },
  { id: '9', value: '009' },
  { id: '10', value: '010' },
  { id: '11', value: '011' },
  { id: '12', value: '012' },
  { id: '13', value: '013' },
  { id: '14', value: '014' },
  { id: '15', value: '015' },
  { id: '16', value: '016' },
  { id: '17', value: '017' },
  { id: '18', value: '018' },
  { id: '19', value: '019' },
  { id: '20', value: '020' },
  { id: '21', value: '021' },
  { id: '22', value: '022' },
  { id: '23', value: '023' },
  { id: '24', value: '024' },
  { id: '25', value: '025' },
  { id: '26', value: '026' },
  { id: '27', value: '027' },
  { id: '28', value: '028' },
  { id: '29', value: '029' },
  { id: '30', value: '030' },
  { id: '31', value: '031' },
  { id: '32', value: '032' },
  { id: '33', value: '033' },
  { id: '34', value: '034' },
  { id: '35', value: '035' },
  { id: '36', value: '036' },
  { id: '37', value: '037' },
  { id: '38', value: '038' },
  { id: '39', value: '039' },
  { id: '40', value: '040' },
  { id: '41', value: '041' },
  { id: '42', value: '042' },
  { id: '43', value: '043' },
  { id: '44', value: '044' },
  { id: '45', value: '045' },
  { id: '46', value: '046' },
  { id: '47', value: '047' },
  { id: '48', value: '048' },
  { id: '49', value: '049' },
  { id: '50', value: '050' },
  { id: '51', value: '051' },
  { id: '52', value: '052' },
  { id: '53', value: '053' },
  { id: '54', value: '054' },
  { id: '55', value: '055' },
  { id: '56', value: '056' },
  { id: '57', value: '057' },
  { id: '58', value: '058' },
  { id: '59', value: '059' },
  { id: '60', value: '060' },
  { id: '61', value: '061' },
  { id: '62', value: '062' },
  { id: '63', value: '063' },
  { id: '64', value: '064' },
  { id: '65', value: '065' },
  { id: '66', value: '066' },
  { id: '67', value: '067' },
  { id: '68', value: '068' },
  { id: '69', value: '069' },
  { id: '70', value: '070' },
  { id: '71', value: '071' },
  { id: '72', value: '072' },
  { id: '73', value: '073' },
  { id: '74', value: '074' },
  { id: '75', value: '075' },
  { id: '76', value: '076' },
  { id: '77', value: '077' },
  { id: '78', value: '078' },
  { id: '79', value: '079' },
  { id: '80', value: '080' },
  { id: '81', value: '081' },
  { id: '82', value: '082' },
  { id: '83', value: '083' },
  { id: '84', value: '084' },
  { id: '85', value: '085' },
  { id: '86', value: '086' },
  { id: '87', value: '087' },
  { id: '88', value: '088' },
  { id: '89', value: '089' },
  { id: '90', value: '090' },
  { id: '91', value: '091' },
  { id: '92', value: '092' },
  { id: '93', value: '093' },
  { id: '94', value: '094' },
  { id: '95', value: '095' },
  { id: '96', value: '096' },
  { id: '97', value: '097' },
  { id: '98', value: '098' },
  { id: '99', value: '099' },
  { id: '100', value: '100' },
  { id: '101', value: '101' },
  { id: '102', value: '102' },
  { id: '103', value: '103' },
  { id: '104', value: '104' },
  { id: '105', value: '105' },
  { id: '106', value: '106' },
  { id: '107', value: '107' },
  { id: '108', value: '108' },
  { id: '109', value: '109' },
  { id: '110', value: '110' },
  { id: '111', value: '111' },
  { id: '112', value: '112' },
  { id: '113', value: '113' },
  { id: '114', value: '114' },
  { id: '115', value: '115' },
  { id: '116', value: '116' },
  { id: '117', value: '117' },
  { id: '118', value: '118' },
  { id: '119', value: '119' },
  { id: '120', value: '120' },
  { id: '121', value: '121' },
  { id: '122', value: '122' },
  { id: '123', value: '123' },
  { id: '124', value: '124' },
  { id: '125', value: '125' },
  { id: '126', value: '126' },
  { id: '127', value: '127' },
  { id: '128', value: '128' },
  { id: '129', value: '129' },
  { id: '130', value: '130' },
  { id: '131', value: '131' },
  { id: '132', value: '132' },
  { id: '133', value: '133' },
  { id: '134', value: '134' },
  { id: '135', value: '135' },
  { id: '136', value: '136' },
  { id: '137', value: '137' },
  { id: '138', value: '138' },
  { id: '139', value: '139' },
  { id: '140', value: '140' },
  { id: '141', value: '141' },
  { id: '142', value: '142' },
  { id: '143', value: '143' },
  { id: '144', value: '144' },
  { id: '145', value: '145' },
  { id: '146', value: '146' },
  { id: '147', value: '147' },
  { id: '148', value: '148' },
  { id: '149', value: '149' },
  { id: '150', value: '150' },
  { id: '151', value: '151' },
  { id: '152', value: '152' },
  { id: '153', value: '153' },
  { id: '154', value: '154' },
  { id: '155', value: '155' },
  { id: '156', value: '156' },
  { id: '157', value: '157' },
  { id: '158', value: '158' },
  { id: '159', value: '159' },
  { id: '160', value: '160' },
  { id: '161', value: '161' },
  { id: '162', value: '162' },
  { id: '163', value: '163' },
  { id: '164', value: '164' },
  { id: '165', value: '165' },
  { id: '166', value: '166' },
  { id: '167', value: '167' },
  { id: '168', value: '168' },
  { id: '169', value: '169' },
  { id: '170', value: '170' },
  { id: '171', value: '171' },
  { id: '172', value: '172' },
  { id: '173', value: '173' },
  { id: '174', value: '174' },
  { id: '175', value: '175' },
  { id: '176', value: '176' },
  { id: '177', value: '177' },
  { id: '178', value: '178' },
  { id: '179', value: '179' },
  { id: '180', value: '180' },
];
const cylinder = [
  { id: '-6.00', value: '-6.00' },
  { id: '-5.75', value: '-5.75' },
  { id: '-5.50', value: '-5.50' },
  { id: '-5.25', value: '-5.25' },
  { id: '-5.00', value: '-5.00' },
  { id: '-4.75', value: '-4.75' },
  { id: '-4.50', value: '-4.50' },
  { id: '-4.25', value: '-4.25' },
  { id: '-4.00', value: '-4.00' },
  { id: '-3.75', value: '-3.75' },
  { id: '-3.50', value: '-3.50' },
  { id: '-3.25', value: '-3.25' },
  { id: '-3.00', value: '-3.00' },
  { id: '-2.75', value: '-2.75' },
  { id: '-2.50', value: '-2.50' },
  { id: '-2.25', value: '-2.25' },
  { id: '-2.00', value: '-2.00' },
  { id: '-1.75', value: '-1.75' },
  { id: '-1.50', value: '-1.50' },
  { id: '-1.25', value: '-1.25' },
  { id: '-1.00', value: '-1.00' },
  { id: '-0.75', value: '-0.75' },
  { id: '-0.50', value: '-0.50' },
  { id: '-0.25', value: '-0.25' },
  { id: 'plano', value: 'Норма' },
  { id: '+0.25', value: '+0.25' },
  { id: '+0.50', value: '+0.50' },
  { id: '+0.75', value: '+0.75' },
  { id: '+1.00', value: '+1.00' },
  { id: '+1.25', value: '+1.25' },
  { id: '+1.50', value: '+1.50' },
  { id: '+1.75', value: '+1.75' },
  { id: '+2.00', value: '+2.00' },
  { id: '+2.25', value: '+2.25' },
  { id: '+2.50', value: '+2.50' },
  { id: '+2.75', value: '+2.75' },
  { id: '+3.00', value: '+3.00' },
  { id: '+3.25', value: '+3.25' },
  { id: '+3.50', value: '+3.50' },
  { id: '+3.75', value: '+3.75' },
  { id: '+4.00', value: '+4.00' },
  { id: '+4.25', value: '+4.25' },
  { id: '+4.50', value: '+4.50' },
  { id: '+4.75', value: '+4.75' },
  { id: '+5.00', value: '+5.00' },
  { id: '+5.25', value: '+5.25' },
  { id: '+5.50', value: '+5.50' },
  { id: '+5.75', value: '+5.75' },
  { id: '+6.00', value: '+6.00' },
];
const addition = [
  { id: '0.00', value: 'Норма' },
  { id: '0.25', value: '0.25' },
  { id: '0.50', value: '0.50' },
  { id: '0.75', value: '0.75' },
  { id: '1.00', value: '1.00' },
  { id: '1.25', value: '1.25' },
  { id: '1.50', value: '1.50' },
  { id: '1.75', value: '1.75' },
  { id: '2.00', value: '2.00' },
  { id: '2.25', value: '2.25' },
  { id: '2.50', value: '2.50' },
  { id: '2.75', value: '2.75' },
  { id: '3.00', value: '3.00' },
  { id: '3.25', value: '3.25' },
  { id: '3.50', value: '3.50' },
  { id: '3.75', value: '3.75' },
  { id: '4.00', value: '4.00' },
];
const spherical = [
  { id: '-20.00', value: '-20.00' },
  { id: '-19.75', value: '-19.75' },
  { id: '-19.50', value: '-19.50' },
  { id: '-19.25', value: '-19.25' },
  { id: '-19.00', value: '-19.00' },
  { id: '-18.75', value: '-18.75' },
  { id: '-18.50', value: '-18.50' },
  { id: '-18.25', value: '-18.25' },
  { id: '-18.00', value: '-18.00' },
  { id: '-17.75', value: '-17.75' },
  { id: '-17.50', value: '-17.50' },
  { id: '-17.25', value: '-17.25' },
  { id: '-17.00', value: '-17.00' },
  { id: '-16.75', value: '-16.75' },
  { id: '-16.50', value: '-16.50' },
  { id: '-16.25', value: '-16.25' },
  { id: '-16.00', value: '-16.00' },
  { id: '-15.75', value: '-15.75' },
  { id: '-15.50', value: '-15.50' },
  { id: '-15.25', value: '-15.25' },
  { id: '-15.00', value: '-15.00' },
  { id: '-14.75', value: '-14.75' },
  { id: '-14.50', value: '-14.50' },
  { id: '-14.25', value: '-14.25' },
  { id: '-14.00', value: '-14.00' },
  { id: '-13.75', value: '-13.75' },
  { id: '-13.50', value: '-13.50' },
  { id: '-13.25', value: '-13.25' },
  { id: '-13.00', value: '-13.00' },
  { id: '-12.75', value: '-12.75' },
  { id: '-12.50', value: '-12.50' },
  { id: '-12.25', value: '-12.25' },
  { id: '-12.00', value: '-12.00' },
  { id: '-11.75', value: '-11.75' },
  { id: '-11.50', value: '-11.50' },
  { id: '-11.25', value: '-11.25' },
  { id: '-11.00', value: '-11.00' },
  { id: '-10.75', value: '-10.75' },
  { id: '-10.50', value: '-10.50' },
  { id: '-10.25', value: '-10.25' },
  { id: '-10.00', value: '-10.00' },
  { id: '-09.75', value: '-09.75' },
  { id: '-09.50', value: '-09.50' },
  { id: '-09.25', value: '-09.25' },
  { id: '-09.00', value: '-09.00' },
  { id: '-08.75', value: '-08.75' },
  { id: '-08.50', value: '-08.50' },
  { id: '-08.25', value: '-08.25' },
  { id: '-08.00', value: '-08.00' },
  { id: '-07.75', value: '-07.75' },
  { id: '-07.50', value: '-07.50' },
  { id: '-07.25', value: '-07.25' },
  { id: '-07.00', value: '-07.00' },
  { id: '-06.75', value: '-06.75' },
  { id: '-06.50', value: '-06.50' },
  { id: '-06.25', value: '-06.25' },
  { id: '-06.00', value: '-06.00' },
  { id: '-05.75', value: '-05.75' },
  { id: '-05.50', value: '-05.50' },
  { id: '-05.25', value: '-05.25' },
  { id: '-05.00', value: '-05.00' },
  { id: '-04.75', value: '-04.75' },
  { id: '-04.50', value: '-04.50' },
  { id: '-04.25', value: '-04.25' },
  { id: '-04.00', value: '-04.00' },
  { id: '-03.75', value: '-03.75' },
  { id: '-03.50', value: '-03.50' },
  { id: '-03.25', value: '-03.25' },
  { id: '-03.00', value: '-03.00' },
  { id: '-02.75', value: '-02.75' },
  { id: '-02.50', value: '-02.50' },
  { id: '-02.25', value: '-02.25' },
  { id: '-02.00', value: '-02.00' },
  { id: '-01.75', value: '-01.75' },
  { id: '-01.50', value: '-01.50' },
  { id: '-01.25', value: '-01.25' },
  { id: '-01.00', value: '-01.00' },
  { id: '-00.75', value: '-00.75' },
  { id: '-00.50', value: '-00.50' },
  { id: '-00.25', value: '-00.25' },
  { id: 'plano', value: 'Норма' },
  { id: '+00.25', value: '+00.25' },
  { id: '+00.50', value: '+00.50' },
  { id: '+00.75', value: '+00.75' },
  { id: '+01.00', value: '+01.00' },
  { id: '+01.25', value: '+01.25' },
  { id: '+01.50', value: '+01.50' },
  { id: '+01.75', value: '+01.75' },
  { id: '+02.00', value: '+02.00' },
  { id: '+02.25', value: '+02.25' },
  { id: '+02.50', value: '+02.50' },
  { id: '+02.75', value: '+02.75' },
  { id: '+03.00', value: '+03.00' },
  { id: '+03.25', value: '+03.25' },
  { id: '+03.50', value: '+03.50' },
  { id: '+03.75', value: '+03.75' },
  { id: '+04.00', value: '+04.00' },
  { id: '+04.25', value: '+04.25' },
  { id: '+04.50', value: '+04.50' },
  { id: '+04.75', value: '+04.75' },
  { id: '+05.00', value: '+05.00' },
  { id: '+05.25', value: '+05.25' },
  { id: '+05.50', value: '+05.50' },
  { id: '+05.75', value: '+05.75' },
  { id: '+06.00', value: '+06.00' },
  { id: '+06.25', value: '+06.25' },
  { id: '+06.50', value: '+06.50' },
  { id: '+06.75', value: '+06.75' },
  { id: '+07.00', value: '+07.00' },
  { id: '+07.25', value: '+07.25' },
  { id: '+07.50', value: '+07.50' },
  { id: '+07.75', value: '+07.75' },
  { id: '+08.00', value: '+08.00' },
  { id: '+08.25', value: '+08.25' },
  { id: '+08.50', value: '+08.50' },
  { id: '+08.75', value: '+08.75' },
  { id: '+09.00', value: '+09.00' },
  { id: '+09.25', value: '+09.25' },
  { id: '+09.50', value: '+09.50' },
  { id: '+09.75', value: '+09.75' },
  { id: '+10.00', value: '+10.00' },
  { id: '+10.25', value: '+10.25' },
  { id: '+10.50', value: '+10.50' },
  { id: '+10.75', value: '+10.75' },
  { id: '+11.00', value: '+11.00' },
  { id: '+11.25', value: '+11.25' },
  { id: '+11.50', value: '+11.50' },
  { id: '+11.75', value: '+11.75' },
  { id: '+12.00', value: '+12.00' },
];

// const prism = [
//   { id: '0.25', value: '0.25' },
//   { id: '0.50', value: '0.50' },
//   { id: '0.75', value: '0.75' },
//   { id: '1.00', value: '1.00' },
//   { id: '1.25', value: '1.25' },
//   { id: '1.50', value: '1.50' },
//   { id: '1.75', value: '1.75' },
//   { id: '2.00', value: '2.00' },
//   { id: '2.25', value: '2.25' },
//   { id: '2.50', value: '2.50' },
//   { id: '2.75', value: '2.75' },
//   { id: '3.00', value: '3.00' },
// ];
// const direction = [
//   { id: 'in', value: 'Внутри' },
//   { id: 'out', value: 'Снаружи' }
// ];


class Component extends PureComponent {
  static defaultProps = {
    values: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      isPDTwo: false,
    };
  }

  render() {
    return (
      <div className={styles['params']}>
        <Row>
          <Col>
            <SelectField
              label="Левый глаз"
              name="PD-left"
              options={[
                { id: 'average', value: 'Использовать среднее значение (Я не знаю свой PD)' },
                { id: '25.0', value: '25.0' },
                { id: '25.5', value: '25.5' },
                { id: '26.0', value: '26.0' },
                { id: '26.5', value: '26.5' },
                { id: '27.0', value: '27.0' },
                { id: '27.5', value: '27.5' },
                { id: '28.0', value: '28.0' },
                { id: '28.5', value: '28.5' },
                { id: '29.0', value: '29.0' },
                { id: '29.5', value: '29.5' },
                { id: '30.0', value: '30.0' },
                { id: '30.5', value: '30.5' },
                { id: '31.0', value: '31.0' },
                { id: '31.5', value: '31.5' },
                { id: '32.0', value: '32.0' },
                { id: '32.5', value: '32.5' },
                { id: '33.0', value: '33.0' },
                { id: '33.5', value: '33.5' },
                { id: '34.0', value: '34.0' },
                { id: '34.5', value: '34.5' },
                { id: '35.0', value: '35.0' },
                { id: '35.5', value: '35.5' },
                { id: '36.0', value: '36.0' },
                { id: '36.5', value: '36.5' },
                { id: '37.0', value: '37.0' },
                { id: '37.5', value: '37.5' },
                { id: '38.0', value: '38.0' },
                { id: '38.5', value: '38.5' },
                { id: '39.0', value: '39.0' },
                { id: '39.5', value: '39.5' },
                { id: '40.0', value: '40.0' },
              ]}
            />
          </Col>
          <Col>
            <SelectField
              label="Правый глаз"
              name="PD-right"
              options={[
                { id: 'average', value: 'Использовать среднее значение (Я не знаю свой PD)' },
                { id: '25.0', value: '25.0' },
                { id: '25.5', value: '25.5' },
                { id: '26.0', value: '26.0' },
                { id: '26.5', value: '26.5' },
                { id: '27.0', value: '27.0' },
                { id: '27.5', value: '27.5' },
                { id: '28.0', value: '28.0' },
                { id: '28.5', value: '28.5' },
                { id: '29.0', value: '29.0' },
                { id: '29.5', value: '29.5' },
                { id: '30.0', value: '30.0' },
                { id: '30.5', value: '30.5' },
                { id: '31.0', value: '31.0' },
                { id: '31.5', value: '31.5' },
                { id: '32.0', value: '32.0' },
                { id: '32.5', value: '32.5' },
                { id: '33.0', value: '33.0' },
                { id: '33.5', value: '33.5' },
                { id: '34.0', value: '34.0' },
                { id: '34.5', value: '34.5' },
                { id: '35.0', value: '35.0' },
                { id: '35.5', value: '35.5' },
                { id: '36.0', value: '36.0' },
                { id: '36.5', value: '36.5' },
                { id: '37.0', value: '37.0' },
                { id: '37.5', value: '37.5' },
                { id: '38.0', value: '38.0' },
                { id: '38.5', value: '38.5' },
                { id: '39.0', value: '39.0' },
                { id: '39.5', value: '39.5' },
                { id: '40.0', value: '40.0' },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <table className={styles['table']}>
              <thead>
                <tr>
                  <th></th>
                  <th>SPH (Сфера)</th>
                  <th>CYL (Цилиндр)</th>
                  <th>AXIS (Ось)</th>
                  <th>ADD (Дополнение)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>OD (Павый)</td>
                  <td><SelectField name="sph-right" options={spherical} simple={true} defaultKey="plano" clearable={false} /></td>
                  <td><SelectField name="cyl-right" options={cylinder} simple={true} defaultKey="plano" clearable={false} /></td>
                  <td><SelectField name="axis-right" options={axis} simple={true} defaultKey="0" clearable={false} /></td>
                  <td><SelectField name="add-right" options={addition} simple={true} defaultKey="0.00" clearable={false} /></td>
                </tr>
                <tr>
                  <td>OS (Левый)</td>
                  <td><SelectField name="sph-left" options={spherical} simple={true} defaultKey="plano" clearable={false} /></td>
                  <td><SelectField name="cyl-left" options={cylinder} simple={true} defaultKey="plano" clearable={false} /></td>
                  <td><SelectField name="axis-left" options={axis} simple={true} defaultKey="0" clearable={false} /></td>
                  <td><SelectField name="add-left" options={addition} simple={true} defaultKey="0.00" clearable={false} /></td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        {/*<Row>*/}
        {/*  <Col>*/}
        {/*    <table className={styles['table']}>*/}
        {/*      <thead>*/}
        {/*      <tr>*/}
        {/*        <th></th>*/}
        {/*        <th>По горизонтали</th>*/}
        {/*        <th>Направление</th>*/}
        {/*        <th>По вертикали</th>*/}
        {/*        <th>Направление</th>*/}
        {/*      </tr>*/}
        {/*      </thead>*/}
        {/*      <tbody>*/}
        {/*      <tr>*/}
        {/*        <td>OD (Павый)</td>*/}
        {/*        <td><SelectField name="horizontal-prism-right" options={prism} simple={true} /></td>*/}
        {/*        <td><SelectField name="horizontal-base-direction-right" options={direction} simple={true} /></td>*/}
        {/*        <td><SelectField name="vertical-prism-right" options={prism} simple={true} /></td>*/}
        {/*        <td><SelectField name="vertical-base-direction-right" options={direction} simple={true} /></td>*/}
        {/*      </tr>*/}
        {/*      <tr>*/}
        {/*        <td>OS (Левый)</td>*/}
        {/*        <td><SelectField name="horizontal-prism-left" options={prism} simple={true} /></td>*/}
        {/*        <td><SelectField name="horizontal-base-direction-left" options={direction} simple={true} /></td>*/}
        {/*        <td><SelectField name="vertical-prism-left" options={prism} simple={true} /></td>*/}
        {/*        <td><SelectField name="vertical-base-direction-left" options={direction} simple={true} /></td>*/}
        {/*      </tr>*/}
        {/*      </tbody>*/}
        {/*    </table>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
      </div>
    );
  }
}

export default Component;