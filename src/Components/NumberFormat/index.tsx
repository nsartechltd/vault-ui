import React from 'react';
import NumberFormat from 'react-number-format';
import getSymbolFromCurrency from 'currency-symbol-map';

type Props = {
  value: string | number | null;
  currency: string;
};

const NumberFormatComponent = (props: Props): JSX.Element => {
  const currency = getSymbolFromCurrency(props.currency);

  return (
    <NumberFormat
      value={props.value}
      thousandSeparator={true}
      displayType="text"
      prefix={currency}
      decimalScale={2}
    />
  );
};

export default NumberFormatComponent;
