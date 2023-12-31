import PropTypes from 'prop-types';
import React, { Component } from "react";
import ReactNative, {
  NativeModules,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ViewPropTypes,
} from "react-native";

import CreditCard from "./CardView";
import CCInput from "./CCInput";
import { InjectedProps } from "./connectToState";
import styles from './styles';

const s = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  form: {
    marginTop: 20,
  },
  inputContainer: {
  },
  inputLabel: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const CVC_INPUT_WIDTH = 70;
const EXPIRY_INPUT_WIDTH = CVC_INPUT_WIDTH;
const CARD_NUMBER_INPUT_WIDTH_OFFSET = 40;
const CARD_NUMBER_INPUT_WIDTH = Dimensions.get("window").width;
const NAME_INPUT_WIDTH = CARD_NUMBER_INPUT_WIDTH;
const PREVIOUS_FIELD_OFFSET = 40;
const POSTAL_CODE_INPUT_WIDTH = 120;

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CreditCardInput extends Component {
  static propTypes = {
    ...InjectedProps,
    labels: PropTypes.object,
    placeholders: PropTypes.object,

    labelStyle: Text.propTypes.style,
    inputStyle: Text.propTypes.style,
    inputContainerStyle: ViewPropTypes.style,

    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    cardImageFront: PropTypes.number,
    cardImageBack: PropTypes.number,
    cardScale: PropTypes.number,
    cardFontFamily: PropTypes.string,
    showCardBottom: PropTypes.bool,
    showCardTop: PropTypes.bool,
  };

  componentDidMount = () => this._focus(this.props.focused);

  componentWillReceiveProps = newProps => {
    if (this.props.focused !== newProps.focused) this._focus(newProps.focused);
  };

  _focus = field => {
    if (!field) return;

    const scrollResponder = this.refs.Form.getScrollResponder();
    const nodeHandle = ReactNative.findNodeHandle(this.refs[field]);

    NativeModules.UIManager.measureLayoutRelativeToParent(
      nodeHandle,
      e => {
        throw e;
      },
      x => {
        scrollResponder.scrollTo({
          x: Math.max(x - PREVIOUS_FIELD_OFFSET, 0),
          animated: true,
        });
        this.refs[field].focus();
      },
    );
  };

  _inputProps = field => {
    const {
      inputStyle,
      labelStyle,
      validColor,
      invalidColor,
      placeholderColor,
      placeholders,
      labels,
      values,
      status,
      onFocus,
      onChange,
      onBecomeEmpty,
      onBecomeValid,
    } = this.props;

    return {
      inputStyle: [s.input, inputStyle],
      labelStyle: [s.inputLabel, labelStyle],
      validColor,
      invalidColor,
      placeholderColor,
      ref: field,
      field,

      label: labels[field],
      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

      onFocus,
      onChange,
      onBecomeEmpty,
      onBecomeValid,
    };
  };

  render() {
    const {
      cardImageFront,
      cardImageBack,
      inputContainerStyle,
      values: {number, expiry, cvc, name, type},
      focused,
      requiresName,
      requiresCVC,
      requiresPostalCode,
      cardScale,
      cardFontFamily,
      showCardTop,
      showCardBottom
    } = this.props;

    return (
      <View style={[s.container, styles.container]}>
        <ScrollView
          ref="Form"
          horizontal={false}
          keyboardShouldPersistTaps="always"
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={s.form}>
          {showCardTop && (
            <View style={styles.cardView}>
              <CreditCard
                focused={focused}
                brand={type}
                scale={cardScale}
                fontFamily={cardFontFamily}
                imageFront={cardImageFront}
                imageBack={cardImageBack}
                name={requiresName ? name : ' '}
                number={number}
                expiry={expiry}
                cvc={cvc}
              />
            </View>
          )}

          <View style={styles.row}>
            <CCInput
              {...this._inputProps('number')}
              containerStyle={[
                s.inputContainer,
                inputContainerStyle,
                styles.defaultCCInput,
                {width: CARD_NUMBER_INPUT_WIDTH},
              ]}
            />
          </View>
          <View style={styles.row}>
            <CCInput
              {...this._inputProps('expiry')}
              containerStyle={[
                s.inputContainer,
                inputContainerStyle,
                styles.defaultCCInput,
              ]}
            />

            <CCInput
              {...this._inputProps('cvc')}
              secureTextEntry
              containerStyle={[
                s.inputContainer,
                inputContainerStyle,
                styles.defaultCCInput,
              ]}
            />
          </View>
          {showCardBottom && (
            <View style={styles.cardView}>
              <CreditCard
                focused={focused}
                brand={type}
                scale={cardScale}
                fontFamily={cardFontFamily}
                imageFront={cardImageFront}
                imageBack={cardImageBack}
                name={requiresName ? name : ' '}
                number={number}
                expiry={expiry}
                cvc={cvc}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

CreditCardInput.defaultProps = {
  cardViewSize: {},
  labels: {
    name: "Cardholder's name",
    number: "Card Number",
    expiry: "Expiry",
    cvc: "CVC",
    postalCode: "Postal Code",
  },
  placeholders: {
    name: "Full Name",
    number: "1234 5678 1234 5678",
    expiry: "MM/YY",
    cvc: "CVC",
    postalCode: "34567",
  },
  inputContainerStyle: {
  },
  validColor: "",
  invalidColor: "red",
  placeholderColor: "gray",
};
