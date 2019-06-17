
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import FileInput from '../../symbols/FileInput';


let contentElement = document.getElementById("content");

// Button callback
async function onButtonClicked(){
  let files = await selectFile("image/*", true);
  contentElement.innerHTML = files.map(file => '<img src="${URL.createObjectURL(file)}" style="width: 100px; height: 100px;">').join('');
}

// ---- function definition ----
function selectFile (contentType, multiple){
  return new Promise(resolve => {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = multiple;
    input.accept = contentType;

    input.onchange = _ => {
      let files = Array.from(input.files);
      if (multiple)
        resolve(files);
      else
        resolve(files[0]);
    };

    input.click();
  });
}


class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    mode: types.string,
    label: types.string,
    type: types.string,
    disabled: types.bool,
  };

  render() {
    const { name, label, type } = this.props;
    return (
      <Field name={name} type={type} label={label} accept=".jpg" component={InputField} />
    );
  }
}

export default Component;
