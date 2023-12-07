import React from 'react';
import {View, Text, TouchableOpacity} from '@components';
import {useEffect, useState, useTranslation} from '@hooks';
import styles from './styles';

//Type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type {TFuel} from '@types';

type TProps = TFuel & {
  onSelected: (id: number) => void;
  selectedId: number | null;
};

export const ItemPrice: React.FC<TProps> = ({
  price,
  id,
  onSelected,
  selectedId,
  name,
}) => {
  const {t} = useTranslation();
  const [selected, setSelected] = useState(false);
  const onPress = () => {
    onSelected(id);
    setSelected(true);
  };

  useEffect(() => {
    if (id === selectedId && !selected) {
      setSelected(true);
    }
    if (id !== selectedId && selected) {
      setSelected(false);
    }
  }, [selectedId, selected, id]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.itemPrice, selected && styles.selected]}>
        <Text style={[styles.title, selected && styles.titleSelected]}>
          {name}
        </Text>
        <Text style={[styles.cost, selected && styles.costSelected]}>
          {`${price} ${t('currency')}/${t('l')}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
