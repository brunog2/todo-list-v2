import React, { Component } from 'react';
import { TextInput } from 'react-native';
import PrimaryTextInputStyle from './PrimaryTextInputStyle';

export default class PrimaryTextInput extends Component {
    render() {
        return (

                <TextInput
                    placeholder={this.props.placeholder}
                    style={[PrimaryTextInputStyle.inputData, this.props.style]}
                    autoCapitalize={this.props.autoCapitalize}
                    autoCompleteType={this.props.autoCompleteType}
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={this.props.secureTextEntry}
                    value={this.props.value}
                    autoFocus={this.props.autoFocus} />
       

        )
    }
}