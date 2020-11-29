import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import CustomButtonStyle from './CustomButtonStyle';

export default class CustomButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={[this.props.primary == "false" ? CustomButtonStyle.btSecondary : CustomButtonStyle.btPrimary, this.props.style]}
                onPress={this.props.onPress}>
                <Text
                    style={[this.props.primary == "false" ? CustomButtonStyle.textBtSecondary : CustomButtonStyle.textBtPrimary]}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}